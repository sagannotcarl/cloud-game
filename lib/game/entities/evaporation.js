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

          this.addAnim( 'slow', 0.5, [0,1] );
        },

        update: function() {
          // Set evaporation entity to move along with the cloud
          var player = ig.game.getEntitiesByType( EntityCloudPlayer )[0];

          this.pos.x = player.pos.x - 20;
          this.pos.y = player.pos.y + player.size.y;

          // Set the height of the evaporation to be the same as the distance underneath the cloud
          // 315 is the y coord of the ground
          // (player.pos.y + player.size.y) is the bottom of the cloud
          // 5 is an additional offset
          this.anims.slow.sheet.height = 315 - (player.pos.y + player.size.y) - 5;

          // @TODO: put code that fills up the cloud / adds water points here

          // If the cloud is no longer over a lake, or if the cloud moves above the height of the evaporation entity, remove the evaporation
          if (ig.game.lakeProximity === false || this.pos.y < (315 - 83)) {
            this.kill();
          }

          this.parent();
        }
    });

});