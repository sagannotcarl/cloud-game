ig.module(
	'plugins.director.player-controller'
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.PlayerController = ig.Class.extend({

  waterLevel: 0,
  waterLevelMax: 7,
  currentTreeHealth: 0,
  maxTreeHealth: 1,
  endSequence: false,
  extraLife: 10000,
  currentLevel: 0,
  levelComplete: false,

  init: function(){
    this.defaults = {
      waterLevel: this.waterLevel, 
      waterLevelMax: this.waterLevelMax, 
      currentTreeHealth: this.currentTreeHealth, 
      maxTreeHealth: this.maxTreeHealth, 
      endSequence: this.endSequence,
      currentLevel: this.currentLevel,
      levelComplete: this.levelComplete
    };
  },

  increaseLevel: function(){
    this.currentLevel++;
    this.levelComplete = false;
  },

  getLevel: function(){
    return(this.currentLevel);
  },

  calculateScore: function() {
    return Math.ceil(ig.game.playerController.currentTreeHealth / ig.game.playerController.maxTreeHealth * 100);
  },

  displayScore: function(lifetime) {
    var lifetime = lifetime ? lifetime : 1.2; // Default from notificaton-manager.js
    ig.game.notificationManager.spawnNote('media/feijoa_white-on-blue.font.png', 'Score: ' + ig.game.playerController.calculateScore() + '%', 25, (ig.system.height / 2), {
      vel: {
        x: 0,
        y: 0
      },
      lifetime: lifetime
    });
  },

  displayTime: function(lifetime) {
    var lifetime = lifetime ? lifetime : 1.2; // Default from notificaton-manager.js
    var time = Math.ceil(ig.game.startSequenceTimer.delta());
    var units = 'seconds';

    if (time > 60) {
      // more than a minute
      time = Math.round(time/60*100)/100;
      units = 'minutes';
    }
    ig.game.notificationManager.spawnNote('media/feijoa_white-on-blue.font.png', 'Time: ' + time + ' ' + units, 25, (ig.system.height / 2) + 60, {
      vel: {
        x: 0,
        y: 0
      },
      lifetime: lifetime
    });
  }
  
});

});
