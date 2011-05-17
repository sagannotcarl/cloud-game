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
      
      this.addAnim( 'floating', 1, [0] );
    },
    
    update: function() {
      /* Controls */
      if (ig.input.state('up')) {
        this.vel.y = -100;
      }
      else if (ig.input.state('down')) {
        this.vel.y = 100;
      } 
      else {
        this.vel.y = 0;
      }


      /* Have horizontal speed vary depending on height */
      var maxVel = 100;

      var height = ig.system.height;
      var altitude = height - this.pos.y;
      var altitudeMultiplier = altitude / height;

      this.vel.x = maxVel * altitudeMultiplier;


      /* Rain */
      var y = this.pos.y + this.size.y;
      var currentVel = this.vel.x;
      
      if (ig.input.pressed('rain')) {
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 1), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 2), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 3), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 4), y, {flip:this.flip, currentVel: currentVel} );
      }


      // Call parent function
      this.parent();

    }

  });
})