import { LOTTO_RULES } from './constants.js';

class Parser {
  /**
   * 구입 금액으로 구입가능한 로또 티켓 수 계산
   * @param {string} purchaseAmount - 구입 금액 문자열 (e.g. '5000')
   */
  static getPurchaseCount(purchaseAmount) {
    return Number(purchaseAmount) / LOTTO_RULES.TICKET_PRICE;
  }
}

export default Parser;
