import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGE } from '../utils/constants.js';

const PRIZE_INFO = [
  { description: '6개 일치', prize: 2_000_000_000 },
  { description: '5개 일치, 보너스 볼 일치', prize: 30_000_000 },
  { description: '5개 일치', prize: 1_500_000 },
  { description: '4개 일치', prize: 50_000 },
  { description: '3개 일치', prize: 5_000 },
];

class StatisticsView {
  /**
   * 당첨 통계 헤더를 출력합니다.
   */
  static #printStatisticsHeader() {
    Console.print(IO_MESSAGE.WINNING_STATISTICS_OUTPUT);
  }

  /**
   * 개별 당첨 내역을 출력
   */
  static #printRankDetails(rankCounts) {
    // 5등(index 4)부터 1등(index 0) 순서로 출력하기 위해 역순으로 순회
    for (let i = PRIZE_INFO.length - 1; i >= 0; i--) {
      const { description, prize } = PRIZE_INFO[i];
      const count = rankCounts[i];
      const prizeString = prize.toLocaleString('ko-KR');

      Console.print(`${description} (${prizeString}원) - ${count}개`);
    }
  }

  /**
   * 총 수익률을 계산하고 출력합니다.
   */
  static #printProfitRate(rankCounts, purchaseAmount) {
    // 총 상금 계산
    const totalProfit = rankCounts.reduce((sum, count, index) => {
      return sum + count * PRIZE_INFO[index].prize;
    }, 0);

    // 수익률 계산 ( (총상금 / 구매금액) * 100 )
    const profitRate = (totalProfit / purchaseAmount) * 100;

    Console.print(IO_MESSAGE.TOTAL_PROFIT_OUTPUT(profitRate));
  }

  /**
   * 당첨 통계 전체 결과를 출력합니다.
   * @param {number[]} rankCounts - [1등, 2등, 3등, 4등, 5등] 당첨 개수 배열
   * @param {number} purchaseAmount - 총 구매 금액
   */
  static printResult(rankCounts, purchaseAmount) {
    this.#printStatisticsHeader();
    this.#printRankDetails(rankCounts);
    this.#printProfitRate(rankCounts, purchaseAmount);
  }
}

export default StatisticsView;
