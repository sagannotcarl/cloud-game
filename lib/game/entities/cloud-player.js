ig.module(
  'game.entities.cloud-player'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityCloudPlayer = ig.Entity.extend({
    size: {
      x: 110,
      y: 64
    },

    collides: ig.Entity.COLLIDES.ACTIVE,

    animSheet: new ig.AnimationSheet('media/cloud-player.png', 110, 64),

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.zIndex = 10;
      this.maxVel.x = 100;

      this.rainTimer = new ig.Timer();

      this.addAnim( 'floating', 1, [0] );
    },
    
    update: function() {
      /* Controls */
      if (ig.input.state('up')) {
        this.vel.y = -50;
      }
      else if (ig.input.state('down')) {
        this.vel.y = 50;
      } 
      else {
        this.vel.y = 0;
      }


      /* Have horizontal speed vary depending on height */

      var height = ig.system.height;
      var altitude = height - this.pos.y;
      var altitudeMultiplier = altitude / height;

      this.vel.x = this.maxVel.x * altitudeMultiplier;

      /* Evaporation */
      if (ig.game.consoleTimer.delta() > .5) {
        // do stuff
        console.log(ig.game.lakeProximity);
        ig.game.consoleTimer.reset();
      }

      /* Rain */
      var y = this.pos.y + this.size.y;
      var currentVel = this.vel.x;
      var rainFrequency = .4;

      if (ig.input.pressed('rain') && (this.rainTimer.delta() > rainFrequency)) {
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 1), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 2), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 3), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 4), y, {flip:this.flip, currentVel: currentVel} );

        this.rainTimer.reset();
      }


      // Call parent function
      this.parent();

    }

  });
})