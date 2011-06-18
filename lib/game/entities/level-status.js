ig.module('game.entities.level-status')
.requires(
    'impact.entity'
)
.defines(function () {

    EntityLevelStatus = ig.Entity.extend({


      size: { x: 10, y: 190 },
      
      collides: ig.Entity.COLLIDES.NEVER,

      animSheet: new ig.AnimationSheet('media/level-status.png', 10, 190),

      init: function (x, y, settings) {

        this.addAnim( 'idle', 1, [0] );

        this.zIndex = 10;

        this.parent(x, y, settings);
      },

      update: function () {
	
      	// Call parent function
        this.parent();
      }
    
    });

});