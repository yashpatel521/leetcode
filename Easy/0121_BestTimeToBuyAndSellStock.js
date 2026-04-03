/**
 * Problem 121: Best Time to Buy and Sell Stock
 * Difficulty: Easy
 *
 * You are given an array prices where prices[i] is the price of a given stock on the i-th day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 *
 * Example:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 *
 * Constraints:
 * - 1 <= prices.length <= 10^5
 * - 0 <= prices[i] <= 10^4
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let minPrice = prices[0];
    let profit = 0;

    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > profit) {
            profit = price - minPrice;
        }
    }

    return profit;
};
