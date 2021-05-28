import { TestClass } from './TestClass';

/**
 * Object.create使用パターン
 */
function run1(): void {
  const obj = Object.create(TestClass.prototype) as TestClass;
  console.log('run1: ' + obj.getMemo());
}

/**
 * Object.create + constructor.apply使用パターン
 */
function run2(): void {
  const obj = Object.create(TestClass.prototype) as TestClass;
  obj.constructor.apply(obj, ['hoge']);
  console.log('run2: ' + obj.getMemo());
}

/**
 * typeof 使用パターン
 */
function run3(): void {
  const clazz = TestClass;
  const obj = new clazz('hogee');
  console.log('run3: ' + obj.getMemo());
}

interface TestClassConstructor {
  new (param: string): TestClass;
}

/**
 * TestClassConstructorキャストパターン
 */
function run4(): void {
  const clazz = TestClass as TestClassConstructor;
  const obj = new clazz('hogeee');
  console.log('run4: ' + obj.getMemo());
}

/**
 * dynamic import パターン
 */
function run5(): void {
  import('./TestClass2').then((module) => {
    const obj = new module.TestClass2('hoge');
    console.log('run5: ' + obj.getMemo());
  });
}

run1();
run2();
run3();
run4();
run5();
