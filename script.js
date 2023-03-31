const container=document.querySelector('div');

for(i=0;i<256;i++){
  let square=document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}

const squares=document.querySelectorAll('.square');

//toggle on the class then remove the event listener so that the squares stay colored
function colorSquare(event){
  this.classList.toggle('colored-square');
  this.removeEventListener('mouseenter',colorSquare);
}

squares.forEach((square)=>{square.addEventListener('mouseenter',colorSquare)});


