import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStringOrNumberOrBoolean(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStringOrNumberOrBoolean',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const isValidType = (val: any) =>
            typeof val === 'string' ||
            typeof val === 'number' ||
            typeof val === 'boolean';

          if (validationOptions?.each) {
            return Array.isArray(value) && value.every(isValidType);
          }

          return isValidType(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} doit être ${
            validationOptions?.each ? 'un tableau de' : 'une'
          } string, number ou boolean.`;
        },
      },
    });
  };
}
