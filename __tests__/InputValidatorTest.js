import { ERROR_MESSAGE, TERMS } from '../src/utils/constants';
import InputValidator from '../src/utils/Validator';

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
