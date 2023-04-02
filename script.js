const container=document.querySelector('.container');
const button=document.querySelector('button');

//add a container child node with class '.square' and an event listener for each loop
function addSquares(amountAdded){
  for(i=0;i<amountAdded;i++){
    let square=document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseenter',colorSquare);
    square.style.backgroundColor='rgb(255,255,255)';
    container.appendChild(square);
  }
}

//remove a container child node for each loop
function removeSquares(amountRemoved){
  for(i=0;i<amountRemoved;i++){
    container.removeChild(container.firstChild)
  }
}

//toggle on the class then remove the event listener so that the squares stay colored
//if the square has not been colored, generate a rgb color and store the values in its rgb data attributes
//if the square has been colored, use the initial rgb values to subtract 10% of the original value from the current rgb values
function colorSquare(event){
  if(this.classList.contains('colored-square')){
    this.dataset.red=this.dataset.red-(this.dataset.redInitial*.1);
    this.dataset.blue=this.dataset.blue-(this.dataset.blueInitial*.1);
    this.dataset.green=this.dataset.green-(this.dataset.greenInitial*.1);
    this.style.backgroundColor=`rgb(${this.dataset.red},${this.dataset.blue},${this.dataset.green})`;
  }
  else{
    let red=Math.floor(Math.random()*256);
    let blue=Math.floor(Math.random()*256);
    let green=Math.floor(Math.random()*256);
    this.classList.toggle('colored-square');
    this.dataset.redInitial=red;
    this.dataset.blueInitial=blue;
    this.dataset.greenInitial=green;
    this.dataset.red=red;
    this.dataset.blue=blue;
    this.dataset.green=green;
    this.style.backgroundColor=`rgb(${red},${blue},${green})`;
  }
  
}

//if the square has been colored, turn off the '.colored-square' class to reset its color, then add the event listener so that the square can be colored once again
//reset the rgb data attributes to an empty string for a cleaner grid upon refresh
function resetSquare(square){
  if(square.classList.contains('colored-square')){
    square.style.backgroundColor='rgb(255,255,255)';
    square.classList.toggle('colored-square');
    square.addEventListener('mouseenter',colorSquare);
    square.dataset.redInitial='';
    square.dataset.blueInitial='';
    square.dataset.greenInitial='';
    square.dataset.red='';
    square.dataset.blue='';
    square.dataset.green='';
  }
}

//set the new side length for both width and height because it is a square and width=height, then call resetSquare to return it to its original color and have it listen for an event again
function adjustSquare(square, newSideLength){
  square.style.width=newSideLength;
  square.style.height=newSideLength;
  resetSquare(square);
}

//perform the calculation to get the new side length in pixels and return it for use in the adjustSquare function so that the calculation only needs to be done once per grid refresh
function getNewSideLength(square, quantity){
  const containerStyle=getComputedStyle(container);
  return (parseInt(containerStyle.width)/parseInt(quantity)+'px');
}

//prompt the user for an amount to add or remove, check if the input is valid, then add or remove squares using the respective functions. 
//reset the squares reference to point to the newly modified nodelist of squares so that future calls to the nodelist and squares.length will be accurate
//adjust the size, color, and event listeners of each square
function resize(event){
  let input=window.prompt('Enter a positive number into the box below to set the sides to contain that amount of squares, the max is 100.');
  let totalSquares=Number(input)**2;
  if(input>100){
    alert('You must enter a postive number below 100!');
  }
  else if(input<=0){
    alert('You must enter a postive number below 100!');
  }
  else{
    if(totalSquares>squares.length){
      addSquares((totalSquares)-squares.length);
    }
    else{
      removeSquares(squares.length-totalSquares);
    }
    squares=document.querySelectorAll('.square');
    let newSideLength=getNewSideLength(squares.firstChild, input);
    squares.forEach((square)=>adjustSquare(square, newSideLength));
  }
}

//initialize the grid for when the page initially loads
for(i=0;i<256;i++){
  let square=document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor='rgb(255,255,255)';
  container.appendChild(square);
}

let squares=document.querySelectorAll('.square');

squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});

button.addEventListener('click', resize);


