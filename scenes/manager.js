
define( [ 'scullge/scenes/base' ], function( BaseScene )
{
	'use strict';

	function SceneManager()
	{
		this.currentScene = null;
		this.scenes = {};
	}

	SceneManager.prototype.add = function( scene )
	{
		this.scenes[ scene.getId() ] = scene;
	};

	SceneManager.prototype.switchTo = function( sceneArg )
	{
		var sceneId = null;

		if( sceneArg instanceof BaseScene )
		{
			sceneId = sceneArg.getId();
		}
		else if( 'string' == typeof( sceneArg ) )
		{
			sceneId = sceneArg;
		}

		if( !( sceneId in this.scenes ) )
		{
			throw 'The scene was not added to this manager: ' + sceneId;
		}

		var futureScene = this.scenes[ sceneId ],
		    futureIsVirtual = futureScene.isVirtual();

		if( null !== this.currentScene && false === futureIsVirtual )
		{
			this.currentScene.cleanup();
		}

		futureScene.switchFrom( this.currentScene );

		if( false === futureIsVirtual )
		{
			this.currentScene = futureScene;
		}
	};

	SceneManager.prototype.getCurrentScene = function()
	{
		return this.currentScene;
	};

	return SceneManager;
});

