/**
 * Problem #7: Reverse Integer (Medium)
 * 
 * Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
 * 
 * Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
 * 
 * Example 1:
 * Input: x = 123
 * Output: 321
 * 
 * Example 2:
 * Input: x = -123
 * Output: -321
 * 
 * Example 3:
 * Input: x = 120
 * Output: 21
 * 
 * Constraints:
 * - -2^31 <= x <= 2^31 - 1
 * 
 * ---
 * ### Execution Flow Table (Example: x = 123)
 * 
 * | Step | result | temp | temp % 10 | Action |
 * | :--- | :--- | :--- | :--- | :--- |
 * | 0 | 0 | 123 | - | Initialize variables |
 * | 1 | 3 | 12 | 3 | Add 3 to result |
 * | 2 | 32 | 1 | 2 | Add 2 to result |
 * | 3 | 321 | 0 | 1 | Add 1 to result |
 * | 4 | 321 | 0 | - | Return result (in bounds) |
 */

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let result = 0;
    let temp = x;
    while (temp) {
        result = result * 10 + (temp % 10);
        temp = Math.trunc(temp / 10);
    }
    if (result > 2147483647 || result < -2147483648) return 0;
    return result;
};
