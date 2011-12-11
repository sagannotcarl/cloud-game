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
  score: 0,
  extraLife: 10000,
  currentLevel: 0,

  init: function(){
    this.defaults = {
      waterLevel: this.waterLevel, 
      waterLevelMax: this.waterLevelMax, 
      currentTreeHealth: this.currentTreeHealth, 
      maxTreeHealth: this.maxTreeHealth, 
      endSequence: this.endSequence,
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
