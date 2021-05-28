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

run1();
run2();
