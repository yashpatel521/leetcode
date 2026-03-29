/**
 * Problem #3: Longest Substring Without Repeating Characters (Medium)
 * 
 * Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * 
 * Example 3:
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * 
 * Constraints:
 * - 0 <= s.length <= 5 * 10^4
 * - s consists of English letters, digits, symbols and spaces.
 * 
 * ---
 * ### Execution Flow Table (Example: s = "pwwkew")
 * 
 * | Step | Char | Start | i | Action | charSet | maxLength |
 * | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
 * | 0 | 'p' | 0 | 0 | Add 'p' | {p} | 1 |
 * | 1 | 'w' | 0 | 1 | Add 'w' | {p, w} | 2 |
 * | 2 | 'w' | 0 | 2 | Duplicate 'w'! Shrink window | {p, w} -> {w} | 2 |
 * | 3 | 'k' | 2 | 3 | Add 'k' | {w, k} | 2 |
 * | 4 | 'e' | 2 | 4 | Add 'e' | {w, k, e} | 3 |
 * | 5 | 'w' | 2 | 5 | Duplicate 'w'! Shrink window | {k, e, w} | 3 |
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length < 2) return s.length;

    let maxLength = 0;
    let start = 0;
    let charSet = new Set();

    for (let i = 0; i < s.length; i++) {
        // Sliding Window logic: 
        // If we find a duplicate, shrink the window from the left
        while (charSet.has(s[i])) {
            charSet.delete(s[start]);
            start++;
        }
        
        // Add current character and calculate max length
        charSet.add(s[i]);
        maxLength = Math.max(maxLength, i - start + 1);
    }
    
    return maxLength;
};
