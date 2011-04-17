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
      this.parent();
    }
    
  });
})