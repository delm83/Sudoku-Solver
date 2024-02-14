const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const SudokuSolver = require('../controllers/sudoku-solver.js');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let solver = new SudokuSolver;

suite('Unit Tests', () => {
    test('#equal, #handle valid puzzle string of 81 characters', function () {
        assert.equal("valid", solver.validate(puzzlesAndSolutions[0][0]));
      });
    test('#equal, #handle puzzle string with invalid characters', function () {
        assert.equal("invalid character", solver.validate('.7.89..*..5....3.4.2..4..1.5689..472...6..b..1.7.5.63873.1.2.8.6..47.1..2.9.387.6'));
      });
      test('#equal, #handle puzzle string not 81 characters in length', function () {
        assert.equal("wrong length", solver.validate('1.5..2.84..63.12.7.2..5.....9..1...8.2.3674.3.7.2..9.47...8..1..16...926914.37.'));
      });
});
