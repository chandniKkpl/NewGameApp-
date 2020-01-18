/* eslint-disable */
import * as rules from "./rules";
import { get } from "lodash";

class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  createValidator(validationRules, state, field = null) {
    if (!field) {
      return this.validateForm(validationRules, state);
    }

    return this.validateElement(validationRules, state, field);
  }

  validate(stringRules, state, field) {
    const fieldRules = this.getFieldRules(stringRules, field);

    if (!fieldRules) return fieldRules;

    const item = field.indexOf("*") >= 0 ? state : state[field];
    const rule = this.rules.join([].concat(fieldRules));
    const errorMessage = rule(item, state);

    return errorMessage;
  }

  getFieldRules(stringRules, field) {
    const fieldRules = stringRules[field];

    if (typeof fieldRules === "undefined") return false;

    return fieldRules.map(stringRule => {
      const splitRule = stringRule.split("|");

      const functionName = splitRule[0];
      const args = splitRule[1];

      if (args) {
        return this.rules[functionName](args);
      }

      return this.rules[stringRule];
    });
  }

  validateElement(validationRules, state, field) {
    let errors = {};
    let item = state;
    let fieldName = field;

    if (field.indexOf("[") >= 0) {
      item = get(state, field);
      fieldName = field.replace(/\[\d+\]/, ".*");
    }

    const errorMessage = this.validate(validationRules, item, fieldName);

    if (errorMessage) {
      errors[field] = errorMessage;
    }

    const isValid = this.isValid(errors);

    return { isValid, errors };
  }

  validateForm(validationRules, state) {
    let errors = {};

    Object.keys(validationRules).forEach(field => {
      const fieldArray = field.split(".");

      if (fieldArray.length > 0 && fieldArray.indexOf("*") >= 0) {
        let [parentProperty, , name] = fieldArray;

        state[parentProperty].forEach((item, index) => {
          const fieldName = field.replace(".*", `[${index}]`);
          const errorMessage = this.validate(
            validationRules,
            item[name],
            field
          );

          if (errorMessage) {
            errors[fieldName] = errorMessage;
          }
        });
      }

      if (fieldArray.indexOf("*") === -1) {
        const errorMessage = this.validate(validationRules, state, field);

        if (errorMessage) {
          errors[field] = errorMessage;
        }
      }
    });

    let isValid = this.isValid(errors);

    return { isValid, errors };
  }

  isValid(errors) {
    return !!(Object.keys(errors).length === 0);
  }
}

export default new Validator(rules);
