import 'reflect-metadata';

export const SampleClass = (option: string) => {
  /* eslint-disable-next-line */
  return <TFunction extends Function>(target: TFunction): TFunction => {
    Reflect.defineMetadata('SampleClassDecorator', option, target);
    return target;
  };
};
