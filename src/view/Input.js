import { Console } from '@woowacourse/mission-utils';
import InputValidator from '../utils/InputValidator.js';

class Input {
  /**
   * 올바른 입력을 받을 때까지 반복해서 입력을 요청
   */
  static async readValidInput(key, message) {
    try {
      const input = await Console.readLineAsync(message);
      InputValidator.runValidate(key, input);

      return input;
    } catch (err) {
      Console.print(err.message);
      return Input.readValidInput(key, message);
    }
  }

  /**
   * @param {string} key - 검증 키 (e.g. 'purchaseAmount', 'winningNumber')
   * @param {string} message - 입력 요청 메시지
   */
  static readInputValues(key, message) {
    return Input.readValidInput(key, message);
  }
}

export default Input;
