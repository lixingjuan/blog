/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * sum
 * 节点一直往右，
 * curry: 是否要进位
 * curr: 当前节点
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode();
  // 为什么要额外声明 curr
  let curr = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum = sum + l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum = sum + l2.val;
      l2 = l2.next;
    }
    sum = sum + carry;
    curr.next = new ListNode(sum % 10); // 求模是为了得到个位数
    carry = Math.floor(sum / 10); // 除10是为了判断进位
    curr = curr.next;
  }

  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  return dummy.next;
};

addTwoNumbers([2, 4, 3], [5, 6, 4]);
