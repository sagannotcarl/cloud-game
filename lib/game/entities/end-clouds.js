ig.module(
  'game.entities.end-clouds'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityEndClouds = ig.Entity.extend({
    size: {
      x: 24,
      y: 320
    },
    
    animSheet: new ig.AnimationSheet('media/end-clouds.png', 960, 320),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.offset.x = 456;

      this.zIndex = 12;

      this.addAnim( 'idle', 1, [0] );

    },
    
    update: function() {
      
      this.parent();
    }
    
  });
})