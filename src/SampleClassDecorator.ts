import 'reflect-metadata';

export const SampleClass = (option: string) => {
  return <TFunction>(target: TFunction): TFunction => {
    Reflect.defineMetadata('SampleClassDecorator', option, target);
    return target;
  };
};
