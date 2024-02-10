'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;

    });
    
  app.route('/api/solve')
    .post((req, res) => {
let puzzle = req.body.puzzle;
if(solver.validate(puzzle)=='field missing') {return res.json({error: 'Required field missing'});}
if(solver.validate(puzzle)=='invalid character'){return res.json({error: 'Invalid characters in puzzle'})}
if(solver.validate(puzzle)=='wrong length'){return res.json({error: 'Expected puzzle to be 81 characters long' })}
return res.json({solution: 'solution'});{}
    });
};
