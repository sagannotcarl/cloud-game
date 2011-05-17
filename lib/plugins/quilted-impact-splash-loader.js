ig.module(
	'plugins.quilted-impact-splash-loader'
)
.requires(
	'impact.loader'
)
.defines(function(){

ig.QuiltedImpactSplashLoader = ig.Loader.extend({
	
	endTime: 0,
	fadeToWhiteTime: 200, // Change to a really high number to test
	fadeToGameTime: 800,
	logoWidth: 219,
	logoHeight: 62,
	
	end: function() {
		this.parent();
		this.endTime = Date.now();
		
		// This is a bit of a hack - set this class instead of ig.game as the delegate.
		// The delegate will be set back to ig.game after the screen fade is complete.
		ig.system.setDelegate( this );
	},
	
	
	// Proxy for ig.game.run to show the screen fade after everything is loaded
	run: function() {	
		var t = Date.now() - this.endTime;
		var alpha = 1;
		if( t < this.fadeToWhiteTime ) {
			// Draw the logo -> fade to white
			this.draw();
			alpha = t.map( 0, this.fadeToWhiteTime, 0, 1);
		}
		else if( t < this.fadeToGameTime ) {
			// Draw the game -> fade from white
			ig.game.run();
			alpha = t.map( this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
		}
		else {
			// All done! Dismiss the preloader completely, set the delegate
			// to ig.game
			ig.system.setDelegate( ig.game );
			return;
		}
		
		// Draw the white rect over the whole screen
		ig.system.context.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
	},
	
	
	draw: function() {
		// Some damping for the status bar
		this._drawStatus += (this.status - this._drawStatus)/5;
		
		var ctx = ig.system.context;
		var w = ig.system.realWidth;
		var h = ig.system.realHeight;
    var scale = w / this.logoWidth / 3; // Logo size should be 1/3 of the screen width
		var center = (w - this.logoWidth)/2;
    // var statusBarOffset = (300 - this.logoWidth) * -1 / 2;
		
		// Clear
		ctx.fillStyle = 'rgba(0,0,0,0.8)';
		ctx.fillRect( 0, 0, w, h );
		
		
		ctx.save();
		
			ctx.translate( center, h / 2.5 );
			ctx.scale( scale, scale );
			
			// Loading bar ('visually' centered for the Impact logo)
			ctx.lineWidth = '3';
			ctx.strokeStyle = 'rgb(131,148,150)';
      ctx.strokeRect( 0, this.logoHeight + 40, this.logoWidth, 20 );
			
			ctx.fillStyle = 'rgb(236, 26, 98)';
      ctx.fillRect( 5, this.logoHeight + 45, (this.logoWidth - 10) * this._drawStatus, 10 );    
			
			// Draw 'Impact' text
			this.drawPaths( 'rgb(236, 26, 98)', ig.QuiltedImpactSplashLoader.PATHS_QUILTED);
			
			var comet = ig.QuiltedImpactSplashLoader.PATHS_COMET;
			
			ctx.scale(0.25,0.25);
			ctx.translate(1600,565);
			
			// Draw the comet
			this.drawPaths( 'rgb(131,148,150)', comet );
			
			
		ctx.restore();
	},
	
	
	drawPaths: function( color, paths ) {
		var ctx = ig.system.context;
		ctx.fillStyle = color;
		
		for( var i = 0; i < paths.length; i+=2 ) {
			ctx[ig.QuiltedImpactSplashLoader.OPS[paths[i]]].apply( ctx, paths[i+1] );
		}
	}
});

ig.QuiltedImpactSplashLoader.OPS = {
	bp:'beginPath',
	cp:'closePath',
	f:'fill',
	m:'moveTo',
	l:'lineTo',
	bc:'bezierCurveTo'
};

ig.QuiltedImpactSplashLoader.PATHS_QUILTED = [
	'bp',[],'m',[22.4, 61.6],'l',[16.3, 55.5],'l',[16.3, 49.8],'l',[6.5, 49.8],'l',[0.0, 43.3],'l',[0.0, 6.4],'l',[6.5, 0.0],'l',[26.9, 0.0],'l',[33.4, 6.5],'l',[33.4, 43.3],'l',[30.1, 46.5],'l',[41.0, 46.5],'l',[45.6, 42.0],'l',[45.6, 21.1],'l',[48.8, 21.1],'l',[48.8, 42.0],'l',[53.3, 46.5],'l',[62.2, 46.5],'l',[66.6, 42.0],'l',[66.6, 21.1],'l',[69.9, 21.1],'l',[69.9, 46.5],'l',[78.9, 46.5],'l',[83.4, 42.0],'l',[83.4, 21.1],'l',[86.7, 21.1],'l',[86.7, 46.5],'l',[96.7, 46.5],'l',[101.3, 42.0],'l',[101.3, 6.4],'l',[107.7, 0.0],'l',[112.0, 0.0],'l',[118.5, 6.4],'l',[118.5, 21.8],'l',[104.5, 36.6],'l',[104.5, 42.0],'l',[109.1, 46.5],'l',[122.1, 46.5],'l',[126.6, 42.0],'l',[126.6, 23.4],'l',[122.4, 23.4],'l',[122.4, 20.2],'l',[126.6, 20.2],'l',[126.6, 10.7],'l',[129.8, 10.7],'l',[129.8, 20.2],'l',[141.0, 20.2],'l',[141.0, 23.4],'l',[129.8, 23.4],'l',[129.8, 42.0],'l',[134.4, 46.5],'l',[143.2, 46.5],'l',[147.7, 42.0],'l',[147.7, 26.7],'l',[154.1, 20.2],'l',[163.2, 20.2],'l',[169.6, 26.7],'l',[169.6, 31.8],'l',[151.0, 40.5],'l',[151.0, 42.0],'l',[155.5, 46.5],'l',[172.5, 46.5],'l',[177.0, 42.0],'l',[177.0, 26.7],'l',[183.5, 20.2],'l',[195.0, 20.2],'l',[198.2, 23.4],'l',[198.2, 7.8],'l',[193.2, 2.8],'l',[195.5, 0.5],'l',[201.4, 6.4],'l',[201.4, 42.0],'l',[205.9, 46.5],'l',[210.6, 46.5],'l',[215.7, 41.5],'l',[218.0, 43.8],'l',[211.9, 49.8],'l',[204.5, 49.8],'l',[199.8, 44.9],'l',[195.0, 49.8],'l',[183.5, 49.8],'l',[178.6, 44.9],'l',[173.8, 49.8],'l',[154.2, 49.8],'l',[149.3, 44.9],'l',[144.5, 49.8],'l',[133.0, 49.8],'l',[128.2, 44.9],'l',[123.4, 49.8],'l',[107.7, 49.8],'l',[102.9, 44.9],'l',[98.1, 49.8],'l',[83.4, 49.8],'l',[83.4, 46.6],'l',[80.2, 49.8],'l',[66.6, 49.8],'l',[66.6, 46.6],'l',[63.5, 49.8],'l',[52.0, 49.8],'l',[47.2, 44.9],'l',[42.4, 49.8],'l',[19.5, 49.8],'l',[19.5, 54.2],'l',[24.6, 59.3],'l',[22.4, 61.6],'l',[22.4, 61.6],'cp',[],'m',[184.8, 46.5],'l',[193.6, 46.5],'l',[198.2, 42.0],'l',[198.2, 28.0],'l',[193.6, 23.4],'l',[184.8, 23.4],'l',[180.3, 28.0],'l',[180.3, 42.0],'l',[184.8, 46.5],'l',[184.8, 46.5],'cp',[],'m',[19.5, 46.5],'l',[25.6, 46.5],'l',[30.1, 42.0],'l',[30.1, 7.8],'l',[25.6, 3.2],'l',[7.8, 3.2],'l',[3.2, 7.8],'l',[3.2, 32.4],'l',[13.1, 32.4],'l',[19.5, 38.8],'l',[19.5, 46.5],'l',[19.5, 46.5],'cp',[],'m',[7.8, 46.5],'l',[16.3, 46.5],'l',[16.3, 40.1],'l',[11.7, 35.6],'l',[3.2, 35.6],'l',[3.2, 42.0],'l',[7.8, 46.5],'l',[7.8, 46.5],'cp',[],'m',[151.0, 28.0],'l',[151.0, 36.9],'l',[166.4, 29.7],'l',[166.4, 28.0],'l',[161.9, 23.4],'l',[155.5, 23.4],'l',[151.0, 28.0],'l',[151.0, 28.0],'cp',[],'m',[104.5, 7.8],'l',[104.5, 31.9],'l',[115.2, 20.5],'l',[115.2, 7.8],'l',[110.7, 3.2],'l',[109.1, 3.2],'l',[104.5, 7.8],'l',[104.5, 7.8],'cp',[],'m',[86.7, 13.6],'l',[83.4, 13.6],'l',[83.4, 7.8],'l',[86.7, 7.8],'l',[86.7, 13.6],'l',[86.7, 13.6],'cp',[],'f',[]
	];

ig.QuiltedImpactSplashLoader.PATHS_COMET = [
'bp',[],'m',[85.1,58.3],'l',[0.0,0.0],'l',[29.5,40.4],'l',[16.1,36.1],'l',[54.6,91.6],'bc',[65.2,106.1,83.4,106.7,93.8,95.7],'bc',[103.9,84.9,98.6,67.6,85.1,58.3],'cp',[],'m',[76.0,94.3],'bc',[68.5,94.3,62.5,88.2,62.5,80.8],'bc',[62.5,73.3,68.5,67.2,76.0,67.2],'bc',[83.5,67.2,89.6,73.3,89.6,80.8],'bc',[89.6,88.2,83.5,94.3,76.0,94.3],'cp',[],'f',[]
  ];


});
