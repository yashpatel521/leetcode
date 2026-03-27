/**
 * Problem #26: Remove Duplicates from Sorted Array
 * 
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.
 * The relative order of the elements should be kept the same. Then return the number of unique elements in nums.
 * 
 * Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:
 * 1. Modify the array nums such that the first k elements of nums contain the unique elements in the order they were initially in nums.
 * 2. Return k.
 * 
 * Example 1:
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * 
 * Example 2:
 * Input: nums = [0,0,1,1,1,2,2,3,3,4]
 * Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums.length == 0) return 0;

    var k = 0;

    for (var i = 0; i < nums.length; i++) {
        if (nums[k] != nums[i]) {
            k++;
            nums[k] = nums[i];
        }
    }
    return k + 1;
};
