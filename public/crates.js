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
 //addCylinder('5 4 -5.2','0 0 0');
}

window.updateCrates = (cratesData)=>{
  cratesData.forEach( (cd,index)=>{
    window.crates[index].pause();
    window.crates[index].setAttribute('position',cd.position);
    window.crates[index].setAttribute('rotation',cd.rotation);
    window.crates[index].play();
  });
}


// function addCylinder(p,r,){
//   let c = document.createElement('a-cylinder');
//   c.setAttribute('position',p);
//   c.setAttribute('rotation',r);
//   c.setAttribute('src','https://cdn.glitch.com/3294c4a3-a3d8-412f-a31e-1e03d1cd1cbd%2Fsad.png?1532449709850');
//   //c.setAttribute('opacity', 0.7);
//   c.setAttribute('material','transparent: false; side: double; emissive: #aaf');
//   window.scene.appendChild(c);
// }