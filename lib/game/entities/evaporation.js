ig.module('game.entities.evaporation')
.requires(
    'impact.entity'
)
.defines(function () {

    EntityEvaporation = ig.Entity.extend({
        size: { x: 110, y: 83 },
    
        animSheet: new ig.AnimationSheet('media/evaporation.png', 110, 83),
    
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        
        update: function() {
          // Set evaporation entity to move along with the cloud
          var player = this.getEntitiesByType( EntityCloudPlayer )[0];
          
          this.pos.x = player.pos.x;
          this.pos.y = player.pos.y;
        }
    
    });

});