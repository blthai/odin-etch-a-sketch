const container=document.querySelector('div');

for(i=0;i<256;i++){
  let square=document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}

const squares=document.querySelectorAll('.square');

function colorSquare(event){
  this.classList.toggle('colored-square');
  this.removeEventListener('mouseenter',colorSquare);
}

squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});


