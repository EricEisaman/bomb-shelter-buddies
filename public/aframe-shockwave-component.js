window.AFRAME.registerComponent('shockwave', {
    
    dependencies: [ 'jitter', 'sound__cluster', 'sound__shockwave' ],
    
    init: function () {
      
      this.bomb = this.el.querySelector('[sound__bomb]');
      
      this.isSyncMaster = false;
      
    },
    
    blowStuffUp: function () {
      if(this.isSyncMaster){
       window.socket.emit('set-shockwave-sync');
       this.isSyncMaster = false;
      }
      // this.el.emit('cluster');
      // this.el.emit('bomb');
      this.bomb.emit('bomb');

      setTimeout(function () {
        this.el.emit('shockwave');
      }.bind(this), 18000); // 8000 | 20000 | 18000

      setTimeout(function () {
        this.el.emit('shockwave-off');
      }.bind(this), 33000); // 23000 | 35000 | 33000

      setTimeout(this.blowStuffUp.bind(this), 60000); // 40000 | 60000
    }
    
});