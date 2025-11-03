import { ERROR_MESSAGE, LOTTO_RULES, TERMS } from './constants.js';

/**
 * 구입 금액 검증
 */
class PurchaseAmountValidator {
  static #validateIsNaN(value) {
    if (Number.isNaN(Number(value))) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_TYPE);
    }
  }

  static #validateIsValidUnit(value) {
    if (value % LOTTO_RULES.TICKET_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_UNIT);
    }
  }

  static validate(value) {
    this.#validateIsNaN(value);
    this.#validateIsValidUnit(value);
  }
}

/**
 * 입력값 검증기
 */
class InputValidator {
  static #validators = {
    [TERMS.PURCHASE_AMOUNT]: (value) => PurchaseAmountValidator.validate(value),
  };

  // 공통 검증 로직
  static #commonValidate(input) {
    if (input.trim().length === 0) {
      throw new Error(ERROR_MESSAGE.BLANK_INPUT);
    }
  }

  static runValidate(key, value) {
    InputValidator.#commonValidate(value);

    const validator = this.#validators[key];
    validator(value);
  }
}

export default InputValidator;
