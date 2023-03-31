const container=document.querySelector('div');
let div=document.createElement('div');

for(i=0;i<256;i++){
  let square=document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}


