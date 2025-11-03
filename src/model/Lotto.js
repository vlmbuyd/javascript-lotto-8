import { ERROR_MESSAGE } from '../utils/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.GENERATED_LOTTO_COUNT);
    }

    if (new Set(numbers).size !== 6) {
      throw new Error(ERROR_MESSAGE.GENERATED_LOTTO_DUPLICATE);
    }
  }

  // TODO: 당첨 번호를 받아 몇개와 일치하는지
  // TODO: 보너스 번호와 일치하는지
}

export default Lotto;
