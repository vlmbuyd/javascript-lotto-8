import { Console } from '@woowacourse/mission-utils';
import LottoMachine from './model/LottoMachine.js';
import { IO_MESSAGE, SEPERATOR, TERMS } from './utils/constants.js';
import Input from './view/Input.js';
import Parser from './utils/Parser.js';
import RankCalculator from './model/RankCalculator.js';
import StatisticsView from './view/StatisticsView.js';

class App {
  async run() {
    const purchaseAmount = await Input.readInputValues(
      TERMS.PURCHASE_AMOUNT,
      IO_MESSAGE.PURCHASE_AMOUNT_INPUT
    );

    const issuedLottos = LottoMachine.run(purchaseAmount);
    issuedLottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      numbers.sort((a, b) => a - b);
      Console.print(numbers);
    });

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

    const rankCounts = RankCalculator.calculate(
      issuedLottos,
      parsedWinningNumber,
      bonusNumber
    );

    StatisticsView.printResult(rankCounts, purchaseAmount);
  }
}

export default App;
