/** 核心:  */
/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * 将数组转为链表
 * @param valAry
 * @returns 返回头节点
 */
function createListNodes(valAry) {
  const count = valAry.length;
  const nodeAry = [];
  for (let i = count - 1; i > -1; i--) {
    let newNode = null;
    if (i === count - 1) {
      newNode = new ListNode(valAry[i], null);
    } else {
      newNode = new ListNode(valAry[i], nodeAry[nodeAry.length - 1]);
    }
    nodeAry.push(newNode);
  }
  const headerNode = nodeAry[nodeAry.length - 1];
  return headerNode;
}

/**
 * 将链表转为数组（用于 console.log 查看）
 * @param listNode 这是头节点
 * @returns 返回一个数组（数组中包含的是每个节点的 val）
 */
function ListNodeToAry(listNode) {
  if (listNode == null) {
    return null;
  }
  const valAry = [];
  let cursor = listNode;
  while (cursor !== null) {
    valAry.push(cursor.val);
    cursor = cursor.next;
  }
  return valAry;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode();
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1.val || 0;
    const val2 = l2.val || 0;

    const sum = val1 + val2 + carry;

    const sumNode = new ListNode(sum % 10);
    current.next = sumNode;
    carry = Math.floor(sum / 10);

    current = current.next;
    l1 = l1.next || 0;
    l2 = l2.next || 0;
  }

  return dummy.next;
};

let l1 = [2, 4, 3],
  l2 = [5, 6, 4];

console.log(ListNodeToAry(addTwoNumbers(createListNodes(l1), createListNodes(l2))));
