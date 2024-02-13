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
  
 
   validate(puzzleString) {
     if(!puzzleString){return 'field missing'}
 if(/[^0-9.]/.test(puzzleString)){return 'invalid character'};
 if(puzzleString.length!=81){return 'wrong length'};
  }
   
 
   checkRowPlacement(puzzleString, row, column, value) {
     let valid = true;
 switch(row){
     case 'A'||'a':
     row = 0;
     break;
     case 'B'||'b':
     row = 1;
     break;
     case 'C'||'c':
     row = 2;
     break;
     case 'D'||'d':
     row = 3;
     break;
     case 'E'||'e':
     row = 4;
     break;
     case 'F'||'f':
     row = 5;
     break;
     case 'G'||'g':
     row = 6;
     break;
     case 'H'||'h':
     row = 7;
     break;
     case 'I'||'i':
     row = 8;
     break;
 }
 
 for (let j=0; j<9; j++){
   if (puzzleString[row][j]==value){
     valid = false;
   }
 }
 return valid;
 }
 
   checkColPlacement(puzzleString, row, column, value) {
     let valid = true;
     for (let i=0; i<9; i++){  
   
     if (puzzleString[i][column]==value){
       valid = false
     }  
   }
   return valid;
   }
 
   checkRegionPlacement(puzzleString, row, column, value) {
     let valid = true;
     let beginRow = row - (row % 3);
     let beginColumn = column - (column % 3);
  
     for(let i = beginRow; i < beginRow+3; i++)
     {
         for(let j = beginColumn; j < beginColumn+3; j++)
         {
             if (puzzleString[i][j] == value)
             {
                 valid = false;
             }
         }
     }
   return valid;
 }
 
   solve(puzzleString) {
     let completed = true;
     let row;
     let col;
     for (let i = 0; i<9; i++){
       for(let j=0; j<9; j++){
       if(puzzleString[i][j]=='.'){
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
     return puzzleString;}
 
   for(let val=1; val<10; val++){
 if(this.checkRowPlacement(puzzleString, row, col, val)&&this.checkColPlacement(puzzleString, row, col, val)&&this.checkRegionPlacement(puzzleString, row, col, val)){
   puzzleString[row][col]=val;
   if(this.solve(puzzleString)){
     return puzzleString;
   }
   else{
     puzzleString[row][col] = '.';
   }
 }
   }
 
 return false;
  
   }
  
 }
 
 
 module.exports = SudokuSolver;
 