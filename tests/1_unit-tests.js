const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const SudokuSolver = require('../controllers/sudoku-solver.js');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let solver = new SudokuSolver;
let invalidString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.44....5.2.......4..8916..85.72...3'
let grid = solver.convertStringToGrid(puzzlesAndSolutions[0][0]);
let invalidGrid = solver.convertStringToGrid(invalidString);

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
      test('#isTrue, #handle a valid row placement', function () {
        assert.isTrue(solver.checkRowPlacement(grid, 1, 1, 9));
      });
      test('#isNotTrue, #handle an invalid row placement', function () {
        assert.isNotTrue(solver.checkRowPlacement(grid, 1, 1, 3));
      });
      test('#isTrue, #handle a valid column placement', function () {
        assert.isTrue(solver.checkColPlacement(grid, 1, 2, 3));
      });
      test('#isNotTrue, #handle an invalid column placement', function () {
        assert.isNotTrue(solver.checkColPlacement(grid, 1, 2, 6));
      });
      test('#isTrue, #handle a valid region placement', function () {
        assert.isTrue(solver.checkRegionPlacement(grid, 3, 3, 4));
      });
      test('#isNotTrue, #handle an invalid region placement', function () {
        assert.isNotTrue(solver.checkRegionPlacement(grid, 3, 3, 2));
      });
      test('#isArray, #valid puzzle Strings pass the solver', function () {
        assert.isArray(solver.solve(grid));
      });
      test('#isNotTrue, #invalid puzzle strings fail the solver', function () {
        assert.isNotTrue(solver.solve(invalidGrid));
      });
      test('#equal, Solver returns the expected solution for an incomplete puzzle', function () {
        assert.equal(solver.convertGridToString(solver.solve(grid)), puzzlesAndSolutions[0][1]);
      });

});
