/**
 * Problem #8: String to Integer (atoi) (Medium)
 * 
 * Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).
 * 
 * The algorithm for myAtoi(string s) is as follows:
 * 1. Read in and ignore any leading whitespace.
 * 2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
 * 3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
 * 4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
 * 5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.
 * 6. Return the integer as the final result.
 * 
 * Example 1:
 * Input: s = "42"
 * Output: 42
 * 
 * Example 2:
 * Input: s = "   -42"
 * Output: -42
 * 
 * Example 3:
 * Input: s = "4193 with words"
 * Output: 4193
 * 
 * Constraints:
 * - 0 <= s.length <= 200
 * - s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.
 * 
 * ---
 * ### Execution Flow Table (Example: s = "   -42")
 * 
 * | Step | s[i] | Phase          | result | isN |
 * | :--- | :--- | :---           | :---   | :--- |
 * | 0 | ' ' | Ignore spaces  | 0 | 1 |
 * | 1 | '-' | Sign Check     | 0 | -1 |
 * | 2 | '4' | Parsing Digits | 4 | -1 |
 * | 3 | '2' | Parsing Digits | 42 | -1 |
 * | 4 | -   | Complete       | 42 | -1 | => Result: -42
 */

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    let result = 0;
    let i = 0;
    let isN = 1;
    while (s[i] === " ") {
        i++;
    }
    if (s[i] == "-" || s[i] == "+") {
        if (s[i] == "-") isN = -1;
        i++;
    }

    while (s[i] >= "0" && s[i] <= "9") {
        result = result * 10 + +s[i];
        i++;
    }

    // Clamp the integer bounding
    if (result > 2147483647 || result < -2147483648) {
        if (isN > 0) return 2147483647;
        else return -2147483648;
    }
    
    return result * isN;
};
