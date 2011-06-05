ig.module(
	'game.director.player-controller'
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.PlayerController = ig.Class.extend({

  waterLevel: 0,
  score: 0,
  extraLife: 10000,
  currentLevel: 0,

  init: function(){
    this.defaults = {waterLevel: this.waterLevel, score: this.score, currentLevel: this.currentLevel};
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
