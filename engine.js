
define( [ 'pew/actor', 'pew/utils/animations' ], function( BaseActor, AnimationsUtils )
	{
		'use strict';

		function BaseEngine()
		{
			this.intervalId = null;

			this.startTime = null;
			
			this.actors = [];
			this.updateListeners = [];

			this.context = {};
		}

		BaseEngine.prototype.addUpdateListener = function( listener )
		{
			this.updateListeners.push( listener );
		};

		BaseEngine.prototype.addActor = function( actor )
		{
			if( !( actor instanceof BaseActor ) )
			{
				throw 'Argument is not an BaseActor instance: ' + ( typeof actor );
			}
			this.actors.push( actor );
		};

		BaseEngine.prototype.findActorById = function( id )
		{
			var numberOfActors = this.actors.length,
			    i = 0;
			for( ; i < numberOfActors; i++ )
			{
				if( this.actors[i].id == id ) return this.actors[i];
			}

			throw 'Actor with id ' + id + ' was not found';
		};

		BaseEngine.prototype.findActorsByType = function( type )
		{
			var numberOfActors = this.actors.length,
				actors = [],
				i = 0;

			for( ; i < numberOfActors; i++ )
			{
				if( this.actors[i].getType() == type )
				{
					actors.push( this.actors[i] );
				}
			}
			return actors;
		};

		BaseEngine.prototype.init = function()
		{
			this.initActors();
		};

		BaseEngine.prototype.initActors = function()
		{
			var numberOfActors = this.actors.length,
				i = 0;

			for( ; i < numberOfActors; i++ )
			{
				var actor = this.actors[ i ];
				if( !actor.isInitiated() )
				{
					actor.init();
				}
			}
		};

		BaseEngine.prototype.start = function()
		{
			this.startTime = Date.now();

			this.runAnimations();
		};

		BaseEngine.prototype.runAnimations = function()
		{
			this.runId = window.requestAnimationFrame( $.proxy( this.gameLoop, this ) );
		};

		BaseEngine.prototype.stopAnimations = function()
		{
			window.cancelAnimationFrame( this.runId );
		};

		BaseEngine.prototype.getElapsedTime = function( inSeconds )
		{
			if( null === this.startTime )
			{
				return 0;
			}

			var deltaTime = Date.now() - this.startTime;

			if( 'undefined' !== typeof( inSeconds ) && inSeconds )
			{
				deltaTime /= 1000;
			}

			return deltaTime;
		};

		BaseEngine.prototype.stop = function()
		{
			this.stopAnimations();
		};

		BaseEngine.prototype.gameLoop = function()
		{
			this.runAnimations();

			var i = null,
			    numberOfListeners = this.updateListeners.length,
			    numberOfActors = this.actors.length;

			for( i = 0; i < numberOfListeners; i++ )
			{
				this.updateListeners[i]();
			}

			for( i = 0; i < numberOfActors; i++ )
			{
				var actor = this.actors[i];
				actor.update();
			}

			this.redraw();
		};

		BaseEngine.prototype.redraw = function()
		{
			$.each( this.actors, function( i, actor )
				{
					if( actor.isActive() )
					{
						actor.redraw();
					}
				}
			);
		};

		return BaseEngine;
	}
);

