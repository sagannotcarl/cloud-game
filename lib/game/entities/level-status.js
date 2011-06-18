ig.module('game.entities.level-status')
.requires(
    'impact.entity'
)
.defines(function () {

    EntityLevelStatus = ig.Entity.extend({
        size: { x: 10, y: 190 },
    
        animSheet: new ig.AnimationSheet('media/level-status.png', 10, 190),
    
        init: function (x, y, settings) {
          
          this.pos.y = 20;
          
          this.parent(x, y, settings);
        },
        
        update: function () {
          // Set the level info move based on the the screen position
          var offset = 10;
          this.pos.x = (ig.game.screen.x + offset);
      		
      		// Call parent function
          this.parent();
        }
    
    });

});