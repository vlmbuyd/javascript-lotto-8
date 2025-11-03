import { Console, MissionUtils } from '@woowacourse/mission-utils';
import { IO_MESSAGE, LOTTO_RULES } from '../utils/constants.js';
import Parser from '../utils/Parser.js';
import Lotto from './Lotto.js';

class LottoMachine {
  /**
   * 구입 가능한 로또 티켓 수 계산
   */
  static #determineLottoNumber(purchaseAmount) {
    return Parser.getPurchaseCount(purchaseAmount);
  }

  /**
   * 한 개의 로또 번호 생성 (e.g. [8, 21, 23, 41, 42, 43])
   */
  static #generateLottoNumbers() {
    return MissionUtils.Random.pickUniqueNumbersInRange(
      LOTTO_RULES.MIN_NUMBER,
      LOTTO_RULES.MAX_NUMBER,
      LOTTO_RULES.TICKET_NUMBER_COUNT
    );
  }

  /**
   * 로또 티켓 발행
   */
  static #issueLottoTickets(purchaseCount) {
    const issuedLottos = new Map();

    Array.from({ length: purchaseCount }).forEach(() => {
      const lottoNumbers = this.#generateLottoNumbers();
      const lotto = new Lotto(lottoNumbers);

      issuedLottos.set(lottoNumbers, lotto);
    });

    return issuedLottos;
  }

  static run(purchaseAmount) {
    const purchaseCount = this.#determineLottoNumber(purchaseAmount);
    Console.print(IO_MESSAGE.PURCHASE_COUNT_OUTPUT(purchaseCount));

    return this.#issueLottoTickets(purchaseCount);
  }
}

export default LottoMachine;
