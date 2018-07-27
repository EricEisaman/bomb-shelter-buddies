window.AFRAME.registerComponent('jitter', {
    
    dependencies: ['position'],
    
    schema: {
      intensity: { type: 'number',  default: 0.05 },
      speed:     { type: 'int',     default: 10 },
      on:        { type: 'string' },
      off:       { type: 'string' },
      autoplay:  { type: 'boolean', default: true }
      // duration
    },
    
    update: function () {
      this.pos = this.el.object3D.position.clone();
      
      if ( this.data.autoplay ) {
        // this.el.addState('jitter');
        this.el.jitter = true;
      }
      
      switch ( this.data.on ) {
          
        case '' :
          break;
          
        case 'hover' :
          this.el.jitter = !!this.el.is('cursor-hovered');
          break;
          
        default :
          this.el.addEventListener(this.data.on, jitterOn);
      }
      
      function jitterOn(e) {
        this.jitter = true;
      }
      
      function jitterOff(e) {
        this.jitter = false;
      }
      
      if ( this.data.off ) {
        this.el.addEventListener(this.data.off, jitterOff);
      }
      
      // Speed throttles tick
      this.tick = window.AFRAME.utils.throttleTick(this.tick, this.data.speed, this);
      
    },
    
    tick: function (t, dt) {

      if ( ! this.el.jitter ) return;
      
      this.jitter();
      this.resetPosition();
      
    },

    jitter: function () {
      var intensity = this.data.intensity;
      
      this.el.object3D.position.set(
        this.pos.x + window.THREE.Math.randFloat(-intensity, intensity),
        this.pos.y + window.THREE.Math.randFloat(-intensity, intensity),
        this.pos.z + window.THREE.Math.randFloat(-intensity, intensity)
      );
    },
    
    resetPosition: function () {
       this.el.object3D.position = {
        x: this.pos.x,
        y: this.pos.y,
        z: this.pos.z
      };
    }
    
  });