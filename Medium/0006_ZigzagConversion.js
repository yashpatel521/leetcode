/**
 * Problem #6: Zigzag Conversion (Medium)
 * 
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 
 * And then read line by line: "PAHNAPLSIIGYIR"
 * 
 * Write the code that will take a string and make this conversion given a number of rows.
 * 
 * Example 1:
 * Input: s = "PAYPALISHIRING", numRows = 3
 * Output: "PAHNAPLSIIGYIR"
 * 
 * Example 2:
 * Input: s = "PAYPALISHIRING", numRows = 4
 * Output: "PINALSIGYAHRPI"  (Wait, original is PINALSIGYAHRPI)
 * 
 * Constraints:
 * - 1 <= s.length <= 1000
 * - s consists of English letters (lower-case and upper-case), ',' and '.'.
 * - 1 <= numRows <= 1000
 * 
 * ---
 * ### Execution Flow Table (Example: s = "PAYPAL", numRows = 3)
 * 
 * | Step | s[i] | temp (Row) | direction | arr Status |
 * | :--- | :--- | :---       | :---      | :--- |
 * | 0 | 'P' | 0 | 1 (Down) | `arr[0]="P"` |
 * | 1 | 'A' | 1 | 1 (Down) | `arr[1]="A"` |
 * | 2 | 'Y' | 2 | -1 (Up) | `arr[2]="Y"` (Hit bottom limit) |
 * | 3 | 'P' | 1 | -1 (Up) | `arr[1]="AP"` |
 * | 4 | 'A' | 0 | 1 (Down) | `arr[0]="PA"` (Hit top limit) |
 * | 5 | 'L' | 1 | 1 (Down) | `arr[1]="APL"` |
 * | 6 | -   | - | -        | **Result:** "PA" + "APL" + "Y" = "PAAPLY" |
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if (numRows === 1) return s;
    let arr = [];
    let direction = 1; // -1->up  1->down 
    let temp = 0;

    for (let i = 0; i < s.length; i++) {
        if (!arr[temp]) arr[temp] = "";
        arr[temp] = arr[temp] + s[i];
        temp += direction;
        if (temp === 0 || temp === numRows - 1) {
            direction *= -1;
        }
    }

    return arr.join("");
};
