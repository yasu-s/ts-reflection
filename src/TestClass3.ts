export class BaseClass {
  protected memo = 'memo';
}

export class TestClass3 extends BaseClass {
  getMemo(): string {
    return this.memo + 'memomemo';
  }
}
