import SearchNode from './SearchNode'
import PriorityQueue from '../helpers/PriorityQueue'

// adds neighbouring boards of a given search-node to the priority-queue
// that is passed.
const addNeighbours = (searchNode, priorityQueue) => {
  for (let board of searchNode.board.neighbours()) {
    let n = new SearchNode(board, searchNode)
    if (searchNode.prev === null || !n.board.equals(searchNode.prev.board)) {
      priorityQueue.push(n, n.priority)
    }
  }
}

/**
 * This is the method that implements the ever popular A* Search. The heuristic
 * that I am using here is the manhattan distance with the current number of
 * moves. The lower the number the more likly is the node next up for exploration.
 *
 * @param  {[type]} board [the board for which solution is required]
 * @return {[type]}    [ an array of boards that lead to solution (in reverse order) ]
 */
const aStar = (board) => {
  // starting point for the solution of the actual board
  let searchNode = new SearchNode(board, null)
  // priority queue for the actual board
  let pq = new PriorityQueue()
  let solution = []

  pq.push(searchNode, searchNode.priority)

  while (!searchNode.board.isGoal()) {
    // pop both the queues to get the next highest priority board
    searchNode = pq.pop()

    // add neighbours to the priority queue
    addNeighbours(searchNode, pq)
  }

  // if a solution exists retrace it (check docs of search node)
  // achieved by maintaing a pointer to the board that lead to the
  // current board
  while (searchNode !== null) {
    // push: O*(1), unshift: O(n)
    solution.push(searchNode.board)
    searchNode = searchNode.prev
  }
  return solution
}

/**
 * This is just a wrapper function around the one that does the A* search.
 * @param  {[array]} board [the bord object for which the solver is generated]
 *
 * @return {[object]}       [array of boards leading to solution]
 */
const SolutionTo = (board) => {
  let stack = board.isSolvable ? aStar(board) : []

  // Why not directly use unshift? effeciency
  stack.reverse()
  return stack
}

export default SolutionTo
