ig.module(
  'game.entities.cloud-player'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityCloudPlayer = ig.Entity.extend({
    size: {
      x: 110,
      y: 64
    },

    type: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.ACTIVE,

    animSheet: new ig.AnimationSheet('media/cloud-player.png', 110, 64),

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.zIndex = 10;
      this.maxVel.x = 100;

      this.rainTimer = new ig.Timer();

      this.addAnim( 'floating', 1, [1] );

      // Set graphics for different water levels
      this.addAnim( 0, 1, [1] );
      this.addAnim( 1, 1, [2] );
      this.addAnim( 2, 1, [3] );
      this.addAnim( 3, 1, [4] );
      this.addAnim( 4, 1, [5] );
      this.addAnim( 5, 1, [6] );
      this.addAnim( 6, 1, [7] );
      this.addAnim( 7, 1, [8] );
    },
    
    update: function() {
      /* Controls */
      if (ig.input.state('up')) {
        this.vel.y = -50;
      }
      else if (ig.input.state('down') && this.pos.y < (280 - 95)) { // Don't let the cloud touch the ground
        this.vel.y = 50;
      } 
      else {
        this.vel.y = 0;
      }


      /* Have horizontal speed vary depending on height */

      var height = ig.system.height;
      var altitude = height - this.pos.y;
      var altitudeMultiplier = altitude / height;

      this.vel.x = this.maxVel.x * altitudeMultiplier;

      /* Testing Code */
      // Put the testing code on a timer so that it doesn't overwhelm the console by printing every frame
      /*
      if (ig.game.consoleTimer.delta() > .5) {
        // Put debug code here

        // Reset timer
        ig.game.consoleTimer.reset();
      }
      */

      /* Rain and Evaporation */
      var y = this.pos.y + this.size.y;
      var currentVel = this.vel.x;
      var rainFrequency = .4;

      if (ig.input.state('hold')) {

        // For the third condition, this.pos.y + this.size.y is the location of the bottom of the cloud, 280 is the y coord for the ground and 83 is the height of the evaporation entity
        if (ig.game.lakeProximity && ig.game.getEntitiesByType( EntityEvaporation ).length === 0 && (this.pos.y + this.size.y) > (280 - 83)) {
          ig.game.spawnEntity( EntityEvaporation, this.pos.x + 10, y, {flip:this.flip} );
        }
      }
      // Check to make sure rain only happens on given interval,
      // that evaporation isn't happening,
      // and that the water level is high enough
      else if (this.rainTimer.delta() > rainFrequency && ig.game.getEntitiesByType( EntityEvaporation ).length === 0 && ig.game.playerController.waterLevel > 0 && ig.game.playerController.endSequence == false) {
        // Create 4 rain drops at different points along the cloud
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 1), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 2), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 3), y, {flip:this.flip, currentVel: currentVel} );
        ig.game.spawnEntity( EntityDrop, this.pos.x + (this.size.x / 4 * 4), y, {flip:this.flip, currentVel: currentVel} );

        // ig.game.notificationManager.spawnNote('media/04b03black.font.png', 'drop', this.pos.x - ig.game.screen.x + (this.size.x / 2) - 10, this.pos.y - 10);

        // Reduce the water level
        ig.game.playerController.waterLevel--;

        // Reset the rain timer
        this.rainTimer.reset();
      }


      // Set graphic depending on water level
      var waterLevelAnim = (ig.game.playerController.waterLevel <= ig.game.playerController.waterLevelMax) ? ig.game.playerController.waterLevel : ig.game.playerController.waterLevelMax;
      this.currentAnim = this.anims[waterLevelAnim];
      
      
      /* Code for jumping to the end of the level for testing */
      if (ig.input.state('up') && ig.input.state('down') && ig.input.state('hold')) {
        this.maxVel.x = 1000;
        this.vel.x = 1000;
      } else {
        this.maxVel.x = 100;
      }

      // Call parent function
      this.parent();

    },

    handleMovementTrace: function( res ) {
      if( res.collision.x && ig.game.playerController.endSequence == true && ig.game.playerController.levelComplete == false) {
          var cloudText = ig.game.getEntitiesByType( EntityEndCloudsText )[0];
          cloudText.currentAnim = cloudText.anims.on;
          // Tell the player the final score
          if (ig.game.playerController.currentTreeHealth > 0) {
            ig.game.playerController.displayScore(500);
            ig.game.playerController.displayTime(500);

            var statusBar = ig.game.getEntitiesByType (EntityLevelStatus)[0];
            var statusBarMask = ig.game.getEntitiesByType (EntityLevelStatusMask)[0];
            statusBar.kill();
            statusBarMask.kill();

            ig.game.playerController.levelComplete = true;
          }
      }

      // Continue resolving the collision as normal
      this.parent(res);
    }

  });
})