/** Internal node used as elements of the priority queue
*  Contatins 2 fields one to store data and one for it's priority
*/
class Node {
  constructor(data, priority) {
    this.data = data
    this.priority = priority
  }

  // Returns the string representation of the node
  toString() {
    return this.priority
  }
}

/**
* The Constructor for the priority queue.
* Using the Heap Implementation which performs push, pull in lograthmic time.
*/
export default class PriorityQueue {
  constructor() {
    this.heap = [null]
  }

  /**
  * Push a data entry(with a given priority) into the priority queue.
  * Takes time equivalent to O(log n) where n is the number of elements
  * currently in the queue.
  *
   * @param  {Object} data     [the content]
   * @param  {nulber} priority [the priority of the content]
   * @return {null}          [nothing]
   */
  push(data, priority) {
    let node = new Node(data, priority)
    // append the element to the end of the list and then bubble it
    // up to its place.
    this.bubble(this.heap.push(node) - 1)
  }

  /**
   * Removes and returns the data of highest priority (i.e. one with the
   * lowest value).
   * Takes time proportional to O(log n).
   *
   * @return {Object} [the object with the max priority (i.e. the one with the minimum value for priority)]
   */
  pop() {
    // throw an error if list is [null].
    if (this.heap.length < 2) {
      throw new Error('Underflow')
    }

    // get the value of the top element
    let topVal = this.heap[1].data

    // pop the last element and put it on the top then sink it down hence
    //  maintaining the heap invarient.
    if (this.heap.length > 2) {
      this.heap[1] = this.heap.pop()
    } else {
      this.heap.pop()
    }

    this.sink(1)
    return topVal
  }

  // PRIVATE HELPER: bubbles node i up the binary tree based on priority until heap conditions are restored
  bubble(node) {
    let i = node
    // while the index of the element is greater than 1 and it has
    // higher priority compared to it's parent then exchange them
    while (i > 1 && this.isHigherPriority(i >> 1, i)) {
      this.swap(i, i >> 1)
      i >>= 1
    }
  }

  // Sinks a low priority element down to it's place until the heap invarient is restored.
  sink(node) {
    let i = node
    // while ith node has a child
    while (i * 2 < this.heap.length) {
      let j = 2 * i
      // pick the child with the higher priority
      if (j < this.heap.length - 1 && this.isHigherPriority(j, j + 1)) {
        j += 1
      }
      // compare priority to it's parent
      if (!(this.isHigherPriority(i, j))) {
        break
      }
      // swap if parent has low priority
      this.swap(i, j)
      i = j
    }
  }

  // swaps the addresses of 2 nodes
  swap(i, j) {
    let temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  // returns true if node i is higher priority than j
  isHigherPriority(i, j) {
    return ((this.heap[i].priority - this.heap[j].priority) > 0)
  }
}
