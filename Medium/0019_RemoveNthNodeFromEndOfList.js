/**
 * Problem 19: Remove Nth Node From End of List
 * Difficulty: Medium
 *
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 *
 * Example 2:
 * Input: head = [1], n = 1
 * Output: []
 *
 * Example 3:
 * Input: head = [1,2], n = 1
 * Output: [1]
 *
 * Constraints:
 * - The number of nodes in the list is sz.
 * - 1 <= sz <= 30
 * - 0 <= Node.val <= 100
 * - 1 <= n <= sz
 *
 * Follow up: Could you do this in one pass?
 *
 * Execution Flow:
 * 1. Count the total length of the linked list
 * 2. Create a dummy node pointing to head
 * 3. Calculate position from start: length - n
 * 4. Traverse to the node before the target
 * 5. Skip the target node by updating next pointer
 * 6. Return dummy.next (new head)
 *
 * Time Complexity: O(L) where L is the length of the list (two passes)
 * Space Complexity: O(1) - only using constant extra space
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let length = 0;
    let curr = head;

    // count length
    while (curr) {
        length++;
        curr = curr.next;
    }

    let dummy = new ListNode(0, head);
    curr = dummy;

    // go to node before target
    for (let i = 0; i < length - n; i++) {
        curr = curr.next;
    }

    curr.next = curr.next.next;

    return dummy.next;
};

/*
Follow-up solution (One Pass - Two Pointers):

var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head);
    let first = dummy;
    let second = dummy;

    // Advance first pointer by n+1 steps
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }

    // Move both pointers until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }

    // Remove the nth node from end
    second.next = second.next.next;

    return dummy.next;
};
*/