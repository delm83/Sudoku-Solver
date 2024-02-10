class SudokuSolver {

  validate(puzzleString) {
    if(!puzzleString){return 'field missing'}
if(/[^0-9.]/.test(puzzleString)){return 'invalid character'};
if(puzzleString.length!=81){return 'wrong length'};
console.log('validate function called')
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

