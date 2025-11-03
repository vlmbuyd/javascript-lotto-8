import { ERROR_MESSAGE, TERMS } from '../src/utils/constants';
import InputValidator from '../src/utils/InputValidator';

describe('입력값 검증 테스트 (로또 구입 금액)', () => {
  it.each([
    ['공백이 입력된 경우', '  ', ERROR_MESSAGE.BLANK_INPUT],
    [
      '숫자가 아닌 문자가 포함된 경우',
      'lotto',
      ERROR_MESSAGE.PURCHASE_AMOUNT_TYPE,
    ],
    [
      '1,000원으로 나누어 떨어지지 않는 경우',
      '900',
      ERROR_MESSAGE.PURCHASE_AMOUNT_UNIT,
    ],
  ])('%s', (_, input, expectedError) => {
    expect(() =>
      InputValidator.runValidate(TERMS.PURCHASE_AMOUNT, input)
    ).toThrow(expectedError);
  });
});

describe('입력값 검증 테스트 (당첨 번호)', () => {
  it.each([
    [
      '구분자가 쉼표(,)가 아닌 경우',
      '1,2;3,4,5,6',
      ERROR_MESSAGE.WINNING_NUMBER_TYPE,
    ],
    [
      '구분자 형식이 잘못된 경우',
      ',1,2,3,4,5,6',
      ERROR_MESSAGE.WINNING_NUMBER_TYPE,
    ],
    [
      '숫자가 아닌 문자가 포함된 경우',
      '1,2,h,4,5,6',
      ERROR_MESSAGE.WINNING_NUMBER_TYPE,
    ],
    [
      '숫자가 6개가 아닌 경우',
      '1,2,3,4,5',
      ERROR_MESSAGE.WINNING_NUMBER_LENGTH,
    ],
    [
      '중복된 숫자가 포함된 경우',
      '1,2,3,4,5,5',
      ERROR_MESSAGE.WINNING_NUMBER_DUPLICATE,
    ],
    [
      '1~45 범위 밖의 숫자가 포함된 경우',
      '1,2,3,4,5,50',
      ERROR_MESSAGE.WINNING_NUMBER_RANGE,
    ],
  ])('%s', (_, input, expectedError) => {
    expect(() =>
      InputValidator.runValidate(TERMS.WINNING_NUMBER, input)
    ).toThrow(expectedError);
  });
});
