/**
 * Problem #5: Longest Palindromic Substring (Medium)
 * 
 * Given a string s, return the longest palindromic substring in s.
 * 
 * Example 1:
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 * 
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 * 
 * Constraints:
 * - 1 <= s.length <= 1000
 * - s consists of only digits and English letters.
 * 
 * ---
 * ### Execution Flow Table (Example: s = "babad")
 * 
 * | Step | Index | Char | Expand (Odd) | Expand (Even) | Found Palindrome | State (Start, End) | Substring |
 * | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
 * | 0 | 0 | 'b' | "b" (1) | "" (0) | "b" | (0, 0) | "b" |
 * | 1 | 1 | 'a' | "bab" (3) | "" (0) | "bab" | (0, 2) | "bab" |
 * | 2 | 2 | 'b' | "aba" (3) | "" (0) | "aba" (equal len) | (0, 2) | "bab" |
 * | 3 | 3 | 'a' | "a" (1) | "" (0) | - | (0, 2) | "bab" |
 * | 4 | 4 | 'd' | "d" (1) | "" (0) | - | (0, 2) | "bab" |
 * 
 * Final Result: "bab" (or "aba")
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length < 2) return s;

    let start = 0;
    let end = 0;

    /**
     * Helper to expand outwards from a center and return the length of the palindrome
     */
    let checkAround = function (s, left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // Result is length: right - left - 1
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        // Case 1: Centered at i (odd length, e.g. "aba")
        let len1 = checkAround(s, i, i);
        
        // Case 2: Centered between i and i+1 (even length, e.g. "abba")
        let len2 = checkAround(s, i, i + 1);
        
        // Pick the best of the two
        let len = Math.max(len1, len2);
        
        // Update the best start/end indices if we found a longer one
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    return s.slice(start, end + 1);
};
