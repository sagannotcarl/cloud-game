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
  maxTreeHealth: 1,
  score: 0,
  extraLife: 10000,
  currentLevel: 0,

  init: function(){
    this.defaults = {
      waterLevel: this.waterLevel, 
      waterLevelMax: this.waterLevelMax, 
      currentTreeHealth: this.currentTreeHealth, 
      maxTreeHealth: this.maxTreeHealth, 
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
