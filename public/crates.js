window.crates = [];
let i = setInterval(()=>{
  if(!window.gameHasBegun){
   console.log('Waiting for game to begin.');
  }else{
   clearInterval(i);
   initCrates();
  }
},200);

var initCrates = ()=>{
 console.log('Initializing crates!');
 window.crates = document.querySelectorAll('.crate');
}

window.updateCrates = (cratesData)=>{
  if(window.crates.length === 0) return;
  cratesData.forEach( (cd,index)=>{
    window.crates[index].setAttribute('position',cd.position);
    window.crates[index].setAttribute('rotation',cd.rotation);
    window.crates[index].components["dynamic-body"].syncToPhysics();
  });
}
