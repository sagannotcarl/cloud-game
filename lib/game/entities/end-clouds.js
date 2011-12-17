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
    
    animSheet: new ig.AnimationSheet('media/end-clouds.png', 1200, 320),

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.offset.x = 200;

      this.zIndex = 20;

      this.addAnim( 'idle', 1, [0] );

    },
    
    update: function() {
      
      this.parent();
    },

    check: function( other ) {
      // trigger end sequence when the player enters the clouds
      ig.game.playerController.endSequence = true;
    },
    
  });
})