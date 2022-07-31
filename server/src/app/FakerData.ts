import chance from 'chance';
import PolishChars from '@/langs/pl';
import SpanishChars from '@/langs/es';
import EnglishChars from '@/langs/en';
import { Faker, faker } from '@faker-js/faker';
import {
  Address,
  UserData,
  Generator,
  LocaleState,
  InfoGenerator,
  FakerDataState,
  UserAddressKeys,
  UserDataKeys,
} from '../types/FakerData';
import {
  DEF_SEED,
  DEF_ERROR,
  DEF_PAGE,
  DEF_SIZE,
  DEF_LOCALE,
  COUNTRIES,
  MAX_PAGE,
  MAX_USER_INFO_LENGTH,
  MIN_USER_INFO_LENGTH,
} from './constants';

class FakerData {
  private seed = DEF_SEED;
  private error = DEF_ERROR;
  private page = DEF_PAGE;
  private size = DEF_SIZE;
  private locale: LocaleState;
  private fakerjs: Faker;
  private chancejs: Chance.Chance;

  constructor({
    page,
    size,
    seed,
    error = 0,
    locale = DEF_LOCALE,
  }: FakerDataState) {
    this.locale = locale;
    this.error = error;
    this.page = page ?? DEF_PAGE;
    this.size = size ?? DEF_SIZE;
    this.seed = seed + (this.size + this.page);

    this.fakerjs = faker;
    this.fakerjs.setLocale(this.locale);
    this.fakerjs.mersenne.seed(this.seed);
    this.chancejs = new chance(this.seed);
  }
  random(): Generator {
    let users: UserData[] = [];
    const seed = this.seed > 0 ? this.seed - 1 : this.seed + 1;
    const newFaker = faker;
    newFaker.mersenne.seed(seed);

    this.syncLoop(() => {
      let user = this.userTemplate({
        id: this.fakerjs.finance.account(),
        firstName: this.fakerjs.name.firstName(),
        lastName: this.fakerjs.name.lastName(),
        middleName: this.getRandomMiddleName(newFaker),
        address: this.getRandomAddress(),
        phone: this.getRandomPhone(),
      });
      if (this.error >= 1) {
        for (let i = 0; i < this.error; i++) {
          user = this.applyRandomTransformer(user);
        }
      }
      users.push(user);
    });

    if (this.error > 0 && this.error < 1) {
      users = this.applyProbabilityError(users);
    }

    return {
      info: this.getInfo(users.length),
      data: users,
    };
  }
  private getRandomMiddleName(newFaker: Faker): string {
    if (this.locale === COUNTRIES.US) {
      return this.fakerjs.name.middleName();
    }
    return newFaker.name.lastName();
  }
  private getRandomPhone() {
    switch (this.locale) {
      case COUNTRIES.PL: {
        return this.fakerjs.phone.number('+48-###-###-###');
      }
      case COUNTRIES.ES: {
        return this.fakerjs.phone.number('+34-###-###-#');
      }
    }
    return this.fakerjs.phone.number('+1-###-###-####');
  }
  private getRandomAddress(): Address {
    const rng = Number.parseInt(this.fakerjs.random.numeric(5));
    let address = {
      street: this.fakerjs.address.streetAddress(),
      state: this.fakerjs.address.state(),
    };
    const city = this.fakerjs.address.cityName();
    const building = this.fakerjs.address.buildingNumber();
    const apartment = this.fakerjs.address.secondaryAddress();
    const country = this.getLocaleCountry();
    const zipcode = this.getRandomZipcode();
    if (rng % 3 === 0) {
      return {
        ...address,
        building,
        city,
        country,
      };
    } else if (rng % 7 === 0) {
      return {
        ...address,
        building,
        country,
        zipcode,
      };
    } else if (rng % 11 === 0) {
      return {
        ...address,
        apartment,
        city,
        zipcode,
      };
    }

    return { ...address, city, country, zipcode };
  }
  private getLocaleCountry(): string {
    switch (this.locale) {
      case COUNTRIES.PL: {
        return 'Poland';
      }
      case COUNTRIES.ES: {
        return 'Spain';
      }
    }
    return 'United State';
  }
  private getRandomZipcode(): string {
    switch (this.locale) {
      case COUNTRIES.PL: {
        return this.fakerjs.address.zipCode('##-###');
      }
      case COUNTRIES.ES: {
        return this.fakerjs.address.zipCode('#####');
      }
    }
    return this.fakerjs.address.zipCode('#####');
  }
  private getInfo(count: number): InfoGenerator {
    return {
      count: count,
      page: this.page,
      locale: this.locale,
      errors: this.error,
      next: this.page + 1 > MAX_PAGE ? null : this.page + 1,
      prev: this.page - 1 < 0 ? null : this.page - 1,
    };
  }
  private syncLoop(func: Function): void {
    const start = this.page * this.size;
    const end = start + this.size;
    for (let i = start; i < end; i++) {
      func();
    }
  }
  private userTemplate(user: UserData): UserData {
    return {
      id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
    };
  }
  private getRandomLocaleChar(): string {
    const chars = this.getLocaleChars();
    const idx = this.chancejs.natural({ min: 0, max: chars.length - 1 });
    return chars[idx];
  }
  private getLocaleChars(): string[] {
    switch (this.locale) {
      case COUNTRIES.PL: {
        return new PolishChars().getChars();
      }
      case COUNTRIES.ES: {
        return new SpanishChars().getChars();
      }
    }
    return new EnglishChars().getChars();
  }
  private applyProbabilityError(users: UserData[]): UserData[] {
    for (let i = 0; i < users.length; i++) {
      const weights = this.chancejs.n(() => this.error, users.length);
      let user = this.chancejs.weighted(users, weights);
      user = this.applyRandomTransformer(user);
    }
    return users;
  }

  private applyRandomTransformer(user: UserData): UserData {
    const randomKey = this.getRandomObjKey(user) as UserDataKeys;
    if (randomKey === 'address') {
      return this.randomAddrTransform(user);
    }
    return this.randomUserTransform(randomKey, user);
  }
  private randomUserTransform(key: UserDataKeys, user: UserData): UserData {
    const transformer = this.randomTransformer();
    if (transformer === 'random' || key === 'address') return user;

    if (user[key].length <= MIN_USER_INFO_LENGTH) {
      user[key] += this.getRandomLocaleWord(1);
    } else if (user[key].length >= MAX_USER_INFO_LENGTH) {
      return user;
    } else {
      user[key] = this[transformer](user[key]);
    }
    return user;
  }
  private randomAddrTransform(user: UserData): UserData {
    const transformer = this.randomTransformer();
    if (transformer === 'random') return user;

    let randomKey = this.getRandomObjKey(user.address) as UserAddressKeys;
    const addrValue = user.address[randomKey];

    if (addrValue.length <= MIN_USER_INFO_LENGTH) {
      user.address[randomKey] += this.getRandomLocaleWord(1);
    } else if (addrValue.length >= MAX_USER_INFO_LENGTH) {
      return user;
    } else {
      user.address[randomKey] = this[transformer](addrValue);
    }

    return user;
  }

  private randomTransformer(): keyof FakerData {
    return this.chancejs.pickone([
      'swapTwoLetters',
      'removeRandomLetter',
      'addRandomLetter',
    ]);
  }
  private getRandomLocaleWord(length: number) {
    let word = '';
    for (let i = 0; i < length; i++) {
      word += this.getRandomLocaleChar();
    }
    return word;
  }
  private getRandomObjKey(obj: object, except = []) {
    const keys = Object.keys(obj);
    const exceptionKeys = [...except, 'id'];

    let rngKey = this.chancejs.pickone(keys);

    while (exceptionKeys.includes(rngKey)) {
      rngKey = this.chancejs.pickone(keys);
    }

    return rngKey;
  }
  swapTwoLetters(text: string): string {
    if (text.length <= 1) return this.getRandomLocaleWord(5);

    const first = this.chancejs.natural({ min: 0, max: text.length - 1 });
    const second = this.chancejs.natural({ min: 0, max: text.length - 1 });

    return text
      .split('')
      .map((t, i) =>
        i === first ? text[second] : i === second ? text[first] : t
      )
      .join('');
  }
  removeRandomLetter(text: string): string {
    if (text.length === 0) return this.getRandomLocaleWord(10);

    let idx = 0;
    if (text.length > 1) {
      idx = this.chancejs.natural({ min: 0, max: text.length - 1 });
    }
    return text
      .split('')
      .filter((t, i) => i !== idx)
      .join('');
  }
  addRandomLetter(text: string): string {
    const char = this.getRandomLocaleChar();
    let idx = 0;
    if (text.length > 1) {
      idx = this.chancejs.natural({ min: 0, max: text.length - 1 });
    }

    return text
      .split('')
      .map((t, i) => (i === idx ? t + char : t))
      .join('');
  }
}

export default FakerData;
