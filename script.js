const container=document.querySelector('.container');
const button=document.querySelector('button');

//toggle on the class then remove the event listener so that the squares stay colored
function colorSquare(event){
  this.classList.toggle('colored-square');
  this.removeEventListener('mouseenter',colorSquare);
}

function addSquares(amountAdded){
  for(i=0;i<amountAdded;i++){
    let square=document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseenter',colorSquare);
    container.appendChild(square);
  }
}

function removeSquares(amountRemoved){
  for(i=0;i<amountRemoved;i++){
    container.removeChild(container.firstChild)
  }
}

function resetSquare(square){
  if(square.classList.contains('colored-square')){
    square.classList.toggle('colored-square');
    square.addEventListener('mouseenter',colorSquare);
  }
}

function adjustSquare(square, newSideLength){
  square.style.width=newSideLength;
  square.style.height=newSideLength;
  resetSquare(square);
}

function getNewSideLength(square, quantity){
  const containerStyle=getComputedStyle(container);
  return (parseInt(containerStyle.width)/parseInt(quantity)+'px');
}

//prompt the user for an amount, check to see if the amount number is valid, then
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

for(i=0;i<256;i++){
  let square=document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}

let squares=document.querySelectorAll('.square');

squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});

button.addEventListener('click', resize);


