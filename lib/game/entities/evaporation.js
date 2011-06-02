ig.module('game.entities.evaporation')
.requires(
    'impact.entity'
)
.defines(function () {

    EntityEvaporation = ig.Entity.extend({
        size: { x: 110, y: 83 },

        animSheet: new ig.AnimationSheet('media/evaporation.png', 110, 83),

        init: function (x, y, settings) {

          this.addAnim( 'moving', .1, [0,1] );
          this.parent(x, y, settings);
        },

        update: function() {
          // Set evaporation entity to move along with the cloud
          var player = ig.game.getEntitiesByType( EntityCloudPlayer )[0];

          this.pos.x = player.pos.x - 20;
          this.pos.y = player.pos.y + player.size.y;

          // @TODO: put code that fills up the cloud / adds water points here

          // If the cloud is no longer over a lake, remove the evaporation
          if (ig.game.lakeProximity == false) {
            this.kill();
          }
        }
    
    });

});