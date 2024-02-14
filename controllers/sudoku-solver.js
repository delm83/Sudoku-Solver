class SudokuSolver {


  convertStringToGrid(myString){
   let grid=[];
   let array = myString.split("");
   for(let i =0; i<9; i++){
     let row = array.splice(0, 9);
     grid.push(row);
   }
  return grid;
 }
 
 convertGridToString(myGrid){
   let myString = myGrid.join("");
   myString = myString.replace(/,/g,"");
   return myString
 }

 convertLettertoIndex(letter){
  switch(letter){
    case 'A':
    case 'a':
    return 0;
    break;
    case 'B':
    case 'b':
    return 1;
    break;
    case 'C':
    case 'c':
    return 2;
    break;
    break;
    case 'D':
    case 'd':
    return 3;
    break;
    case 'E':
    case 'e':
    return 4;
    break;
    case 'F':
    case 'f':
    return 5;
    break;
    break;
    case 'G':
    case 'g':
    return 6;
    break;
    case 'H':
    case 'h':
    return 7;
    break;
    case 'I':
    case 'i':
    return 8;
}
}
  
 
   validate(puzzleString) {
     if(!puzzleString){return 'field missing'}
 if(/[^0-9.]/.test(puzzleString)){return 'invalid character'};
 if(puzzleString.length!=81){return 'wrong length'};
  }
   
 
   checkRowPlacement(puzzleGrid, row, column, value) {
     let valid = true;
 
 for (let j=0; j<9; j++){
   if (puzzleGrid[row][j]==value){
     valid = false;
   }
 }
 return valid;
 }
 
   checkColPlacement(puzzleGrid, row, column, value) {
     let valid = true;
     for (let i=0; i<9; i++){  
   
     if (puzzleGrid[i][column]==value){
       valid = false
     }  
   }
   return valid;
   }
 
   checkRegionPlacement(puzzleGrid, row, column, value) {
     let valid = true;
     let beginRow = row - (row % 3);
     let beginColumn = column - (column % 3);
  
     for(let i = beginRow; i < beginRow+3; i++){
         for(let j = beginColumn; j < beginColumn+3; j++){
             if (puzzleGrid[i][j] == value)
             {
                 valid = false;
             }
         }
     }
   return valid;
 }
 
 solve(puzzleGrid) {
  let completed = true;
  let row;
  let col;
  for (let i = 0; i<9; i++){
    for(let j=0; j<9; j++){
    if(puzzleGrid[i][j]=='.'){
      row = i;
      col = j;
      completed = false;
   break;
      }
      }
if(!completed)
{break;}
}
if(completed){
  return puzzleGrid;}

for(let val=1; val<10; val++){
if(this.checkRowPlacement(puzzleGrid, row, col, val)&&this.checkColPlacement(puzzleGrid, row, col, val)&&this.checkRegionPlacement(puzzleGrid, row, col, val)){
puzzleGrid[row][col]=val;
if(this.solve(puzzleGrid)){
  return puzzleGrid;
}
else{
  puzzleGrid[row][col] = '.';
}
}
}

return false;

}

}
 
 module.exports = SudokuSolver;
 