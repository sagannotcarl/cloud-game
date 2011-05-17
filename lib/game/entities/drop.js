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
    
    animSheet: new ig.AnimationSheet('media/drop.png', 16, 22),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
      this.addAnim( 'still', 1, [0] );
    },
    
    update: function() {
      this.parent();
    }
    
  });
})