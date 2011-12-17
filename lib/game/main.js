ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	// Plugins
	'plugins.quilted-impact-splash-loader',
	'plugins.director.director',
	'plugins.director.player-controller',
	'plugins.notification-manager',
	
	// Debug. Not available until new version
  // 'impact.debug.debug',

	// Entities
	'game.entities.cloud-player',
	'game.entities.lake',	
	'game.entities.tree',
	'game.entities.drop',	
	'game.entities.evaporation',	
	'game.entities.level-status',	
  'game.entities.level-status-mask',
  'game.entities.end-clouds',
  'game.entities.end-clouds-text',
	
	// Levels
	'game.levels.loadscreen',
	'game.levels.level1',
	'game.levels.level1complete'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/feijoa_white-on-blue.font.png' ),

  // Create an instance of the notification manager
	notificationManager: new ig.NotificationManager(),
	
	init: function() {
		// Set up keys
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.MOUSE1, 'hold');
		ig.input.bind(ig.KEY.SPACE, 'hold');
		
		// Set up Director
    this.myDirector = new ig.Director(this, [LevelLoadscreen, LevelLevel1, LevelLevel1complete])
		
    // Set up a variable to store which lake the cloud is currently over
    // Default to false
		this.lakeProximity = false;
    
    // Create timer for debug code
    // this.consoleTimer = new ig.Timer();

    // Create a timer for the player water level
    this.waterFillTimer = new ig.Timer();

    // Create a timer for the player water level
    this.startSequenceTimer = new ig.Timer();

    // Create a timer for how long the player spent on the level
    this.levelTimer = new ig.Timer();

    // Create new controller
    this.playerController = new ig.PlayerController();
    
	},
	
	levelInit: function() {
	  // Count the tree on the level and tell the player controler
    var trees = this.getEntitiesByType( EntityTree );
    var totalTrees = trees.length;
    var singleTreeMaxHealth = 7; // Hard coded for now

    this.playerController.maxTreeHealth = totalTrees * singleTreeMaxHealth;
    
    // Reset in case level is starting over
    this.playerController.currentTreeHealth = 0;
    this.playerController.endSequence = false;
    this.playerController.levelComplete = false;

    this.startSequenceTimer.reset();
    this.levelTimer.reset();

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
    // Start first level from start screen
    if (ig.input.state('hold') && ig.game.playerController.currentLevel === 0) {
      this.myDirector.nextLevel();
      this.playerController.increaseLevel();
      ig.game.levelInit();
    }
    
    // Restart after end screen
    if (ig.input.state('hold') && ig.game.playerController.levelComplete == true) {
      this.myDirector.loadLevel(0);
      this.playerController.currentLevel = 0;
      
      // Remove all notes
      for(var i = 0; i < this.notificationManager.notes.length; i++) {
          this.notificationManager.notes[i]._kill = true;
      }
      ig.game.levelInit();
    }

    // Screen follows the player
    var player = this.getEntitiesByType( EntityCloudPlayer )[0];
    var statusBar = this.getEntitiesByType (EntityLevelStatus)[0];
    var statusBarMask = this.getEntitiesByType (EntityLevelStatusMask)[0];
    var statusOffset = 10;
    if( player ) {
     this.screen.x = player.pos.x - ig.system.width/2 + player.size.x;
    }
    
    if (statusBar) {
         statusBar.pos.x = this.screen.x + statusOffset;
    }
    
    if (statusBarMask) {
         statusBarMask.pos.x = this.screen.x + statusOffset;
    }
    
    // Update function for notificationManager
    this.notificationManager.update();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Draw function for notificationManager
    this.notificationManager.draw();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 320, 1, ig.QuiltedImpactSplashLoader );

});


// This event handler is fired once the AppMobi libraries are ready
function onDeviceReady() {
    //use AppMobi viewport to handle device resolution differences if you want
    //AppMobi.display.useViewport(768,1024);
    
    //lock orientation
    AppMobi.device.setRotateOrientation("landscape");
    AppMobi.device.setAutoRotate(false);

    //hide splash screen now that our app is ready to run
    AppMobi.device.hideSplashScreen();
}