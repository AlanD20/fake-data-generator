class EnglishChars {
  private chars: string[] = [];

  constructor() {
    this.generateChars(65, 90);
    this.generateChars(97, 122);
    return this;
  }
  public getChars() {
    return this.chars;
  }
  private generateChars(low: number, high: number) {
    for (let i = low; i <= high; i++) this.chars.push(String.fromCharCode(i));
    return this.chars;
  }
}

export default EnglishChars;
