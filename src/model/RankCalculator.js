import { LOTTO_RULES } from '../utils/constants.js';

class RankCalculator {
  /**
   * 일치 결과(일치 개수, 보너스 여부)를 토대로 순위 배열의 인덱스로 반환
   * @param {number} matchCount - 일치한 번호의 개수
   * @param {boolean} hasBonus - 보너스 번호 일치 여부
   * @returns {number | undefined} 통계 배열의 인덱스 (0: 1등, 1: 2등, ... 4: 5등). 꽝은 undefined.
   */
  static #getRankIndex(matchCount, hasBonus) {
    if (matchCount === 5) return hasBonus ? 1 : 2; // 1: 2등 인덱스, 2: 3등 인덱스

    // 일치 개수 : 랭크 인덱스
    const RANK_INDEX_MAP = {
      6: 0, // 1등
      4: 3, // 4등
      3: 4, // 5등
    };

    return RANK_INDEX_MAP[matchCount];
  }

  static calculate(issuedLottos, winningNumber, bonusNumber) {
    // [1등, 2등, 3등, 4등, 5등] 순서의 당첨 통계 배열
    // (예: [0, 0, 1, 0, 1] => 3등 1개, 5등 1개)
    const rankCounts = new Array(LOTTO_RULES.TOTAL_RANK_COUNT).fill(0);

    issuedLottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(winningNumber);
      const hasBonus = lotto.hasBonusNumber(bonusNumber);

      const rankIndex = this.#getRankIndex(matchCount, hasBonus);

      if (rankIndex !== undefined) rankCounts[rankIndex] += 1;
    });

    return rankCounts;
  }
}

export default RankCalculator;
