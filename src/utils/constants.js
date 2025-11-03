export const IO_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT_INPUT: '구입금액을 입력해 주세요.\n',
  WINNING_NUMBER_INPUT: '\n당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER_INPUT: '\n보너스 번호를 입력해 주세요.\n',

  PURCHASE_COUNT_OUTPUT: (count) => `\n${count}개를 구입했습니다.`,
  WINNING_STATISTICS_OUTPUT: '당첨 통계\n---\n',
  TOTAL_PROFIT_OUTPUT: (profitRate) =>
    `총 수익률은 ${profitRate.toFixed(2)}%입니다.`,
});

export const ERROR_MESSAGE = Object.freeze({
  BLANK_INPUT: '[ERROR] 입력값이 비어 있습니다.',

  PURCHASE_AMOUNT_UNIT: '[ERROR] 구입 금액은 1,000원 단위여야 합니다.',
  PURCHASE_AMOUNT_TYPE: '[ERROR] 구입 금액은 숫자여야 합니다.',

  GENERATED_LOTTO_COUNT: '[ERROR] 로또 번호는 6개여야 합니다.',
  GENERATED_LOTTO_DUPLICATE: '[ERROR] 로또 번호에 중복된 숫자가 있습니다.',

  WINNING_NUMBER_LENGTH: '[ERROR] 당첨 번호는 6개여야 합니다.',
  WINNING_NUMBER_TYPE: '[ERROR] 당첨 번호의 입력 형식이 올바르지 않습니다.',
  WINNING_NUMBER_DUPLICATE: '[ERROR] 당첨 번호에 중복된 숫자가 있습니다.',
  WINNING_NUMBER_RANGE: '[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.',

  BONUS_NUMBER_TYPE: '[ERROR] 보너스 번호는 숫자여야 합니다.',
});

export const LOTTO_RULES = Object.freeze({
  TICKET_PRICE: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  TICKET_NUMBER_COUNT: 6,
});

export const SEPERATOR = Object.freeze({
  COMMA: ',',
});

export const TERMS = Object.freeze({
  PURCHASE_AMOUNT: 'purchaseAmount',
  WINNING_NUMBER: 'winningNumber',
  BONUS_NUMBER: 'bonusNumber',
});
