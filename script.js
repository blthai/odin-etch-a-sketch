//on add and remove squares do the event lsitener in the loop
const container=document.querySelector('.container');
const button=document.querySelector('button');

for(i=0;i<256;i++){
  let square=document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}

let squares=document.querySelectorAll('.square');

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
  //squares=document.querySelectorAll('.square');
 // squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});
}

function removeSquares(amountRemoved){
  for(i=0;i<amountRemoved;i++){
    container.removeChild(container.firstChild)
  }
  //squares=document.querySelectorAll('.square');
  //squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});
}


function resetSquare(square){
  if(square.classList.contains('colored-square')){
    square.classList.toggle('colored-square');
    square.addEventListener('mouseenter',colorSquare);
  }
}


//may need to remove child nodes or add child nodes, first check if we need to remove or add hceck nodelist.length then have a for loop to add or remove child nodes from container and keep the resizing function
function adjustSquare(square, quantity){
  const squareStyle=getComputedStyle(square);
  const containerStyle=getComputedStyle(container);
  square.style.width=(parseInt(containerStyle.width)/parseInt(quantity))+'px';
  square.style.height=(parseInt(containerStyle.width)/parseInt(quantity))+'px';
  resetSquare(square);
}

//prompt the user for an amount, check to see if the amount number is valid, then
function resize(event){
  let input=window.prompt('Enter a positive number into the box below to set the sides to contain that amount of squares, the max is 100.');
  if(input>100){
    alert('You must enter a postive number below 100!');
  }
  else if(input<=0){
    alert('You must enter a postive number below 100!');
  }
  else{
    if((Number(input)**2)>squares.length){
      addSquares((Number(input)**2)-squares.length);
    }
    else{
      removeSquares(squares.length-(Number(input)**2));
    }
    squares=document.querySelectorAll('.square');
    squares.forEach((square)=>adjustSquare(square, input));
    //squares.forEach((square)=>resetGrid(square));
  }
}

squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});

button.addEventListener('click', resize);


