/**
 * Problem 108: Convert Sorted Array to Binary Search Tree
 * Difficulty: Easy
 *
 * Given an integer array nums where elements are sorted in ascending order,
 * convert it to a height-balanced binary search tree.
 *
 * Example 1:
 * Input: nums = [-10,-3,0,5,9]
 * Output: [0,-3,9,-10,null,5]
 *
 * Example 2:
 * Input: nums = [1,3]
 * Output: [3,1]
 *
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums is sorted in a strictly increasing order.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(log n) recursion stack for tree depth.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    function createNode(start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(nums[mid]);

        node.left = createNode(start, mid - 1);
        node.right = createNode(mid + 1, end);

        return node;
    }

    return createNode(0, nums.length - 1);
};
