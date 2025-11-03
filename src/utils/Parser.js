import { LOTTO_RULES } from './constants.js';

class Parser {
  /**
   * 구입 금액으로 구입가능한 로또 티켓 수 계산
   * @param {string} purchaseAmount - 구입 금액 문자열 (e.g. '5000')
   */
  static getPurchaseCount(purchaseAmount) {
    return Number(purchaseAmount) / LOTTO_RULES.TICKET_PRICE;
  }

  /**
   * 문자열을 구분자로 분리하여 숫자 배열로 변환
   * @param {string} input - 입력 문자열
   * @param {string} seperator - 구분자
   * @returns
   */
  static convertToNumberArray(input, seperator) {
    return input.split(seperator).map((number) => {
      const trimmed = number.trim();

      if (trimmed === '') return NaN;

      return Number(trimmed);
    });
  }
}

export default Parser;
