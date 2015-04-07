var AVKLayer = cc.Layer.extend(
		{
			sprite:null,
			ctor:function () 
			{
				this._super();

				GLOBAL.AVK.LOAD();
				GLOBAL.APP=new GLOBAL.AVK.APP();

				this.schedule(GLOBAL.APP.UPDATE);

				GLOBAL.SCREEN.SIZE=cc.winSize;

				this.BACK_SPR=new cc.Sprite();
				this.GUI_SPR=new cc.Sprite();
				this.UP_SPR=new cc.Sprite();
				if (typeof(cc.loaderScene)!="undefined")
				{
					cc.eventManager.removeListeners(GLOBAL.CLOSE_ITEM);
					cc.loaderScene.removeChild(GLOBAL.CLOSE_ITEM);
				}
				this.UP_SPR.addChild(GLOBAL.CLOSE_ITEM);
				GLOBAL.CLOSE_ITEM.setPosition(GLOBAL.SCREEN.WIDTH*3/4,GLOBAL.SCREEN.HEIGHT*24/27+GLOBAL.SCREEN.DELTA_Y);
				cc.eventManager.addListener(GLOBAL.CLOSE_ITEM.avk_l.clone(),GLOBAL.CLOSE_ITEM);

				this.addChild(this.BACK_SPR,0);
				this.addChild(this.GUI_SPR,1);
				this.addChild(this.UP_SPR,2);
				this.BACK_SPR.setPosition(GLOBAL.SCREEN.DELTA_X/2,0);
				this.GUI_SPR.setPosition(GLOBAL.SCREEN.DELTA_X/2,0);
				this.UP_SPR.setPosition(GLOBAL.SCREEN.DELTA_X/2,0);
				return true;
			}
		});

var AVKScene = cc.Scene.extend(
		{
			onEnter:function () 
			{
				this._super();
				GLOBAL.GUI = new AVKLayer();
				this.addChild(GLOBAL.GUI);
				GLOBAL.APP.INIT();
			}
		});
