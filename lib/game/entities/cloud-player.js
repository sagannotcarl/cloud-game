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
    
    animSheet: new ig.AnimationSheet('media/cloud-player.png', 110, 64),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
      this.addAnim( 'floating', 1, [0] );
    }
    
  });
})