import { ERROR_MESSAGE, LOTTO_RULES, SEPERATOR, TERMS } from './constants.js';
import Parser from './Parser.js';

/**
 * 당첨 번호 검증
 */
class WinningNumberValidator {
  static #validators = [
    this.#validateHasNaN,
    this.#validateDuplicate,
    this.#validateLength,
    this.#validateRange,
  ];

  /**
   * 숫자가 아닌 문자가 포함된 경우, 구분자가 쉼표(,)가 아닌 경우 검증
   */
  static #validateHasNaN(value) {
    if (value.some((number) => Number.isNaN(number))) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_TYPE);
    }
  }

  static #validateLength(value) {
    if (value.length !== LOTTO_RULES.TICKET_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_LENGTH);
    }
  }

  static #validateDuplicate(value) {
    if (new Set(value).size !== value.length) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_DUPLICATE);
    }
  }

  static #validateRange(value) {
    if (
      value.some((number) => number < LOTTO_RULES.MIN_NUMBER) ||
      value.some((number) => number > LOTTO_RULES.MAX_NUMBER)
    ) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_RANGE);
    }
  }

  static validate(value) {
    const parsedValue = Parser.convertToNumberArray(value, SEPERATOR.COMMA);

    this.#validators.forEach((validator) => validator.call(this, parsedValue));
  }
}

/**
 * 구입 금액 검증
 */
class PurchaseAmountValidator {
  static #validators = [this.#validateIsNaN, this.#validateIsValidUnit];

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
    this.#validators.forEach((validator) => validator.call(this, value));
  }
}

/**
 * 입력값 검증기
 */
class InputValidator {
  static #validators = {
    [TERMS.PURCHASE_AMOUNT]: (value) => PurchaseAmountValidator.validate(value),
    [TERMS.WINNING_NUMBER]: (value) => WinningNumberValidator.validate(value),
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
