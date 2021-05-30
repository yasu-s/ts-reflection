import * as fs from 'fs';
import * as path from 'path';
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

/**
 * dynamic import パターン
 * moduleName動的
 */
function run6(): void {
  const moduleName = './TestClass2';
  import(moduleName).then((module) => {
    for (const clazz of Object.values(module)) {
      if (!(clazz instanceof Function)) continue;
      const obj = Object.create(clazz.prototype);
      obj.constructor.apply(obj, ['hogeeeee']);
      console.log('run6: ' + obj.getMemo());
    }
  });
}

/**
 * dynamic import パターン
 * moduleName動的、Decoratorチェック
 */
function run7(): void {
  const moduleName = './TestClass2';
  import(moduleName).then((module) => {
    for (const clazz of Object.values(module)) {
      if (!(clazz instanceof Function)) continue;
      const decorator = Reflect.getMetadata('SampleClassDecorator', clazz) as string;
      if (!decorator) continue;
      const obj = Object.create(clazz.prototype);
      obj.constructor.apply(obj, ['hogeeeeee']);
      console.log('run7: ' + obj.getMemo());
    }
  });
}

/**
 * dynamic import パターン
 * moduleName動的、Decoratorチェック
 */
function run8(): void {
  const dir = path.dirname(process.argv[1]);
  const filePaths = fs
    .readdirSync(dir)
    .filter((p) => p.endsWith('.js'))
    .map((p) => './' + p);

  for (const filePath of filePaths) {
    import(filePath).then((module) => {
      for (const clazz of Object.values(module)) {
        if (!(clazz instanceof Function)) continue;
        const decorator = Reflect.getMetadata('SampleClassDecorator', clazz) as string;
        if (!decorator) continue;
        const obj = Object.create(clazz.prototype);
        obj.constructor.apply(obj, ['hogeeeeeeeee']);
        console.log('run8: ' + obj.getMemo());
      }
    });
  }
}

run1();
run2();
run3();
run4();
run5();
run6();
run7();
run8();
