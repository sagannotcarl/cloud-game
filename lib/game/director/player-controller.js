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
  score: 0,
  extraLife: 10000,
  currentLevel: 0,

  init: function(){
    this.defaults = {waterLevel: this.waterLevel, waterLevelMax: this.waterLevelMax, score: this.score, currentLevel: this.currentLevel};
  },

  addPlayerEntity: function(playerEntity){
    this.playerShip = playerEntity;
    this.playerShip.lives = this.lives;
  },

  increaseLevel: function(){
    this.currentLevel++;
  },

  getLevel: function(){
    return(this.currentLevel);
  }
  
});

});
