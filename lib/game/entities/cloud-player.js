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

      /* Testing Code */
      // Put the testing code on a timer so that it doesn't overwhelm the console by printing every frame
      if (ig.game.consoleTimer.delta() > .5) {
        // Put debug code here


        // Reset timer
        ig.game.consoleTimer.reset();
      }

      /* Rain and Evaporation */
      var y = this.pos.y + this.size.y;
      var currentVel = this.vel.x;
      var rainFrequency = .4;

      if (ig.input.state('rain')) {
        // For the third condition, this.pos.y + this.size.y is the location of the bottom of the cloud, 315 is the y coord for the ground and 83 is the height of the evaporation entity
        if (ig.game.lakeProximity && ig.game.getEntitiesByType( EntityEvaporation ).length === 0 && (this.pos.y + this.size.y) > (315 - 83)) {
          ig.game.spawnEntity( EntityEvaporation, this.pos.x + 10, y, {flip:this.flip} );
        }
        else if (this.rainTimer.delta() > rainFrequency && ig.game.getEntitiesByType( EntityEvaporation ).length === 0) {
          ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 1), y, {flip:this.flip, currentVel: currentVel} );
          ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 2), y, {flip:this.flip, currentVel: currentVel} );
          ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 3), y, {flip:this.flip, currentVel: currentVel} );
          ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 4), y, {flip:this.flip, currentVel: currentVel} );

          this.rainTimer.reset();
        }
      }


      // Call parent function
      this.parent();

    }

  });
})