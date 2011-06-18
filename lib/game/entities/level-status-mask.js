ig.module('game.entities.level-status-mask')
.requires(
    'game.entities.level-status'
)
.defines(function () {

    EntityLevelStatusMask = EntityLevelStatus.extend({
    
        animSheet: new ig.AnimationSheet('media/level-status-mask.png', 10, 190),
    
        init: function (x, y, settings) {
          this.addAnim( 'idle', 1, [0] );

          this.zIndex = 12;

          this.parent(x, y, settings);
        },

        update: function () {
          // Call parent function
          this.parent();

          // Set the vertical position based on the overall health of the trees
          // Get the height of the level status bar
          var levelStatusBarHeight = this.size.y;

          // Figure out the increment of px per health
          var statusIncrement = levelStatusBarHeight / ig.game.playerController.maxTreeHealth;

          // Round that number and move the mask that much up
          // this.pos.y = 30 - Math.ceil(statusIncrement * ig.game.playerController.currentTreeHealth);
          var offset = Math.ceil(statusIncrement * ig.game.playerController.currentTreeHealth);
          this.pos.y = 10 - offset; // 10 is the original position
        }
    
    });

});