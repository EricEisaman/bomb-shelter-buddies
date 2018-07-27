let i = setInterval(()=>{
  if(!window.gameHasBegun){
   console.log('Bombtrack control is waiting for game to begin.');
  }else{
   clearInterval(i);
   initBombtrack();
  }
},200);

var initBombtrack = ()=>{
 console.log('Initializing bombtrack control!');
 window.bombtrack = document.querySelector('#bombtrack');
}