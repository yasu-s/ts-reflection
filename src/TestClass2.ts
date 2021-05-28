export class TestClass2 {
  constructor(private memo: string) {}

  getMemo(): string {
    return this.memo + 'memomemo';
  }
}
