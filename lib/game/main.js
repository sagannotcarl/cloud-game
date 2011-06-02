ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	// Plugins
	'plugins.quilted-impact-splash-loader',

	// Entities
	'game.entities.cloud-player',
	'game.entities.lake',	
	'game.entities.tree',
	'game.entities.drop',	
	'game.entities.evaporation',	
	
	// Levels
	'game.levels.level1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.SPACE, 'rain');
		
		this.loadLevel(LevelLevel1);
		
    // Set up a variable to store which lake the cloud is currently over
    // Default to false
		this.lakeProximity = false;
    
    this.consoleTimer = new ig.Timer();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	  // Screen follows the player
		var player = this.getEntitiesByType( EntityCloudPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2 + player.size.x;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 540, 360, 1, ig.QuiltedImpactSplashLoader );

});
