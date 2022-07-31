import EnglishChars from './en';

class SpanishChars {
  private chars: string[] = [
    'á',
    'Á',
    'é',
    'É',
    'í',
    'Í',
    'ñ',
    'Ñ',
    'ó',
    'Ó',
    'ú',
    'Ú',
    'ü',
    'Ü',
  ];

  constructor() {
    this.chars.push(...new EnglishChars().getChars());
    return this;
  }
  public getChars() {
    return this.chars;
  }
}

export default SpanishChars;
