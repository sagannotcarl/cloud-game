ig.module(
  'game.entities.drop'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityDrop = ig.Entity.extend({
    size: {
      x: 16,
      y: 22
    },
    
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    
    animSheet: new ig.AnimationSheet('media/drop.png', 16, 22),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.zIndex = 10;

      this.vel.y = 60;
      this.vel.x = 30;

      this.addAnim( 'still', 1, [0] );
    },

    update: function() {
      this.parent();
    },

    check: function( other ) {
      if (other.health < 7) {
        // Increase the health value for the tree the drop is hitting
        other.health++;

        // Increase the value of the overall tree health variable
        ig.game.playerController.currentTreeHealth++;
      }

      // Remove the drop after it hits
      this.kill();
    },

    handleMovementTrace: function(res) {
      if (res.collision.x == true || res.collision.y == true) {
        this.kill();
      }

      this.parent(res);
    }
    
  });
})