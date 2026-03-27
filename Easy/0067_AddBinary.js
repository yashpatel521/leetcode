/**
 * Problem #67: Add Binary
 * 
 * Given two binary strings a and b, return their sum as a binary string.
 * 
 * Example 1:
 * Input: a = "11", b = "1"
 * Output: "100"
 * 
 * Example 2:
 * Input: a = "1010", b = "1011"
 * Output: "10101"
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    let result = "";

    while (i >= 0 || j >= 0 || carry) {
        let sum = carry;

        if (i >= 0) sum += +a[i--];
        if (j >= 0) sum += +b[j--];

        result = (sum % 2) + result; // add bit
        carry = Math.floor(sum / 2); // carry
    }
    return result;
};
