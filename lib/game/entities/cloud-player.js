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
      
      this.addAnim( 'floating', 1, [0] );
    },
    
    update: function() {
      // Controls
      if (ig.input.state('forward')) {
        this.vel.x = 100;
      }
      else if (ig.input.state('back')) {
        this.vel.x = -100;
      }
      else if (ig.input.state('up')) {
        this.vel.y = -100;
      }
      else if (ig.input.state('down')) {
        this.vel.y = 100;
      } 
      else {
        this.vel.x = 0;
        this.vel.y = 0;
      }
      
      this.parent();
  
    }
    
  });
})