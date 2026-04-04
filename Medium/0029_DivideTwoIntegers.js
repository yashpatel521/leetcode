/**
 * Problem 29: Divide Two Integers
 * Difficulty: Medium
 *
 * Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.
 * The integer division should truncate toward zero, which means losing its fractional part.
 * You may assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2^31, 2^31 − 1].
 * For this problem, if the quotient is strictly greater than 2^31 − 1, then return 2^31 − 1, and if the quotient is strictly less than −2^31, then return −2^31.
 *
 * Example 1:
 * Input: dividend = 10, divisor = 3
 * Output: 3
 *
 * Example 2:
 * Input: dividend = 7, divisor = -3
 * Output: -2
 *
 * Constraints:
 * - -2^31 <= dividend, divisor <= 2^31 - 1
 * - divisor != 0
 *
 * Time Complexity: O(log n) where n is the dividend
 * Space Complexity: O(1)
 */

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;

    // Handle overflow
    if (dividend === INT_MIN && divisor === -1) {
        return INT_MAX;
    }
    if (dividend === INT_MIN && divisor === 1) {
        return INT_MIN;
    }

    // Work with negatives only
    let negatives = 2;
    if (dividend > 0) {
        dividend = -dividend;
        negatives--;
    }
    if (divisor > 0) {
        divisor = -divisor;
        negatives--;
    }

    let result = 0;

    while (dividend <= divisor) {
        let temp = divisor;
        let multiple = 1;

        // Prevent overflow when doubling
        while (temp >= (INT_MIN >> 1) && dividend <= (temp << 1)) {
            temp <<= 1;
            multiple <<= 1;
        }

        dividend -= temp;
        result += multiple;
    }

    // Apply sign
    return negatives === 1 ? -result : result;
};