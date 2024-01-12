// Queue DS
class MaxPriorityQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(element, priority) {
    //time complexity is O(N)
    const item = { element, priority };
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (item.priority > this.queue[i].priority) {
        this.queue.splice(i, 0, item);
        added = true;
        break;
      }
    }
    if (!added) {
      this.queue.push(item);
    }
  }
  dequeue() {
    //time complexity is O(1)
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().element;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  size() {
    return this.queue.length;
  }
}
//Database
("SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)");

//Algorithms
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
function findMiddleNode(head) {
  if (head === null) {
    return null;
  }
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const middle = [];
  while (slow) {
    middle.push(slow.val);
    slow = slow.next;
  }
  return middle;
}
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);
// head.next.next.next.next.next = new ListNode(6);
console.log(findMiddleNode(head));
