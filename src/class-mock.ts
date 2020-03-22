import { DeepPartial, PickByValue } from 'utility-types';

export type Type<T> = new (...args: any[]) => T;

type PartialOrPromise<T> = T extends Promise<infer U> ? T : DeepPartial<T> | null;

type PropertyMock<Property> = Property extends (...args: any[]) => any
  ? Property & jest.MockInstance<PartialOrPromise<ReturnType<Property>>, Parameters<Property>>
  : Property;

export type ClassMock<Class> = {
  [K in keyof PickByValue<Class, Function>]: PropertyMock<Class[K]>;
} &
  Class;

export function mockClass<Class>(classType: Type<Class>): Type<ClassMock<Class>> {
  class MockedClass {
    constructor() {
      Object.getOwnPropertyNames(classType.prototype)
        .filter(method => !(this as any)[method] && method !== 'constructor')
        .forEach(method => {
          (this as any)[method] = jest.fn().mockName(method);
        });
    }
  }

  return MockedClass as Type<ClassMock<Class>>;
}
