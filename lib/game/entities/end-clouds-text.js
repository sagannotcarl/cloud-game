ig.module(
  'game.entities.end-clouds-text'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityEndCloudsText = ig.Entity.extend({
    size: {
      x: 178,
      y: 50
    },

    animSheet: new ig.AnimationSheet('media/end-clouds-text.png', 178, 50),

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.zIndex = 20;

      this.addAnim( 'off', 1, [0] );
      this.addAnim( 'fadeIn', 0.5, [0,1,2,3,4] );
      this.addAnim( 'on', 1, [4] );
      this.currentAnim = this.anims.off;

    },
    
    update: function() {
      // this.currentAnim = this.anims.fadeIn;

      this.parent();
    }
  });
})