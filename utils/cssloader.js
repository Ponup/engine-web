
define( function()
	{
		'use strict';

		function CssLoader()
		{
		
		}
		
		CssLoader.prototype.loadCsss = function( cssFiles )
		{
			var i = 0,
				cssFilesLen = cssFiles.length;
			for( ; i < cssFilesLen; i++ )
			{
				this.loadCss( cssFiles[i] );
			}
		};

		CssLoader.prototype.loadCss = function( cssFile )
		{
			var link = document.createElement( 'link' );
			link.style = 'type/css';
			link.rel = 'stylesheet';
			link.href = cssFile;
			document.getElementsByTagName( 'head' )[0].appendChild( link );
		};

		return CssLoader;
	}
);

