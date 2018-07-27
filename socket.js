module.exports = (io)=>{
    var players = {};
    var synchronizedCrates = true;
    var lastSocketSentCrates = {broadcast:{emit:()=>{}}};
    var socketsNeedingShockwaveSync = [];
    var crates = [];
    let intervalId = setInterval(()=>{
          io.emit('update-players',players);
          if(synchronizedCrates && Object.keys(players).length > 1) lastSocketSentCrates.broadcast.emit('update-crates',crates);
        },100);
    io.on('connection', function(socket){
        socket.ip = socket.handshake.headers['x-forwarded-for'];
        //Uncomment second part below if storing to Firebase
        socket.ip = socket.ip.split(',')[0]//.replace(/\./g, "_");
        console.log(`New member has connected with socket id: ${socket.id} and ip: ${socket.ip}`);
        socket.on('new-player',function(shared_state_data){ 
          console.log('sending players already here');
          console.log(players);
          socket.emit('players-already-here',players);
          if(Object.keys(players).length > 0){
            lastSocketSentCrates.emit('get-shockwave-sync');
            socketsNeedingShockwaveSync.push(socket);
          }else{
            socket.emit('blow-stuff-up');
          }
          console.log("New player has state:",shared_state_data);
          // Add the new player to the object
          players[socket.id] = shared_state_data;
          let id = socket.id; 
          io.emit('new-player',{"id":id, "data":shared_state_data});
        })
        socket.on('disconnect',function(){
          // Delete from object on disconnect
          console.log(`Player disconnected. Removing ${socket.id}`);
          delete players[socket.id]; 
          socket.broadcast.emit('remove-player',socket.id);
        })
        // Online players' shared data throughput
        socket.on('send-update',function(data){
          if(players[socket.id] == null) return;
          players[socket.id].position = data.position; 
          players[socket.id].rotation = data.rotation;
          players[socket.id].faceIndex = data.faceIndex;
          //console.log(data);
        }) 
        socket.on('update-crates',function(data){
          //console.log(data);
          synchronizedCrates = true;
          lastSocketSentCrates = socket;
          crates = data;
        });
        socket.on('msg',function(data){
          if(data.key == process.env.MESSAGE_KEY){
            socket.broadcast.emit('msg',{id:socket.id,msg:data.msg});
          }
        });
        socket.on('arg',function(data){
          socket.ipLocal = data;
          console.log(`Client Info:\nPublic IP: ${socket.ip}  Local IP: ${socket.ipLocal}`);
        });
        socket.on('set-shockwave-sync',function(){
          console.log('shockwave sync received');
          let arr = socketsNeedingShockwaveSync;
          for (let i = arr.length - 1; i >= 0; i -= 1) {
            arr[i].emit('blow-stuff-up');
            arr.splice(i, 1);
          }
        });
        
     });
    
  }
  