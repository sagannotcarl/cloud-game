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
  overallTreeHealth: 0,
  score: 0,
  extraLife: 10000,
  currentLevel: 0,

  init: function(){
    this.defaults = {waterLevel: this.waterLevel, waterLevelMax: this.waterLevelMax, overallTreeHealth: this.overallTreeHealth, score: this.score, currentLevel: this.currentLevel};
  },

  increaseLevel: function(){
    this.currentLevel++;
  },

  getLevel: function(){
    return(this.currentLevel);
  }
  
});

});
