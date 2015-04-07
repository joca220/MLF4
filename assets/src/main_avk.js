var btn_scale=0.95;
GLOBAL.AVK.avk_listener = cc.EventListener.create(
		{
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) 
			{	
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();

				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					GLOBAL.APP.EVENT("touch_began",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}
				return false;
			},
			onTouchMoved: function (touch, event) 
			{			
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();

				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					GLOBAL.APP.EVENT("touch_moved",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}

				GLOBAL.APP.EVENT("touch_outside",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);

				return false;
			},
			onTouchEnded: function (touch, event) 
			{			
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();

				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					GLOBAL.APP.EVENT("touch_ended",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}
				return false;
			},
			onTouchCancelled: function (touch, event) 
			{			
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();

				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					GLOBAL.APP.EVENT("touch_canceled",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}
				return false;
			}
		});

var avk_listener = cc.EventListener.create(
		{
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) 
			{	
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();

				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					target.uni_owner.set_down();
					GLOBAL.APP.EVENT("touch_began",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}
				return false;
			},
			onTouchMoved: function (touch, event) 
			{			
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();

				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					GLOBAL.APP.EVENT("touch_moved",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}

				target.uni_owner.set_up();
				GLOBAL.APP.EVENT("touch_outside",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);

				return false;
			},
			onTouchEnded: function (touch, event) 
			{			
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();


				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					target.uni_owner.set_up();
					GLOBAL.APP.EVENT("touch_ended",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}
				return false;
			},
			onTouchCancelled: function (touch, event) 
			{			
				var target = event.getCurrentTarget();	
				var loc=touch.getLocation();


				if (!cc.sys.isNative)
				{
					loc.x/=GLOBAL.SCREEN.SCALE_X;
					loc.y/=GLOBAL.SCREEN.SCALE_Y;
				}

				if (target.uni_owner.contain(loc)) 
				{
					target.uni_owner.set_up();
					GLOBAL.APP.EVENT("touch_canceled",target.uni_owner.WND,target.uni_owner.EL,target.uni_owner.ID,loc.x,loc.y,0);
					return true;
				}
				return false;
			}
		});


GLOBAL.AVK.AVK_SPR=function(pic,x,y,w,h,c)
{
	var here=this;

	here.uni_width = w;
	here.uni_height = h;
	here.uni_x = x;
	here.uni_y = GLOBAL.SCREEN.HEIGHT-y-here.uni_height;
	here.WND = GLOBAL.TMP.WND;
	here.EL = GLOBAL.TMP.EL;
	here.ID = GLOBAL.TMP.ID;
	here.enabled=true;

	var mem=[pic,x,y,w,h,c];
	this.make_copy = function()
	{
		GLOBAL.TMP.WND = here.WND;
		GLOBAL.TMP.EL = here.EL;
		GLOBAL.TMP.ID = here.ID+1;
		return new GLOBAL.AVK.AVK_SPR(mem[0],mem[1],mem[2],mem[3],mem[4],mem[5]);
	}

	if (pic=="") {
		here.sprite = new cc.Sprite();
	} else{
		here.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pic+".png"));
		
		//console.log("picture " + pic);
	}

	here.sprite.retain();
	here.sprite.uni_owner=here;
	here.sprite.setAnchorPoint(0,0);
	here.sprite.setPosition(x,GLOBAL.SCREEN.HEIGHT-y-here.uni_height);

	here.set_parent=function(parent) 
	{
		if (here.sprite.getParent()!=null)
			here.sprite.getParent().removeChild(here.sprite);

		parent.addChild(here.sprite);

		var s = here.sprite;
		var x = s.getPositionX();
		var y = s.getPositionY();
		while(s=s.getParent())
		{
			x-=s.getPositionX();
			y-=s.getPositionY();
		}
		here.sprite.setPosition(x,y);
	}

	here.contain=function(loc)
	{
		if (!here.enabled)
			return false;
		var s = here.sprite;
		var x = s.getPositionX();
		var y = s.getPositionY();
		while(s=s.getParent())
		{
			x+=s.getPositionX();
			y+=s.getPositionY();
		}

		return((x<=loc.x)&&(x+here.uni_width>=loc.x)&&(y<=loc.y)&&(y+here.uni_height>=loc.y));
	}

	var se=false;
	here.drop_events=function()
	{
		if (!se)
			return;
		se=false;
		cc.eventManager.removeListeners(here.sprite);
	}
	here.set_events=function()
	{
		if (se)
			return;
		se=true;
		cc.eventManager.addListener(GLOBAL.AVK.avk_listener.clone(),here.sprite);
	}
}

GLOBAL.AVK.AVK_BTN=function(pic,x,y,w,h,c)
{
	var here=this;

	here.uni_width = w;
	here.uni_height = h;
	here.uni_x = x;
	here.uni_y = GLOBAL.SCREEN.HEIGHT-y-here.uni_height;
	here.WND = GLOBAL.TMP.WND;
	here.EL = GLOBAL.TMP.EL;
	here.ID = GLOBAL.TMP.ID;
	here.RECT=cc.rect(0,0,w,h);
	here.enabled=true;

	var mem=[pic,x,y,w,h,c];
	this.make_copy = function()
	{
		GLOBAL.TMP.WND = here.WND;
		GLOBAL.TMP.EL = here.EL;
		GLOBAL.TMP.ID = here.ID+1;
		return new GLOBAL.AVK.AVK_BTN(mem[0],mem[1],mem[2],mem[3],mem[4],mem[5]);
	}

	here.sprite = new cc.Sprite();
	here.sprite.retain();
	here.up_sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pic+".png"));

	var fc=cc.spriteFrameCache.getSpriteFrame("down_"+pic+".png");
	if (fc==null)
	{
		here.down_sprite=new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pic+".png"));
		here.down_sprite.setScale(btn_scale,btn_scale);
	}else
		here.down_sprite=new cc.Sprite(fc);

	here.sprite.uni_owner=here;
	here.sprite.setAnchorPoint(0,0);
	here.sprite.setPosition(x,GLOBAL.SCREEN.HEIGHT-y-here.uni_height);

	here.down_sprite.setPosition(here.uni_width/2,here.uni_height/2);
	here.up_sprite.setPosition(here.uni_width/2,here.uni_height/2);
	here.sprite.addChild(here.down_sprite,0);
	here.sprite.addChild(here.up_sprite,0);
	here.down_sprite.setVisible(false);

	here.set_parent=function(parent) 
	{
		cc.eventManager.removeListeners(here.sprite);
		if (here.sprite.getParent()!=null)
			here.sprite.getParent().removeChild(here.sprite);

		parent.addChild(here.sprite);

		var s = here.sprite;
		var x = s.getPositionX();
		var y = s.getPositionY();
		while(s=s.getParent())
		{
			x-=s.getPositionX();
			y-=s.getPositionY();
		}
		here.sprite.setPosition(x,y);

		cc.eventManager.addListener(avk_listener.clone(),here.sprite);
	}

	here.set_down=function()
	{
		here.down_sprite.setVisible(true);
		here.up_sprite.setVisible(false);
	}

	here.set_up=function()
	{
		here.down_sprite.setVisible(false);
		here.up_sprite.setVisible(true);
	}

	here.contain=function(loc)
	{
		if (!here.enabled)
			return false;
		var s = here.sprite;
		var x = s.getPositionX();
		var y = s.getPositionY();
		while(s=s.getParent())
		{
			x+=s.getPositionX();
			y+=s.getPositionY();
		}

		return((x<=loc.x)&&(x+here.uni_width>=loc.x)&&(y<=loc.y)&&(y+here.uni_height>=loc.y));
	}

	cc.eventManager.addListener(avk_listener.clone(),here.sprite);
}

GLOBAL.AVK.AVK_TXT=function(pic,x,y,w,h,c)
{
	var here=this;

	here.uni_width = w;
	here.uni_height = h;
	here.uni_x = x;
	here.uni_y = GLOBAL.SCREEN.HEIGHT-y-here.uni_height;
	here.WND = GLOBAL.TMP.WND;
	here.EL = GLOBAL.TMP.EL;
	here.ID = GLOBAL.TMP.ID;
	here.enabled=true;
	here.font_size=1;

	var mem=[pic,x,y,w,h,c];
	this.make_copy = function()
	{
		GLOBAL.TMP.WND = here.WND;
		GLOBAL.TMP.EL = here.EL;
		GLOBAL.TMP.ID = here.ID+1;
		return new GLOBAL.AVK.AVK_TXT(mem[0],mem[1],mem[2],mem[3],mem[4],mem[5]);
	}

	if (pic=="")
		here.sprite = new cc.Sprite();
	else
		here.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pic+".png"));

	here.sprite.retain();
	here.sprite.uni_owner=here;
	here.sprite.setAnchorPoint(0,0);
	here.sprite.setPosition(x,GLOBAL.SCREEN.HEIGHT-y-here.uni_height);

	here.text = new cc.LabelTTF("", "Tahoma", here.uni_height);
	here.text.setAnchorPoint(0.5,0);
	here.text.setPosition(0,0);
	here.sprite.addChild(here.text);

	here.set_parent=function(parent) 
	{
		if (here.sprite.getParent()!=null)
			here.sprite.getParent().removeChild(here.sprite);

		parent.addChild(here.sprite);

		var s = here.sprite;
		var x = s.getPositionX();
		var y = s.getPositionY();
		while(s=s.getParent())
		{
			x-=s.getPositionX();
			y-=s.getPositionY();
		}

		here.sprite.setPosition(x,y);
	}

	here.set_color=function(r,g,b,a)
	{
		here.text.setFontFillColor(new cc.Color(r,g,b,a));
	}

	here.set_align=function(val)
	{
		here.text.setAnchorPoint(val,0);
	}

	here.set_text=function(val)
	{
		here.set_size(here.font_size);
		here.text.setString(val);
		var s=1;
		
		while (here.text._getWidth()>GLOBAL.SCREEN.WIDTH-20)
		{
			s=s*0.9;
			here.text.setFontSize(s*here.font_size*here.uni_height);
		}
	}

	here.set_size=function(val)
	{
		here.text.setFontSize(val*here.uni_height);
	}

	here.set_font=function(val)
	{
		here.font_size=val;
		here.text.setFontName(val);
	}

	here.contain=function(loc)
	{
		if (!here.enabled)
			return false;
		var s = here.sprite;
		var x = s.getPositionX();
		var y = s.getPositionY();
		while(s=s.getParent())
		{
			x+=s.getPositionX();
			y+=s.getPositionY();
		}

		return((x<=loc.x)&&(x+here.uni_width>=loc.x)&&(y<=loc.y)&&(y+here.uni_height>=loc.y));
	}
	var se=false;
	here.drop_events=function()
	{
		if (!se)
			return;
		se=false;
		cc.eventManager.removeListeners(here.sprite);
	}
	here.set_events=function()
	{
		if (se)
			return;
		se=true;
		cc.eventManager.addListener(GLOBAL.AVK.avk_listener.clone(),here.sprite);
	}
}

GLOBAL.CONTAINER=new function()
{
	var maked_objects=[];
	var here=this;

	this.init=function(obj,place)
	{
		obj.active=true;
		obj.sprite.setVisible(true);
		obj.sprite.setScale(1, 1);
		obj.sprite.setOpacity(255);

		if (obj.sprite.getParent()!=null)
			obj.sprite.getParent().removeChild(obj.sprite);

		if ((typeof(place)!="undefined")&&(place!=null))
			obj.set_parent(place);
		return obj;
	}

	this.free=function(obj)
	{
		obj.active=false;
		obj.sprite.setVisible(false);

		if (obj.sprite.getParent()!=null)
			obj.sprite.getParent().removeChild(obj.sprite);

		return obj;
	}

	this.get_stack=function(prototype)
	{
		var o=null;
		for (var i=0;i<maked_objects.length;i++)
		{
			if (maked_objects[i].obj==prototype)
			{
				o=maked_objects[i];
				break;
			}
		}

		if (o==null)
		{
			maked_objects.push({});
			maked_objects[i].obj=prototype;
			maked_objects[i].stack=[];
			o=maked_objects[i];
		}

		return o.stack;
	}

	this.get_object=function(prototype,place)
	{
		var o=null;
		for (var i=0;i<maked_objects.length;i++)
		{
			if (maked_objects[i].obj==prototype)
			{
				o=maked_objects[i];
				break;
			}
		}

		if (o==null)
		{
			maked_objects.push({});
			maked_objects[i].obj=prototype;
			maked_objects[i].stack=[];
			o=maked_objects[i];
		}

		for (i=0;i<o.stack.length;i++)
			if (!o.stack[i].active)
				return here.init(o.stack[i],place);

		if (o.stack.length==0)
		{
			o.stack.push(prototype);
			return here.init(prototype,place);
		}else
		{
			o.stack.push(o.stack[o.stack.length-1].make_copy());
			return here.init(o.stack[o.stack.length-1],place);
		}
	}
}

GLOBAL.ACTION=new function()
{
	var work=[];

	this.start = function(element,pause,time,prog,fin)
	{
		var c=-1;
		for (var i=0;i<work.length/6;i++)
		{
			if (work[i*6+3]<=0)
			{
				c=i*6;
				break;
			}
		}

		if (c<0)
		{
			c=work.length;
			work.push(0);
			work.push(0);
			work.push(0);
			work.push(0);
			work.push(0);
			work.push(0);
		}

		if (typeof(prog)=="undefined")
			prog=null;

		if (typeof(fin)=="undefined")
			fin=null;

		work[c]=prog;
		work[c+1]=element;
		work[c+2]=pause;
		work[c+3]=time;
		work[c+4]=time;
		work[c+5]=fin;
	}

	this.update = function(tk)
	{
		for (var i=0;i<work.length/6;i++)
		{
			if (work[i*6+3]>0)
			{
				if (work[i*6+2]>0)
				{
					work[i*6+2]-=tk;
					if (work[i*6+2]<=0)
					{
						work[i*6+3]+=work[i*6+2];
						work[i*6+2]=0;
					}
				}else 
				{
					work[i*6+3]-=tk;
					if (work[i*6+3]<=0)
						work[i*6+3]=0;

					var prog=(work[i*6+4]-work[i*6+3])/work[i*6+4];
					if (work[i*6]!=null)
						work[i*6](work[i*6+1],prog);

					if ((work[i*6+3]==0)&&(work[i*6+5]!=null))
						work[i*6+5](work[i*6+1]);
				}
			}
		}
	}
}

GLOBAL.STORAGE=new function()
{
	var here=this;
	var ls = cc.sys.localStorage;
	var prefix="AVK_TIP_TAP_";

	here.load=function(key)
	{
		return ls.getItem(prefix+key);
	}

	here.save=function(key,value)
	{
		ls.setItem(prefix+key, value);
	}
}