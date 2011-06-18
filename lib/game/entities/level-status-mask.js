ig.module('game.entities.level-status-mask')
.requires(
    'game.entities.level-status'
)
.defines(function () {

    EntityLevelStatusMask = EntityLevelStatus.extend({
    
        animSheet: new ig.AnimationSheet('media/level-status-mask.png', 10, 190),
    
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        }
    
    });

});