ig.module('game.entities.level-info-mask')
.requires(
    'game.entities.level-info'
)
.defines(function () {

    EntityLevelStatusMask = EntityLevelStatus.extend({
        size: { x: 48, y: 48 },
    
        animSheet: new ig.AnimationSheet('', 48, 48),
    
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        }
    
    });

});