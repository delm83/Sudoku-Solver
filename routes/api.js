'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let puzzleGrid = solver.convertStringToGrid(puzzle);
      let solution;
      let row;
      let col;
      let conflict = false;
      let conflicts = [];
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      if(solver.validate(puzzle)=='invalid character'){return res.json({error: 'Invalid characters in puzzle'})}
      if(solver.validate(puzzle)=='wrong length'){return res.json({error: 'Expected puzzle to be 81 characters long'})}
      if(solver.validate(puzzle)=='field missing'||!coordinate||!value) {return res.json({error: 'Required field(s) missing'});}
      if(coordinate.length!=2||/[^a-i||A-I]/.test(coordinate[0])||/[^1-9]/.test(coordinate[1])) {return res.json({error: 'Invalid coordinate'});}
      if(/[^1-9]/.test(value)){return res.json({error: 'Invalid value'});}
      row = coordinate[0];
      row = solver.convertLettertoIndex(row);
      col = coordinate[1]-1;
      if(value==puzzleGrid[row][col]){
        return res.json({valid: 'true'})}
 
    if(solver.checkRowPlacement(puzzleGrid, row, col, value)&&solver.checkColPlacement(puzzleGrid, row, col, value)&&this.checkRegionPlacement(puzzleGrid, row, col, value)){
      return res.json({valid: 'true'})}

      if(!solver.checkRowPlacement(puzzleGrid, row, col, value)){conflicts.push("row"), conflict=true;}
      if(!solver.checkColPlacement(puzzleGrid, row, col, value)){conflicts.push("column"), conflict=true;}
      if(!solver.checkRegionPlacement(puzzleGrid, row, col, value)){conflicts.push("region"), conflict=true}
      if(conflict){return res.json({valid: 'false', conflict: conflicts})}
    });
    
  app.route('/api/solve')
  .post((req, res) => {
    let puzzle = req.body.puzzle;
    let puzzleGrid = solver.convertStringToGrid(puzzle);
    let solution;
    let conflicts = [];
    if(solver.validate(puzzle)=='field missing') {return res.json({error: 'Required field missing'});}
    if(solver.validate(puzzle)=='invalid character'){return res.json({error: 'Invalid characters in puzzle'})}
    if(solver.validate(puzzle)=='wrong length'){return res.json({error: 'Expected puzzle to be 81 characters long'})}
    solution = solver.solve(puzzleGrid);
    if(!solution){return res.json({error: 'Puzzle cannot be solved'})}
    solution = solver.convertGridToString(solution);
    return res.json({solution: solution});
    });
};
