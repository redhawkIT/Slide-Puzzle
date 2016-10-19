import {equals} from '../helpers/ArrayExtras'


/**
* The board class represents the state of the board at a given
* point of time it also contains functions compute the neighbours of the
* current state, it's twin and hamming and manhattan distance to the goal
* state.
*/
function Board(arr) {
  this.N = Math.sqrt(arr.length)
  this.board = arr
  this._setUpGoal()
}

Board.prototype = {
  // Sets up the goal state
  // e.g. [1, 3, 0, 2] -> [1, 2, 3, 0]
  _setUpGoal() {
    this.goal = this.board.slice(0)
    this.goal.sort()
    this.goal = this.goal.slice(1)
    this.goal.push(0)
  },

  /**
  * Calculate the hamming distance to the goal state (i.e. the number
  * of tiles out of place)
  * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 5
  */
  hamming() {
    let ham = 0
    for (let i = 0; i < this.board.length; i++)
      if (this.board[i] != i + 1)
        ham += 1
  // subtract 1 (case of zero)
    return ham - 1
  },

  /**
  * Reutrns the manhattan/taxi-cab distance from current board state to
  * the goal state. (i.e.) the cumulative distance of every tile to it's
  * final position
  * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 10
  */
  manhattan() {
    let man = 0
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == 0)
        continue

        // final position of the ith-tile
      let fy = Math.floor(i / this.N)
      let fx = Math.floor(i % this.N)

      // initial position of the ith-tile
      let iy = Math.floor((this.board[i] - 1) / this.N)
      let ix = Math.floor((this.board[i] - 1) % this.N)

      // diff bw the initial and the final position
      man += Math.abs(ix - fx) + Math.abs(iy - fy)
    }
    return man
  },

  /**
  * Check if the board has reached the final goal state
  */
  isGoal() {
    return this.board.equals(this.goal)
  },

  /**
  * Returns a board that is the copy of the board with two tiles swaped.
  * (tiles belong to the same row)
  * One of the original and twin is solvable the other is not.
  */
  twin() {
    let condition = (this.board[0] != 0) && (this.board[1] != 0)
    let x = condition
      ? 0
      : this.N
    let y = condition
      ? 1
      : this.N + 1

    return this._exchBoard(x, y)
  },

  /**
  * Returns the list of all the configurations that are possible after
  * a single move of the tile.(min 1, max 4)
  */
  neighbours() {
    let neighbours = []
    let i = this.board.indexOf(0)

    if (i > this.N - 1) {
      neighbours.push(this._exchBoard(i, i - this.N))
    }
    if (i % this.N != 0) {
      neighbours.push(this._exchBoard(i, i - 1))
    }
    if (i < this.board.length - this.N) {
      neighbours.push(this._exchBoard(i, i + this.N))
    }
    if (i % this.N != this.N - 1) {
      neighbours.push(this._exchBoard(i, i + 1))
    }

    return neighbours
  },

  /**
  * Checks for the equality of the board
  */
  equals(that) {
    return this.board.equals(that.board)
  },

  // swaps the given tiles of the original board and returns the resulting
  // board
  _exchBoard(i, j) {
    let newBoard = new Board(this.board.clone())

    let temp = newBoard.board[i]
    newBoard.board[i] = newBoard.board[j]
    newBoard.board[j] = temp

    return newBoard
  },

  // private helper to exchange the board tiles
  __makeMove__(i, j) {
    let temp = this.board[i]
    this.board[i] = this.board[j]
    this.board[j] = temp
  },

  /**
   * Makes a left move on the board
   */
  moveLeft() {
    let indexZero = this.board.indexOf(0)
    if (indexZero % this.N != 0) {
      this.__makeMove__(indexZero, indexZero - 1)
    }
  },

  /**
   * Makes an upward move on the board
   */
  moveUp() {
    let indexZero = this.board.indexOf(0)
    if (indexZero > this.N - 1) {
      this.__makeMove__(indexZero, indexZero - this.N)
    }
  },

  /**
   * Makes a rightward move on the board
   */
  moveRight() {
    let indexZero = this.board.indexOf(0)
    if (indexZero % this.N != this.N - 1) {
      this.__makeMove__(indexZero, indexZero + 1)
    }
  },

  /**
   * Makes a downward move on the board
   */
  moveDown() {
    let indexZero = this.board.indexOf(0)
    if (indexZero < this.board.length - this.N) {
      this.__makeMove__(indexZero, indexZero + this.N)
    }
  },

  /**
  * String representaion of the Board object
  */
  toString() {
    let board = ""
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        board += this.board[i * this.N + j]
        board += ' '
      }
      board += '\n'
    }
    return board
  }
}

export default Board

/////////////////////// Test \\\\\\\\\\\\\\\\\\\\\\\\\\
function BoardTest() {
  console.log('Testing Board')
  let b = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5])
  console.log(b.toString())
  console.log(b.N)                  // 9
  console.log(b.goal)               // [1, 2, 3, 4, 5, 6, 7, 8, 0]
  console.log(b.isGoal())           // false
  console.log(b.hamming())          // 5
  console.log(b.manhattan())        // 10
  console.log(b.twin().toString())

  let fin = new Board([1, 2, 3, 0])
  console.log(fin.isGoal())
  console.log('End Test')
}
