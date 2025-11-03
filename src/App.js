import { Console } from '@woowacourse/mission-utils';
import LottoMachine from './model/LottoMachine.js';
import { IO_MESSAGE, SEPERATOR, TERMS } from './utils/constants.js';
import Input from './view/Input.js';
import Parser from './utils/Parser.js';
import RankCalculator from './model/RankCalculator.js';
import StatisticsView from './view/StatisticsView.js';

class App {
  #issuedLottos = [];

  /**
   * 1. 구입 금액을 입력받고 숫자로 변환
   */
  async getPurchaseAmount() {
    const purchaseAmountStr = await Input.readInputValues(
      TERMS.PURCHASE_AMOUNT,
      IO_MESSAGE.PURCHASE_AMOUNT_INPUT
    );
    return Number(purchaseAmountStr);
  }

  /**
   * 2. 로또 발행
   */
  issueLottos(purchaseAmount) {
    this.#issuedLottos = LottoMachine.run(purchaseAmount);
  }

  /**
   * 3. 발행된 로또 번호를 정렬하여 출력
   */
  printIssuedLottos() {
    this.#issuedLottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      numbers.sort((a, b) => a - b);
      Console.print(`[${numbers.join(', ')}]`);
    });
  }

  /**
   * 4. 당첨 번호와 보너스 번호를 입력받고 파싱
   */
  async getWinningNumbers() {
    const winningNumber = await Input.readInputValues(
      TERMS.WINNING_NUMBER,
      IO_MESSAGE.WINNING_NUMBER_INPUT
    );
    const parsedWinningNumber = Parser.convertToNumberArray(
      winningNumber,
      SEPERATOR.COMMA
    );

    const bonusNumber = await Input.readInputValues(
      TERMS.BONUS_NUMBER,
      IO_MESSAGE.BONUS_NUMBER_INPUT
    );

    return { winningNumber: parsedWinningNumber, bonusNumber };
  }

  // 전체 프로세스 실행
  async run() {
    const purchaseAmount = await this.getPurchaseAmount();
    this.issueLottos(purchaseAmount);
    this.printIssuedLottos();

    const { winningNumber, bonusNumber } = await this.getWinningNumbers();

    const rankCounts = RankCalculator.calculate(
      this.#issuedLottos,
      winningNumber,
      bonusNumber
    );

    StatisticsView.printResult(rankCounts, purchaseAmount);
  }
}

export default App;
