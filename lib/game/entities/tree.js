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
    
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    
    health: 1,
        
    animSheet: new ig.AnimationSheet('media/tree.png', 41, 44),
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
      this.zIndex = 1;
      
      this.addAnim( 0, 1, [0] );
      this.addAnim( 1, 1, [1] );
      this.addAnim( 2, 1, [2] );
      this.addAnim( 3, 1, [3] );
      this.addAnim( 4, 1, [4] );
      this.addAnim( 5, 1, [5] );
      this.addAnim( 6, 1, [6] );
      this.addAnim( 7, 1, [7] );

      this.currentAnim = this.anims.zero;
    },
    
    update: function() {
      var healthAnim = (this.health <= 7) ? this.health : 7;
      
      this.currentAnim = this.anims[healthAnim];
      
      this.parent();
    }
    
  });
})