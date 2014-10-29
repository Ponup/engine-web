
define( function()
{
	'use strict';

	function AudioLoader()
	{
		this.audios = {};
	}

	AudioLoader.prototype.load = function( name, path )
	{
		var audio = new Audio( path );
		audio.load();

		this.audios[ name ] = audio;
	};

	AudioLoader.prototype.stopAll = function()
	{
		for( var name in this.audios )
		{
			if( this.audios.hasOwnProperty( name ) )
			{
				this.pauseAudio( name );
			}
		}
	};

	AudioLoader.prototype.stop = function( name )
	{
		var audio = this.audios[ name ];
		if( !audio.paused )
		{
			audio.pause();
			audio.currentTime = 0;
		}
	};

	AudioLoader.prototype.play = function( name, inLoop )
	{
		if( 'undefined' === typeof( this.audios[ name ] ) )
		{
			throw 'Audio was not loaded: ' + name;
		}

		var audio = this.audios[ name ];

		if( 'undefined' !== typeof( inLoop ) )
		{
			if( 'boolean' === typeof( audio.loop ) )
			{
				    audio.loop = inLoop;
			}
			else
			{
				audio.addEventListener( 'ended', function()
					{
						this.currentTime = 0;
						this.play();
					}, false
				);
			}
		}

		audio.play();

		return audio;
	};

	return AudioLoader;
});

