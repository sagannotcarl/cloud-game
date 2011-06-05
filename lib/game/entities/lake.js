ig.module(
  'game.entities.lake'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityLake = ig.Entity.extend({
    size: {
      x: 194,
      y: 34
    },
    
    animSheet: new ig.AnimationSheet('media/lake.png', 194, 34),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
      this.addAnim( 'still', 1, [0] );
    },
    
    update: function() {
      var player = ig.game.getEntitiesByType( EntityCloudPlayer )[0];

      if( player ) {
        // Check that the cloud is over the lake
        if (player.pos.x + 30 > this.pos.x && player.pos.x + player.size.x - 40 < this.pos.x + this.size.x) {
          ig.game.lakeProximity = 'lake-' + this.pos.x;
        }
        else if (ig.game.lakeProximity == 'lake-' + this.pos.x) {
          // If the cloud is outside the lake range but the value hasn't been set by any other lake then reset it
          ig.game.lakeProximity = false;
        }
        else {
          // ig.game.lakeProximity = false;
          // do nothing
        }
      }

      this.parent();
    }
    
  });
})