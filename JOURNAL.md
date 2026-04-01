# LeetCode Journey Journal

A daily log of my progress, challenges, and learnings while solving LeetCode problems.

## Day 1: March 26, 2026
**Problems Solved:** 6 ([#1](file:///e:/LeetCode/Easy/0001_TwoSum.js), [#9](file:///e:/LeetCode/Easy/0009_PalindromeNumber.js), [#13](file:///e:/LeetCode/Easy/0013_RomanToInteger.js), [#14](file:///e:/LeetCode/Easy/0014_LongestCommonPrefix.js), [#20](file:///e:/LeetCode/Easy/0020_ValidParentheses.js), [#21](file:///e:/LeetCode/Easy/0021_MergeTwoSortedLists.js))

**Experience & Learning:**
- **Project Structure**: Set up the foundational structure for this repository, organizing problems by difficulty and implementing an automated progress tracking system via `README.md` files.
- **Core Algorithms**: Tackled fundamental problems involving hash maps (Two Sum), string manipulation (Longest Common Prefix, Valid Parentheses), and math (Roman to Integer, Palindrome Number).
- **Portfolio Integration**: Linked this repository to my main GitHub portfolio and added dynamic stats cards to showcase my progress.
- **Git Workflow**: Established a clean workflow for committing and pushing solutions with appropriate documentation.

## Day 2: March 27, 2026
**Problems Solved:** 10 ([#26](file:///e:/LeetCode/Easy/0026_RemoveDuplicatesFromSortedArray.js), [#27](file:///e:/LeetCode/Easy/0027_RemoveElement.js), [#28](file:///e:/LeetCode/Easy/0028_FindIndexFirstOccurrence.js), [#35](file:///e:/LeetCode/Easy/0035_SearchInsertPosition.js), [#58](file:///e:/LeetCode/Easy/0058_LengthOfLastWord.js), [#66](file:///e:/LeetCode/Easy/0066_PlusOne.js), [#67](file:///e:/LeetCode/Easy/0067_AddBinary.js), [#69](file:///e:/LeetCode/Easy/0069_SqrtX.js), [#83](file:///e:/LeetCode/Easy/0083_RemoveDuplicatesFromSortedList.js), [#88](file:///e:/LeetCode/Easy/0088_MergeSortedArray.js))

**Experience & Learning:**
...
- **In-Place Merging**: Mastered the technique of merging two sorted arrays in-place by iterating backwards. This prevents overwriting data in the first array and is highly efficient (O(1) space).
- **Consistency**: Reached **16 total problems solved**! Today has been legendary with 10 new solutions documented in a single day.

---

## Day 3: March 29, 2026
**Problems Solved:** 7 ([#70](file:///e:/LeetCode/Easy/0070_ClimbingStairs.js), [#94](file:///e:/LeetCode/Easy/0094_BinaryTreeInorderTraversal.js), [#100](file:///e:/LeetCode/Easy/0100_SameTree.js), [#101](file:///e:/LeetCode/Easy/0101_SymmetricTree.js), [#2](file:///e:/LeetCode/Medium/0002_AddTwoNumbers.js), [#3](file:///e:/LeetCode/Medium/0003_LongestSubstringWithoutRepeatingCharacters.js), [#5](file:///e:/LeetCode/Medium/0005_LongestPalindromicSubstring.js))

**Experience & Learning:**
- **Dynamic Programming (DP)**: Solved "Climbing Stairs," which is a classic introduction to DP. It was interesting to see how the problem breaks down into smaller sub-problems. It's essentially the Fibonacci sequence where each step is the sum of the ways to reach the two previous steps. 
- **Tree Structures**: Added "Binary Tree Inorder Traversal," "Same Tree," and "Symmetric Tree." These problems highlighted the power of **Recursion** for traversing and comparing hierarchical structures. The "mirror image" logic for symmetry was a direct extension of the "same tree" comparison.
- **Sliding Window**: Mastered the **Sliding Window** technique with "Longest Substring Without Repeating Characters." Using a `Set` to track the current unique sequence and shrinking the window from the left is an elegant solution to an $O(n)$ problem.
- **Expand Around Center**: Solved "Longest Palindromic Substring" by expanding from each character (odd length) and each gap between characters (even length). This is an intuitive $O(n^2)$ solution that reinforces symmetry concepts from the earlier tree problems. 
- **Milestone 23**: Reached a total of **23 problems solved**. Today has been incredibly productive with a strong mix of Easy and Medium problems, plus a major repository cleanup!

---

## Day 4: March 30, 2026
**Problems Solved:** 3 ([#6](file:///e:/LeetCode/Medium/0006_ZigzagConversion.js), [#7](file:///e:/LeetCode/Medium/0007_ReverseInteger.js), [#8](file:///e:/LeetCode/Medium/0008_StringToIntegerAtoi.js))

**Experience & Learning:**
- **String & Array Manipulation**: Tackled "Zigzag Conversion," manipulating rows and arrays using a bidirectional pointer (`direction`). It was a clever way to simulate downward and upward diagonal reads without complex 2D matrices.
- **Integer Manipulation**: Solved two classic medium problems: "Reverse Integer" and "String to Integer (atoi)". Both of these required careful consideration of 32-bit signed integer boundaries (`-2147483648` to `2147483647`).
- **Edge Cases**: In `atoi`, I learned that string parsing problems are 90% edge-cases. Dealing with leading whitespaces, negative/positive signs, correctly stopping at non-digit characters, and bounding the final result really reinforced the importance of step-by-step state tracking.
- **Milestone**: Reached **26 total problems solved**! Finding a steady rhythm with Medium-difficulty challenges.

*"Building the future of enterprise software, one line of code at a time."*

---
## Day 5: April 1, 2026
**Problems Solved:** 5 ([#12](file:///e:/LeetCode/Medium/0012_IntegerToRoman.js), [#15](file:///e:/LeetCode/Medium/0015_ThreeSum.js), [#16](file:///e:/LeetCode/Medium/0016_3SumClosest.js), [#17](file:///e:/LeetCode/Medium/0017_LetterCombinationsOfAPhoneNumber.js), [#104](file:///e:/LeetCode/Easy/0104_MaximumDepthOfBinaryTree.js))

**Experience & Learning:**
- **Greedy Algorithm**: Solved "Integer to Roman" using a greedy approach with predefined value-symbol pairs. Starting from the largest values (1000, 900, 500, etc.) and subtracting them from the input number while building the Roman numeral string. This ensures we always use the largest possible Roman numeral symbols first, which is the optimal greedy strategy for this problem.
- **Two Pointers + Sorting**: Solved "3Sum" with a sorted array and two-pointer technique, handling duplicates with fast skip conditions to avoid repeat triplets in the result.
- **Two Pointers + Target Tracking**: Solved "3Sum Closest" using a similar two-pointer approach but tracking the closest sum to target instead of exact matches. The key insight is maintaining the minimum absolute difference while iterating through possible combinations.
- **Backtracking**: Solved "Letter Combinations of a Phone Number" using backtracking to generate all possible combinations. The recursive approach explores each digit's possible letters, building combinations by adding one character at a time until all digits are processed.
- **Tree Recursion**: Solved "Maximum Depth of Binary Tree" using recursive depth-first search, calculating the maximum depth by taking the max of left and right subtrees plus one. This is a classic tree traversal pattern that demonstrates the power of recursion for hierarchical data structures.
- **Milestone**: Reached **32 total problems solved**! Continuing the momentum with a mix of Easy and Medium challenges.

*"Building the future of enterprise software, one line of code at a time."*
