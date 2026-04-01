/**
 * Problem #11: Container With Most Water (Medium)
 * 
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 * Return the maximum amount of water a container can store.
 * 
 * Notice that you may not slant the container.
 * 
 * Example 1:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
 * 
 * Example 2:
 * Input: height = [1,1]
 * Output: 1
 * 
 * Constraints:
 * - n == height.length
 * - 2 <= n <= 10^5
 * - 0 <= height[i] <= 10^4
 * 
 * ---
 * ### Execution Flow Table (Example: height = [1,8,6,2])
 * 
 * | Step | left | right | height[left] | height[right] | Area (h * w) | maxArea | Action |
 * | :--- | :--- | :---  | :---         | :---          | :---         | :---    | :--- |
 * | 0    | 0    | 3     | 1            | 2             | 1 * 3 = 3    | 3       | `height[left] < height[right]`, left++ |
 * | 1    | 1    | 3     | 8            | 2             | 2 * 2 = 4    | 4       | `height[left] > height[right]`, right-- |
 * | 2    | 1    | 2     | 8            | 6             | 6 * 1 = 6    | 6       | `height[left] > height[right]`, right-- |
 * | 3    | -    | -     | -            | -             | -            | 6       | `left == right`, Loop terminates |
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        let h = Math.min(height[left], height[right]);
        let w = right - left;
        maxArea = Math.max(maxArea, h * w);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
};
