/**
 * Problem 22: Generate Parentheses
 * Difficulty: Medium
 *
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 *
 * Example 1:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 *
 * Example 2:
 * Input: n = 1
 * Output: ["()"]
 *
 * Constraints:
 * - 1 <= n <= 8
 *
 * Strategy:
 * - Use backtracking (recursive DFS) to build parentheses strings.
 * - Keep track of open and close counts.
 * - Add '(' when open < n.
 * - Add ')' when close < open.
 * - Accept string when length reaches 2*n.
 *
 * Time Complexity: O(Catalan(n)) in terms of number of valid combinations.
 * Space Complexity: O(n) recursion stack + result size.
 */

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];

  function backtrack(path, open, close) {
    if (path.length === 2 * n) {
      result.push(path);
      return;
    }

    if (open < n) {
      backtrack(path + "(", open + 1, close);
    }

    if (close < open) {
      backtrack(path + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
};
