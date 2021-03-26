import { configure, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { H } from '../services';

/**
 * Resolve locale message
 *
 * - For fieldname:
 *    + If 'valiator' component has 'name' property, fieldname = validator.name
 *    + Otherwise, get it from locale messages via 'validations.names.{fieldname}'
 * - For message:
 *    + 1st, check whether it exists in custom fields via 'validations.fields.{fieldname}.{rule}' key
 *    + 2nd, if it is, get it. Otherwise, get it via 'validations.messages.{rule}' key
 *
 * @param string _field_  [<any> | {field} if input is missing 'name' attribute]
 * @param json holders  [{ _field_: <string>, _rule_: <string>}, _value_: <any>, ...rest]
 *
 * @return  string
 */
function resolveLocaleMessage (_field_, holders) {
  // If propperty 'name' exists in validator component, it is _field_.
  // Otherwise, value of _field_ will be gotten from locale messages (locales)
  let keyField = `validations.names.${_field_}`;
  let keyMessage = `validations.fields.${_field_}.${holders._rule_}`;
  holders._field_ = H.__(keyField);
  if (keyField === holders._field_) { // key not exist
    holders._field_ = _field_;
  }
  let _message = H.__(keyMessage, holders);
  if (keyMessage === _message) {
    _message =  H.__(`validations.messages.${holders._rule_}`, holders);
  }
  return _message;
}

/**
 * Define default message function for rules
 */
configure({
  defaultMessage: resolveLocaleMessage
});

/**
 * Load built-in rules
 * Notes: use message as function for: when langulage changes, the message was also changed
 */
Object.keys(rules).forEach(rule => extend(rule, { ...rules[rule], message: resolveLocaleMessage }));

/*==================================================================================================*
 *-----------------------------------------DEFINE NEW RULES-----------------------------------------*
 *==================================================================================================*/

extend('secret', {
  validate: value => {
    return value === 'secret@gmail.com';
  },
  // use function for when langulage changes, the message was also changed
  message: (_field_, holders) => {
    return H.__('validations.messages.secret', holders);
  }
});

/**
 * Rule 'test'
 *
 * Note: we do not declare 'message' property here, so it will use default message function above
 */
extend('test', {
  validate: value => {
    return value === 'test';
  },
});

/**
 * Rule 'beweening'
 *
 * Note: we do not declare 'message' property here, so it will use default message function above
 */
extend('betweening', {
  validate: (value, { min, max }) => {
    return value >= min && value <= max;
  },
  params: ['min', 'max'], // placeholders in <rule>:{holder1},{holder2},... => min: holder1, max: holder2
});

extend('min', {
  validate: (value, args) => {
    return value.length >= args.length;
  },
  params: ['length'],
  message: 'This is an error message'
});

extend('between', {
  validate: (value, { min, max }) => {
    const length = value.length;
    return length >= min && length <= max;
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
