ig.module(
  'game.entities.tree'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityTree = ig.Entity.extend({
    size: {
      x: 41,
      y: 44
    },
        
    animSheet: new ig.AnimationSheet('media/tree.png', 41, 44),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
      this.zIndex = 1;
      
      this.addAnim( 'still', .5, [0,0,0,0,1,2,3,4,5,6,7,7,7] );
    },
    
    update: function() {
      this.parent();
    }
    
  });
})