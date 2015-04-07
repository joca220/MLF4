/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function()
{
	cc.view.adjustViewPort(true);

	if (cc.sys.isNative)
	{
		var w=cc.view.getFrameSize().width;
		var h=cc.view.getFrameSize().height;
		var tw=cc.view.getFrameSize().width;
		var th=cc.view.getFrameSize().height;


		if (th/tw>GLOBAL.SCREEN.HEIGHT/GLOBAL.SCREEN.WIDTH)
		{
			w=GLOBAL.SCREEN.WIDTH;
			h=GLOBAL.SCREEN.WIDTH*th/tw;
		}else
		{
			h=GLOBAL.SCREEN.HEIGHT;
			w=GLOBAL.SCREEN.HEIGHT*tw/th;
		}

		GLOBAL.SCREEN.DELTA_X=w-GLOBAL.SCREEN.WIDTH;
		GLOBAL.SCREEN.DELTA_Y=h-GLOBAL.SCREEN.HEIGHT;
		GLOBAL.SCREEN.IS_MOBILE=false;

		cc.view.setDesignResolutionSize(w,h,cc.ResolutionPolicy.SHOW_ALL);
		cc.view.resizeWithBrowserSize(true);
	}else
	{
		isMobile = {
				Android:function(){return navigator.userAgent.match(/Android/i);},
				BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},
				iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
				Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},
				Windows:function(){return navigator.userAgent.match(/IEMobile/i);},
				any:function(){if (sessionStorage.desktop) // desktop storage 
					return false;
				else if (localStorage.mobile) // mobile storage
					return true;

				// alternative
				var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile']; 
				for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

				// nothing found.. assume desktop
				return false;}
		};
		GLOBAL.SCREEN.IS_MOBILE=isMobile.any();
		GLOBAL.SCREEN.DELTA_X=0;
		GLOBAL.SCREEN.DELTA_Y=0;
		cc.view.setDesignResolutionSize(GLOBAL.SCREEN.WIDTH, GLOBAL.SCREEN.HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
		cc.view.resizeWithBrowserSize(true);
		GLOBAL.SCREEN.SCALE_X=1;
		GLOBAL.SCREEN.SCALE_Y=1;
		
		function resize()
		{
			setTimeout("window.scrollTo(0, 1)", 10);

			/*var width = window.innerWidth || document.body.clientWidth; 
			var height = window.innerHeight || document.body.clientHeight; 
			var ow=width;
			var oh=height;

			if (width*4/3<height)
			{
				height=width*4/3
			}else 
			{
				width=height/4*3;
			}
			if (width<1)
				width=1;

			var view = document.getElementById("gameCanvas");
			//view.style.position = "absolute";
			//view.style["z-index"] = "1";
			view.style.height =Math.floor(height) +"px";
			view.style.width = Math.floor(width) +"px";
			view.style.top = "0px";
			view.style.left = "0px";
			var view = cc.container;
			view.style.position = "absolute";
			view.style["z-index"] = "1";
			view.style.height =Math.floor(height) +"px";
			view.style.width = Math.floor(width) +"px";
			view.style.top = Math.floor((oh-height)/2)+"px";
			view.style.left = Math.floor((ow-width)/2)+"px";
			GLOBAL.SCREEN.SCALE_X=width/GLOBAL.SCREEN.WIDTH;
			GLOBAL.SCREEN.SCALE_Y=height/GLOBAL.SCREEN.HEIGHT;*/
		}
		window.addEventListener('resize', resize);
		window.onorientationchange = resize;
		resize();
	}

	function init_game()
	{
		cc.director.runScene(new AVKScene());
	}

	GLOBAL.CLOSE_ITEM=new cc.Sprite(res.logo);
	GLOBAL.CLOSE_ITEM.contain=function(loc)
	{
		var x = GLOBAL.CLOSE_ITEM.getPositionX();
		var y = GLOBAL.CLOSE_ITEM.getPositionY();
		return((x-GLOBAL.CLOSE_ITEM.width/2<=loc.x)&&(x+GLOBAL.CLOSE_ITEM.width/2>=loc.x)&&(y-GLOBAL.CLOSE_ITEM.height/2<=loc.y)&&(y+GLOBAL.CLOSE_ITEM.height/2>=loc.y));
	}
	GLOBAL.CLOSE_ITEM.resume();
	GLOBAL.CLOSE_ITEM.setPosition(GLOBAL.SCREEN.WIDTH/2,GLOBAL.SCREEN.HEIGHT*10/24);
	cc._loaderImage="res/preloader.png";
	cc.LoaderScene.preload(g_resources, init_game, this);
	if (typeof(cc.loaderScene)!="undefined")
		cc.loaderScene.addChild(GLOBAL.CLOSE_ITEM);

	GLOBAL.CLOSE_ITEM.avk_l = cc.EventListener.create({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: true,
		onTouchEnded: function (touch, event) 
		{           
			var target = event.getCurrentTarget();  
			var loc=touch.getLocation();


			if (!cc.sys.isNative)
			{
				loc.x/=GLOBAL.SCREEN.SCALE_X;
				loc.y/=GLOBAL.SCREEN.SCALE_Y;
			}

			if (target.contain(loc)) 
			{
				if (!cc.sys.isNative)
					window.open("http://m.softgames.de");
				return true;
			}

			return false;
		},
		onTouchBegan: function (touch, event) 
		{           
			var target = event.getCurrentTarget();  
			var loc=touch.getLocation();


			if (!cc.sys.isNative)
			{
				loc.x/=GLOBAL.SCREEN.SCALE_X;
				loc.y/=GLOBAL.SCREEN.SCALE_Y;
			}

			if (target.contain(loc)) 
			{
				return true;
			}

			return false;
		}
	});
	cc.eventManager.addListener(GLOBAL.CLOSE_ITEM.avk_l.clone(),GLOBAL.CLOSE_ITEM);
};
	cc.game.run();