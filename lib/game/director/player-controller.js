ig.module(
	'game.director.player-controller'
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.PlayerController = ig.Class.extend({

  waterLevel: 0,
  waterLevelMax: 7,
  currentTreeHealth: 0,
  totalTreeHealth: 1,
  score: 0,
  extraLife: 10000,
  currentLevel: 0,

  init: function(){
    this.defaults = {
      waterLevel: this.waterLevel, 
      waterLevelMax: this.waterLevelMax, 
      currentTreeHealth: this.currentTreeHealth, 
      totalTreeHealth: this.totalTreeHealth, 
      score: this.score, 
      currentLevel: this.currentLevel
    };
  },

  increaseLevel: function(){
    this.currentLevel++;
  },

  getLevel: function(){
    return(this.currentLevel);
  }
  
});

});
