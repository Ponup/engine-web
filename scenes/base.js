
define( function()
{
	'use strict';

	function BaseScene( id )
	{
		this.id = id || null;
		this.virtual = false;
	}

	BaseScene.prototype.getId = function()
	{
		return this.id;
	};

	BaseScene.prototype.setId = function( id )
	{
		this.id = id;
	};

	BaseScene.prototype.setVirtual = function( virtual )
	{
		this.virtual = virtual;
	};

	BaseScene.prototype.isVirtual = function()
	{
		return this.virtual;
	};

	BaseScene.prototype.switchFrom = function( scene )
	{
	};

	BaseScene.prototype.hide = function()
	{
		$( document.getElementById( this.id ) ).hide();
	};

	BaseScene.prototype.cleanup = function()
	{
		$( document.getElementById( this.id ) ).remove();
	};

	BaseScene.prototype.show = function()
	{
		$( document.getElementById( this.id ) ).fadeIn();
	};

	return BaseScene;
});

