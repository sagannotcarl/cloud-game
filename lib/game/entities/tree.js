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
      
      
      this.addAnim( 'zero', 1, [0] );
      this.addAnim( 'one', 1, [1] );
      this.addAnim( 'two', 1, [2] );
      this.addAnim( 'three', 1, [3] );
      this.addAnim( 'four', 1, [4] );
      this.addAnim( 'five', 1, [5] );
      this.addAnim( 'six', 1, [6] );
      this.addAnim( 'seven', 1, [7] );


      this.currentAnim = this.anims.zero;
    },
    
    update: function() {
      if (this.health > 6) {
        this.currentAnim = this.anims.seven;
      } 
      else if (this.health == 6) {
        this.currentAnim = this.anims.six;
      }
      else if (this.health == 5) {
        this.currentAnim = this.anims.five;
      }
      else if (this.health == 4) {
        this.currentAnim = this.anims.four;
      }
      else if (this.health == 3) {
        this.currentAnim = this.anims.three;
      }
      else if (this.health == 2) {
        this.currentAnim = this.anims.two;
      }
      else if (this.health == 1) {
        this.currentAnim = this.anims.one;
      }
      else if (this.health == 0) {
        this.currentAnim = this.anims.zero;
      }
      
      this.parent();
    }
    
  });
})