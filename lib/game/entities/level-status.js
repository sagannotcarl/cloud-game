ig.module('game.entities.level-status')
.requires(
    'impact.entity'
)
.defines(function () {

    EntityLevelStatus = ig.Entity.extend({
        size: { x: 48, y: 48 },
    
        animSheet: new ig.AnimationSheet('', 48, 48),
    
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        }
    
    });

});