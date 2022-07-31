import EnglishChars from './en';

class PolishChars {
  private chars: string[] = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];

  constructor() {
    this.chars.push(...new EnglishChars().getChars());
    return this;
  }
  public getChars() {
    return this.chars;
  }
}

export default PolishChars;
