import { ERROR_MESSAGE, LOTTO_RULES } from '../utils/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO_RULES.TICKET_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGE.GENERATED_LOTTO_COUNT);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.GENERATED_LOTTO_DUPLICATE);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  calculateMatchCount(winningNumber) {
    return this.#numbers.filter((number) => winningNumber.includes(number))
      .length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(Number(bonusNumber));
  }
}

export default Lotto;
