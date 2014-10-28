
define( function()
	{
		'use strict';

		function AnimationsUtils()
		{
		}

		AnimationsUtils.installAnimationFrames = function()
		{
			var lastTime = 0,
				vendors = [ 'ms', 'moz', 'webkit', 'o' ],
				vendorsLen = vendors.length,
				x = 0;
			for( ; x < vendorsLen && !window.requestAnimationFrame; ++x )
			{
				window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
				window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame'] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
			}

			if( !window.requestAnimationFrame )
			{
				window.requestAnimationFrame = function( callback, element )
				{
					var currTime = Date.now();
					var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
					var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
					lastTime = currTime + timeToCall;
					return id;
				};
			}

			if( !window.cancelAnimationFrame )
			{
				window.cancelAnimationFrame = function( id ) { clearTimeout( id ); };
			}
		};

		return AnimationsUtils;
	}
);

var getRequestAnimationFrame = function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function ( callback ){
                window.setTimeout(enroute, 1 / 60 * 1000);
           };
};

