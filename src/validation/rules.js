import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
import { H } from '../helpers';

// Load built-in rules
// Object.keys(rules).forEach(rule => extend(rule, { ...rules[rule], messages[rule]));
// use message as function for: when langulage changes, the message was also changed
Object.keys(rules).forEach(rule => extend(rule, { ...rules[rule], message: (_field_, placeholders) => {
  return H.__(`validations.${rule}`, { _field_, ...placeholders });
} }));

// Define a new rule
extend('secret', {
  validate: value => {
    return value === 'secret@gmail.com';
  },
  // use function for when langulage changes, the message was also changed
  message: (_field_, placeholders) => {
    return H.__('validations.secret', { _field_ });
  }
});

extend('min', {
  validate: (value, args) => {
    return value.length >= args.length;
  },
  params: ['length'],
  message: 'This is an error message'
});

extend('between', {
  validate: (value, args) => {
    const length = value.length;

    return length >= args.min && length <= args.max;
  },
  params: ['min', 'max'],
  message: 'The {_field_} field must have at least {min} characters and {max} characters at most'
});

extend('one_of', (value, values) => {
  return values.indexOf(value) !== -1;
});

extend('positive', value => {
  if (value >= 0) {
    return true;
  }
  return 'The {_field_} field must be a positive number';
});

extend('min2', {
  validate: (value, { length }) => {
    return value.length >= length;
  },
  params: ['length'],
  message: 'The {_field_} field must have at least {length} characters' // _field_, _value_, _rule_
});

extend('minmax', {
  validate: (value, { min, max }) => {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: (fieldName, placeholders) => {
    return `The ${fieldName} field must have at least ${placeholders.min} characters and ${placeholders.max} characters at most`;
  }
});

extend('password', {
  validate: (value) => {
    return value.length >= 9;
  },
  message: 'The {_field_} field must have at least 9 characters'
});

extend('maxDifference', {
  params: ['otherValue', 'maxDifference'],
  validate: (value, { otherValue, maxDifference }) => {
    if (maxDifference === null || maxDifference === 0 || maxDifference >= Math.abs(value - otherValue)) {
      return true;
    }
    return false;
  },
  message:
    'The difference between the two numbers is too great. The maximum allowed is difference is {maxDifference}.'
});
