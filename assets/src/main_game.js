GLOBAL.AVK.APP=function()
{
	var here=this;
	
	here.RUN=false;
	here.BUSY=false;
	here.MSG=false;
	var reset=false;
	var first=true;
	var vol=1;
	
	var deltaX=64;
	var deltaY=32;
	var px=0;
	var start_avg=0;
	var finish_avg=0;
	var currentH=256+128;
	var start_visible=0;
	var targetX=0;
	var targetY=0;
	var start_speed=25;
	var start_max_speed=8;
	var max_speed=8;
	var speed=8;
	var colorB=new cc.Color(255,255,255,255);
	
	var current_pos=0;
	var map=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var path=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var draw=[];
	var particles=[];
	var platform=new cc.Sprite();
	var money=new cc.Sprite();
	var boat=new cc.Sprite();
	boat.retain();
	var draw_1=new cc.DrawNode();
	var money_random=0.25;
	var tm=null;
	var money_stack=[];
	var dgc=new cc.Color(63,109,163,255);//left wall
	var lgc=new cc.Color(89,156,233,255);//right wall
	var dc=new cc.Color(102,178,255,255);//platform
	var lc=new cc.Color(0,0,0,0);//line color
	var napr=0;
	var br=null;
	var bl=null;
	var triesDoneByUser = 0;
	var payedFullVersion = false;
	var money_cnt=0;
	var record_cnt=0;
	var step_cnt=0;
	var current_boat=0;
	var buyed_boat=1;
	var on_y=null;
	var on_n=null;
	var on_f=null;
	var on_c=null;
	var blocks_order=0;
	var boat_pos_fall=0;
	var boat_pos=0;
	var speed_fall=0;
	var is_crush=false;
	var is_new_record=false;
	var scale_val=1;
	var scale_sign=-1;
	var first_play=false;
	
	
	var idPurchase = 0;
	
	
	here.push=function(ar,val)
	{
		for (var i=0;i<ar.length;i++)
		{
			if (ar[i]==null)
			{
				ar[i]=val;
				return;
			}
		}
		ar.push(val);
	}
	
	
	
	function add_particle(x,y)
	{
		if (!GLOBAL.SCREEN.IS_MOBILE)
		{
			var r=Math.random()*5;
			var a=Math.random()*Math.PI*2;
			var p=GLOBAL.CONTAINER.get_object(GLOBAL.ASSETS.GAME.money_part,GLOBAL.ASSETS.GAME.particles.sprite);
			p.sprite.setAnchorPoint(0.5,0.5);
			p.sprite.setPosition(x+r*Math.cos(a),y+r*Math.sin(a));
			p.sprite.setOpacity(155*Math.random());
			p.life=Math.random()*0.3+0.2;
			p.dt=p.life;
			p.dy=0;
			here.push(particles,p);
		}
	}
	
	function add_light(x,y)
	{
		var p=GLOBAL.CONTAINER.get_object(GLOBAL.ASSETS.GAME.mon_light,GLOBAL.ASSETS.GAME.particles.sprite);
		p.sprite.setAnchorPoint(0.5,0.5);
		p.sprite.setPosition(x,y);
		p.life=0.5;
		p.dt=p.life;
		p.dy=-GLOBAL.SCREEN.HEIGHT/speed;
		here.push(particles,p);
	}
	
	function add_path(x,y)
	{
		if (!GLOBAL.SCREEN.IS_MOBILE)
		{
			var r=Math.random()*7;
			var a=Math.random()*Math.PI*2;
			var p=GLOBAL.CONTAINER.get_object(GLOBAL.ASSETS.GAME.path,GLOBAL.ASSETS.GAME.particles.sprite);
			p.sprite.setAnchorPoint(0.5,0.5);
			p.sprite.setPosition(x+r*Math.cos(a),y+r*Math.sin(a));
			p.life=Math.random()*0.3+0.4;
			p.dt=p.life;
			p.dy=-GLOBAL.SCREEN.HEIGHT/speed;
			here.push(particles,p);
		}
	}
	
	function create_block()
	{
		var d=new cc.DrawNode();
		var vect=[];
		
		vect.push(new cc.p(0,0-deltaY));
		vect.push(new cc.p(-deltaX,0));
		vect.push(new cc.p(-deltaX,1));
		vect.push(new cc.p(0,deltaY+1));
		vect.push(new cc.p(deltaX,1));
		vect.push(new cc.p(deltaX,0));

		d.drawPoly(vect,dc,0,lc);

		while (vect.length>0)
			vect.pop();

		vect.push(new cc.p(-deltaX-2,1));
		vect.push(new cc.p(0,-deltaY));
		vect.push(new cc.p(0,-deltaY*11));
		vect.push(new cc.p(-deltaX-2,-deltaY*10+1));

		d.drawPoly(vect,dgc,0,lc);

		while (vect.length>0)
			vect.pop();

		vect.push(new cc.p(deltaX+2,1));
		vect.push(new cc.p(0,-deltaY));
		vect.push(new cc.p(0,-deltaY*11));
		vect.push(new cc.p(deltaX+2,-deltaY*10+1));

		d.drawPoly(vect,lgc,0,lc);

		while (vect.length>0)
			vect.pop();

		var s=new cc.Sprite();
		s.addChild(d);
		s.up=GLOBAL.CONTAINER.get_object(GLOBAL.ASSETS.GAME.block,s).sprite;
		s.up.setAnchorPoint(0.5,1);
		s.up.setPosition(0,deltaY+1);
		s.up.setOpacity(0);
		s.blocks_order=blocks_order;
		platform.addChild(s,blocks_order);
		blocks_order++;
		return s;
	}
	
	function fill_map()
	{
		start_avg=0;
		var avg=0;
		
		while(draw.length<map.length)
			draw.push(create_block());
		
		for(i=0;i<map.length;i++)
		{
			var next_pnt=0;
			
			if (avg>=4)//справа оставляем место под шкалу
				next_pnt=-1;
			else if (avg<=-5)
				next_pnt=1;
			else if (Math.random()>0.5)
				next_pnt=1;
			else
				next_pnt=-1;
			
			map[i]=next_pnt;
			
			if ((i>currentH/deltaY)&&(Math.random()<money_random))
			{
				var m=GLOBAL.CONTAINER.get_object(GLOBAL.ASSETS.GAME.money,money);
				m.sprite.setAnchorPoint(0.5,0.5);
				m.sprite.setPosition(deltaX*(Math.random()-0.5)*1.5+GLOBAL.SCREEN.WIDTH/2+deltaX*avg,deltaY*i);
				m.index=i;
				here.push(money_stack,m);
			}

			path[i]=GLOBAL.SCREEN.WIDTH/2+avg*deltaX-deltaX;
			avg+=next_pnt;
		}
		finish_avg=avg;
	}
	
	function add_map()
	{
		step_cnt++;
		if (100*Math.floor(step_cnt/100)==step_cnt)
			max_speed--;
		if (max_speed<1)
			max_speed=1;
				
		GLOBAL.ASSETS.GAME.txt_steps.set_text(step_cnt);
		
		for (var i=0;i<money_stack.length;i++)
		{
			if ((money_stack[i]!=null)&&(money_stack[i].active)&&(money_stack[i].index!=null))
			{
				money_stack[i].sprite.setPositionY(money_stack[i].sprite.getPositionY()-deltaY);
				money_stack[i].index--;
				if (money_stack[i].sprite.getPositionY()<0)
				{
					GLOBAL.CONTAINER.free(money_stack[i]);
					money_stack[i]=null;
				}
			}
		}

		start_avg+=map[0];
		for(i=0;i<map.length-1;i++)
		{
			map[i]=map[i+1];
			path[i]=path[i+1];
		}
			
		var avg=finish_avg;
		var next_pnt=0;
			
		if (avg>=4)//справа оставляем место под шкалу
			next_pnt=-1;
		else if (avg<=-5)
			next_pnt=1;
		else if (Math.random()>0.5)
			next_pnt=1;
		else
			next_pnt=-1;

		map[i]=next_pnt;
		if (Math.random()<money_random)
		{
			var m=GLOBAL.CONTAINER.get_object(GLOBAL.ASSETS.GAME.money,money);
			m.sprite.setAnchorPoint(0.5,0.5);
			m.sprite.setPosition(deltaX*(Math.random()-0.5)*1.5+GLOBAL.SCREEN.WIDTH/2+deltaX*avg,deltaY*i);
			m.index=i;
			here.push(money_stack,m);
		}
		path[i]=GLOBAL.SCREEN.WIDTH/2+avg*deltaX-deltaX;
		avg+=next_pnt;
		
		finish_avg=avg;
	}
	
	function draw_map(val)
	{
		var tmp=Math.floor(currentH/deltaY)-2;
		var start=tmp;
		var startX=GLOBAL.SCREEN.WIDTH/2+deltaX*start_avg;
		var cnt=start_visible;
		
		for(var i=0;i<map.length;i++)
		{
			if (start>0)
			{
				draw[map.length-i-1].setPosition(startX,deltaY*i-(start+val)*(start+val)*(start+val)*3);
				draw[map.length-i-1].up.setOpacity(500*(start+val)/(tmp+1));
			}else
			{
				draw[map.length-i-1].setPosition(startX,deltaY*i);
				draw[map.length-i-1].up.setOpacity(0);
			}
			
			draw[map.length-i-1].setVisible(cnt<0);
			start--;
			cnt--;
			startX+=map[i]*deltaX;
		}
		
		start=tmp;
		for (i=0;i<money_stack.length;i++)
		{
			if ((money_stack[i]!=null)&&(money_stack[i].active))
			{
				var t=money_stack[i].index;
				
				if (t!=null)
				{
					if (start-t>0)
					{//падение
						money_stack[i].sprite.setPositionY(deltaY*t-(start-t+val)*(start-t+val)*(start-t+val)*3);
						money_stack[i].sprite.setScale(1-(start-t+val)/start,1-(start-t+val)/start);
						add_particle(money_stack[i].sprite.getPositionX(),deltaY*t-(start-t+val)*(start-t+val)*(start-t+val)*3-val*deltaY);
					}
					
					if (money_stack[i].sprite.getPositionY()<0)
					{
						GLOBAL.CONTAINER.free(money_stack[i]);
						money_stack[i]=null;
					}
				}
			}
		}
	}

	function get_position(prog)
	{
		prog+=currentH;
	
		var i=Math.floor(prog/deltaY);
		var h=prog-deltaY*i;
		var p=h/deltaY;
		var r0=path[i]+deltaX
		var r1=path[i+1]+deltaX
		var r=r0+(r1-r0)*p;

		return r;
	}

	function init_map()
	{
		is_crush=false;
		
		show_shop();
		hide_shopCoins();
		step_cnt=0;
		max_speed=start_max_speed;
		speed=start_speed;
		
		GLOBAL.ASSETS.GAME.txt_steps.set_text(step_cnt);
		if (!GLOBAL.SCREEN.IS_MOBILE)
		{
			colorB.g=255;
			GLOBAL.ASSETS.GAME.back.sprite.setColor(colorB);
		}
		start_visible=Math.floor(currentH/deltaY)-1;
		current_pos=0;
		fill_map();
		draw_map(0);
		
		money.setPosition(0,0);
		platform.setPosition(0,0);
		px=get_position(0);
		boat.setPosition(px,currentH);
		GLOBAL.ASSETS.GAME.light.sprite.setPosition(px,currentH);

		if (get_position(1)>px)
			napr=1;
		else
			napr=-1;

		GLOBAL.ASSETS.GAME.start.sprite.setVisible(true);  // es la capa encima del juego principal
		GLOBAL.CLOSE_ITEM.setVisible(true); // es como logo softgames
		console.log("normal entra");
		//GLOBAL.ASSETS.SHOP.sprite2.back2.setVisible(false);
		/*var c=colorB.g+128*tk;
		if (c>255)
			c=255;
		colorB.g=c;
	
		GLOBAL.ASSETS.SHOP.back2.sprite.setColor(colorB);
		console.log("normal set visible");*/
		
		if (napr==1)
		{
			br.setVisible(true);
			bl.setVisible(false);
		}else
		{
			br.setVisible(false);
			bl.setVisible(true);
		}
	}

	function load()
	{
		money_cnt=GLOBAL.STORAGE.load("money");
		if ((reset)||(money_cnt==null)||((money_cnt=="")))
			money_cnt=0;
		record_cnt=GLOBAL.STORAGE.load("record");
		if ((reset)||(record_cnt==null)||((record_cnt=="")))
			record_cnt=0;
		current_boat=GLOBAL.STORAGE.load("current_boat");
		if ((reset)||(current_boat==null)||((current_boat=="")))
			current_boat=0;
		buyed_boat=GLOBAL.STORAGE.load("buyed_boat");
		if ((reset)||(buyed_boat==null)||((buyed_boat=="")))
			buyed_boat=1;
		
		money_cnt*=1;
		record_cnt*=1;
		current_boat*=1;
		buyed_boat*=1;
		
		//money_cnt = 2000;//buque
	}
	
	function saveTriesDone()
	{
		triesDoneByUser = triesDoneByUser + 1;
		GLOBAL.STORAGE.save("triesDone",triesDoneByUser);
		
	}
	
	function save()
	{
		//console.log("se guarda el game");
		GLOBAL.STORAGE.save("money",money_cnt);
		GLOBAL.STORAGE.save("record",record_cnt);
		GLOBAL.STORAGE.save("current_boat",current_boat);
		GLOBAL.STORAGE.save("buyed_boat",buyed_boat);
	}
	here.save=save;
	
	here.add_money=function(num)
	{
		money_cnt=money_cnt*1+num*1;
		GLOBAL.ASSETS.GAME.txt_money.set_text(money_cnt);
		GLOBAL.ASSETS.GAME.btn_add_money.sprite.setPositionX(GLOBAL.ASSETS.GAME.txt_money.sprite.getPositionX()-GLOBAL.ASSETS.GAME.txt_money.text._getWidth()-GLOBAL.ASSETS.GAME.btn_add_money.uni_width*1.5);
	}
	
	
	here.show_msgFinal =function(msg,f_y,f_n,f_f,end_str,capt,call_back)
	{
		show_msg(msg,finish,f_n,f_f,end_str,capt,call_back);
	}
	
	function show_msg(msg,f_y,f_n,f_f,end_str,capt,call_back)
	{
		on_y=f_y;
		on_n=f_n;
		on_f=f_f;
		
		if (typeof(end_str)=="undefined")
			end_str="";
		if (typeof(capt)=="undefined")
			capt="";
		if (typeof(call_back)=="undefined")
			call_back=null;

		on_c=call_back;
		
		GLOBAL.ASSETS.GAME.btn_n.sprite.setVisible(on_n!=null);
		GLOBAL.ASSETS.GAME.btn_y.sprite.setVisible(on_y!=null);
		
		if (capt!="")
		{
			GLOBAL.ASSETS.GAME.txt_msg.set_text("");
			
			if (end_str!="")
			{
				GLOBAL.ASSETS.GAME.txt_msg_s0.set_text(capt);
				GLOBAL.ASSETS.GAME.txt_msg_s1.set_text(msg+" ");
				GLOBAL.ASSETS.GAME.message_box.coin.sprite.setPosition(GLOBAL.ASSETS.GAME.txt_msg_s1.sprite.getPositionX()+GLOBAL.ASSETS.GAME.txt_msg_s1.text._getWidth()/2,GLOBAL.ASSETS.GAME.txt_msg_s1.sprite.getPositionY());
				GLOBAL.ASSETS.GAME.txt_msg_end.set_text(end_str);
				GLOBAL.ASSETS.GAME.txt_msg_end.sprite.setPosition(GLOBAL.ASSETS.GAME.message_box.coin.sprite.getPositionX()+GLOBAL.ASSETS.GAME.message_box.coin.uni_width,GLOBAL.ASSETS.GAME.txt_msg_s1.sprite.getPositionY());
			}else
			{
				GLOBAL.ASSETS.GAME.txt_msg_s0.set_text(capt);
				GLOBAL.ASSETS.GAME.txt_msg_s1.set_text(msg);
				GLOBAL.ASSETS.GAME.txt_msg_end.set_text("");
			}
		}else
		{
			GLOBAL.ASSETS.GAME.txt_msg_s0.set_text("");
			GLOBAL.ASSETS.GAME.txt_msg_s1.set_text("");
			if (end_str!="")
			{
				GLOBAL.ASSETS.GAME.txt_msg.set_text(msg+" ");
				GLOBAL.ASSETS.GAME.message_box.coin.sprite.setPosition(GLOBAL.ASSETS.GAME.txt_msg.sprite.getPositionX()+GLOBAL.ASSETS.GAME.txt_msg.text._getWidth()/2,GLOBAL.ASSETS.GAME.txt_msg.sprite.getPositionY());
				GLOBAL.ASSETS.GAME.txt_msg_end.set_text(end_str);
				GLOBAL.ASSETS.GAME.txt_msg_end.sprite.setPosition(GLOBAL.ASSETS.GAME.message_box.coin.sprite.getPositionX()+GLOBAL.ASSETS.GAME.message_box.coin.uni_width,GLOBAL.ASSETS.GAME.txt_msg.sprite.getPositionY());
			}else
			{
				GLOBAL.ASSETS.GAME.txt_msg.set_text(msg);
				GLOBAL.ASSETS.GAME.txt_msg_end.set_text("");
			}
		}
		
		function on_progress(el,val)
		{
			el.sprite.setPositionY(GLOBAL.SCREEN.HEIGHT+(el.uni_y-GLOBAL.SCREEN.HEIGHT)*val*val);
		}
		
		function on_finish(el)
		{
			el.sprite.setPositionY(el.uni_y);
		}
		
		here.MSG=true;
		GLOBAL.ASSETS.GAME.message_box.coin.sprite.setVisible(end_str!="");
		GLOBAL.ASSETS.GAME.message_box.sprite.setPositionY(GLOBAL.SCREEN.HEIGHT);
		GLOBAL.ASSETS.GAME.message_box.sprite.setVisible(true);
		GLOBAL.ACTION.start(GLOBAL.ASSETS.GAME.message_box,0,0.25,on_progress,on_finish);
	}
	
	here.show_msg=show_msg;
	
	function hide_msg()
	{
		function on_progress(el,val)
		{
			el.sprite.setPositionY(el.uni_y+(GLOBAL.SCREEN.HEIGHT-el.uni_y)*val*val);
		}
		
		function on_finish(el)
		{
			el.sprite.setVisible(false);
			el.sprite.setPositionY(GLOBAL.SCREEN.HEIGHT);
			here.MSG=false;
			if (on_c!=null)
			{
				on_c(on_f);	
			}else
			{
				if (on_f!=null)
					on_f();
			}
		}
		
		GLOBAL.ACTION.start(GLOBAL.ASSETS.GAME.message_box,0,0.25,on_progress,on_finish)
	}
	
	function show_shop()
	{
		function on_progress(el,val)
		{
			el.sprite.setPositionY(-(1-val)*GLOBAL.SCREEN.HEIGHT);
		}
		
		function on_finish(el)
		{
			el.sprite.setPositionY(0);
			if (is_new_record)
			{
				if (first_play)
					cc.audioEngine.playEffect(res.finish);
				show_msg(GLOBAL.STRINGS.get_str("lng_9")+GLOBAL.MONETIZATION.record_cost,function(){here.add_money(GLOBAL.MONETIZATION.record_cost)},null,null," ",GLOBAL.STRINGS.get_str("lng_8")+record_cnt);
				is_new_record=false;
			}
		}

		save();
		GLOBAL.ASSETS.GAME.shop.sprite.setPositionY(-GLOBAL.SCREEN.HEIGHT);
		GLOBAL.ASSETS.GAME.shop.sprite.setVisible(true);
		GLOBAL.ACTION.start(GLOBAL.ASSETS.GAME.shop,0,0.5,on_progress,on_finish)
	}
	
	function hide_shop()
	{
		function on_progress(el,val)
		{
			el.sprite.setPositionY(-val*GLOBAL.SCREEN.HEIGHT);
		}
		
		function on_finish(el)
		{
			el.sprite.setVisible(false);
		}
		
		GLOBAL.ACTION.start(GLOBAL.ASSETS.GAME.shop,0,0.5,on_progress,on_finish)
	}
	
	
	
	
	function show_shopCoins()
	{
		function on_progress(el,val)
		{
			el.sprite.setPositionY(-(1-val)*GLOBAL.SCREEN.HEIGHT);
		}
		
		function on_finish(el)
		{
			el.sprite.setPositionY(0);
		}

		GLOBAL.ASSETS.GAME.shopCoins.sprite.setPositionY(-GLOBAL.SCREEN.HEIGHT);
		GLOBAL.ASSETS.GAME.shopCoins.sprite.setVisible(true);
		GLOBAL.ACTION.start(GLOBAL.ASSETS.GAME.shopCoins,0,0.5,on_progress,on_finish)
	}
	
	function hide_shopCoins()
	{
		function on_progress(el,val)
		{
			el.sprite.setPositionY(-val*GLOBAL.SCREEN.HEIGHT);
		}
		
		function on_finish(el)
		{
			el.sprite.setVisible(false);
		}
		
		GLOBAL.ACTION.start(GLOBAL.ASSETS.GAME.shopCoins,0,0.5,on_progress,on_finish)
	}
	
	function finish()
	{
		is_crush=false;
		boat.getParent().removeChild(boat);
		GLOBAL.ASSETS.GAME.field.sprite.addChild(boat);
		
		GLOBAL.MONETIZATION.on_finish(step_cnt);
		GLOBAL.ASSETS.GAME.txt_record.sprite.setVisible(false);
		here.RUN=false;
		
		for (var i=0;i<money_stack.length;i++)
		{
			if (money_stack[i]!=null)
			{
				GLOBAL.CONTAINER.free(money_stack[i]);
				money_stack[i]=null;
			}
		}
		
		init_map();
	}
	
	function fall_finish()
	{
		//GLOBAL.ASSETS.GAME.field.sprite.addChild(boat);
		if (first_play)
			cc.audioEngine.playEffect(res.fail);
		is_crush=true;
		boat.getParent().removeChild(boat);
		platform.addChild(boat,draw[map.length-Math.floor(currentH/deltaY)-2].blocks_order);
		boat.setPosition(boat.getPositionX(),currentH+current_pos);
		boat_pos=current_pos;
		boat_pos_fall=current_pos;
		speed=max_speed;
		speed_fall=max_speed;
	}
	
	function before_finish()
	{
		if (record_cnt<step_cnt)
		{
			record_cnt=step_cnt;
			is_new_record=true;
		}
			
		GLOBAL.ASSETS.GAME.start.txt_rec.set_text(GLOBAL.STRINGS.get_str("lng_7")+record_cnt);
		GLOBAL.ASSETS.GAME.txt_record.set_text(GLOBAL.STRINGS.get_str("lng_7")+record_cnt);
		GLOBAL.ASSETS.GAME.txt_record.sprite.setVisible(true);
		function buyed_continue()
		{
			is_crush=false;
			boat.getParent().removeChild(boat);
			GLOBAL.ASSETS.GAME.field.sprite.addChild(boat);
			
			GLOBAL.ASSETS.GAME.txt_record.sprite.setVisible(false);
			here.add_money(-GLOBAL.MONETIZATION.life_cost);
			speed=start_speed;
			px=get_position(current_pos);
			boat.setPosition(px,currentH);
			GLOBAL.ASSETS.GAME.light.sprite.setPosition(px,currentH);

			if (get_position(current_pos+1)>px)
				napr=1;
			else
				napr=-1;

			if (napr==1)
			{
				br.setVisible(true);
				bl.setVisible(false);
			}else
			{
				br.setVisible(false);
				bl.setVisible(true);
			}
		}
		
		if (money_cnt<GLOBAL.MONETIZATION.life_cost)
		{
			if (GLOBAL.MONETIZATION.have_iap)
				show_msg(GLOBAL.STRINGS.get_str("lng_5")+GLOBAL.MONETIZATION.life_cost,function(){},finish,function(){show_msg(GLOBAL.STRINGS.get_str("lng_4")+GLOBAL.MONETIZATION.num_buy_money,function(){},finish,before_finish,"?",GLOBAL.STRINGS.get_str("lng_3"),GLOBAL.MONETIZATION.buy_money);},"?");
			else {
				saveTriesDone();
				if(triesDoneByUser >= 100 && !payedFullVersion){
					console.log("sera que eso es lo que repite");
					show_msg(GLOBAL.STRINGS.get_str("lng_14"),function(){console.log("debe desbloquear game");},finish,null);
				} else {
					show_msg(GLOBAL.STRINGS.get_str("lng_6"),finish,null,null);
				}
			  }
		}else 
		{
			show_msg(GLOBAL.STRINGS.get_str("lng_5")+GLOBAL.MONETIZATION.life_cost,function(){},finish,buyed_continue,"?");
		}
	}
	
	function select_bot(num)
	{
		if (num==buyed_boat)
		{//покупка
			if (money_cnt<GLOBAL.MONETIZATION.cost[num])
			{
				//AQUI deberiamos interceptar y cambiar los datos para la compra
				show_shopCoins();
				hide_shop();
				/*if (GLOBAL.MONETIZATION.have_iap)
					show_msg(GLOBAL.STRINGS.get_str("lng_4")+GLOBAL.MONETIZATION.num_buy_money,function(){},function(){},function(){select_bot(buyed_boat)},"?",GLOBAL.STRINGS.get_str("lng_3"),GLOBAL.MONETIZATION.buy_money);
				else 
					show_msg(GLOBAL.STRINGS.get_str("lng_3"),function(){},null,null);*/
			}else 
			{
				show_msg(GLOBAL.STRINGS.get_str("lng_2")+GLOBAL.MONETIZATION.cost[num],function(){here.add_money(-GLOBAL.MONETIZATION.cost[buyed_boat]);buyed_boat++;select_bot(buyed_boat-1)},function(){},null,"?");
			}
			return;
		}else if (num>buyed_boat)
			return;
			
		current_boat=num;
		for ( var i=0;i<8;i++)
		{
			GLOBAL.ASSETS.GAME["l_"+i].sprite.setVisible(current_boat*1==i);
			GLOBAL.ASSETS.GAME["r_"+i].sprite.setVisible(current_boat*1==i);
		}
		for (i=1;i<8;i++)
		{
			GLOBAL.ASSETS.GAME["price_"+i].sprite.setVisible(i>=buyed_boat*1);  // aki dice si muestra el precio
			GLOBAL.ASSETS.GAME["close_"+i].sprite.setVisible(i>=buyed_boat*1+1); // si esta en true.. muestra el candado
		}

		bl=GLOBAL.ASSETS.GAME["l_"+current_boat].sprite;
		br=GLOBAL.ASSETS.GAME["r_"+current_boat].sprite;
		
		if (napr==1)
		{
			br.setVisible(true);
			bl.setVisible(false);
		}else
		{
			br.setVisible(false);
			bl.setVisible(true);
		}
		
		GLOBAL.ASSETS.GAME.selected.sprite.setPosition(GLOBAL.ASSETS.GAME["btn_sel_"+current_boat].sprite.getPositionX()-(GLOBAL.ASSETS.GAME.selected.uni_width-GLOBAL.ASSETS.GAME.btn_sel_0.uni_width)/2,GLOBAL.ASSETS.GAME["btn_sel_"+current_boat].sprite.getPositionY()-(GLOBAL.ASSETS.GAME.selected.uni_height-GLOBAL.ASSETS.GAME.btn_sel_0.uni_height)/2);
		save();
	}
	
	function checkCoinsPackInfo()
	{
	    var info = null;
	    if(!cc.sys.isNative) info = "1.99$,500,2.99$,2500,4.99$,5000,9.99$,10000";
	    else info = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","checkCoinsPackInfo","()Ljava/lang/String;");
	    info = info.split("&");
	    
	    for(var i = 0; i < info.length; i = i + 2){
	        var item = {};
	        item.price = info[i];
	        item.amount = parseInt(info[i + 1]);
	        coinsPackInfo.push(item);
	    }
	}
	
	function toBuyGoods()
	{
	   jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","toBuyGoods","(I)V", idPurchase);
	   show_msg(GLOBAL.STRINGS.get_str("lng_16"),null,null,null);
	}
	
	function gotoCGV()
	{
	        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","gotoCGV","()V");
	}
	
	function enterCode(){
		/* var code = this.codeTxt.getString();
         if(!code.length) return;
         var r = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","toEnterCode","(Ljava/lang/String;)I", code);
         var msj = "";
         
         if (r < 0) {
	 	       msj=  "Attention le code "+ code +" n`est pas valide";
	 	    } else {
	 	        msj =  "Paiement accepté";
	 	    }
	 	    
        	showBuyingMsg(msj);*/
         
	}
	
	
	
	here.INIT=function()
	{
		/*if (!cc.sys.isNative)
		{
			function stop_music()
			{
				if (vol==1)
				{
					cc.audioEngine.setMusicVolume(0);
					cc.audioEngine.setEffectsVolume(0);
					vol=0;
				}
			}
			function start_music()
			{
				if (GLOBAL.ASSETS.GAME.btn_snd.enabled)
				{
					if (vol==0)
					{
						cc.audioEngine.setMusicVolume(1);
						cc.audioEngine.setEffectsVolume(1);
						vol=1;
					}
				}
			}
			Visibility.change(function (e, state) 
			{
				if (state=="hidden")
					stop_music();
				else start_music();
			});
		}*/
		GLOBAL.ASSETS.GAME.btn_snd.sprite.setPositionY(GLOBAL.ASSETS.GAME.btn_snd.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.btn_no_snd.sprite.setPositionY(GLOBAL.ASSETS.GAME.btn_no_snd.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.btn_add_money.sprite.setPositionY(GLOBAL.ASSETS.GAME.btn_add_money.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.txt_record.sprite.setPositionY(GLOBAL.ASSETS.GAME.txt_record.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.message_box.sprite.setPositionY(GLOBAL.ASSETS.GAME.message_box.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.txt_money.sprite.setPositionY(GLOBAL.ASSETS.GAME.txt_money.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.txt_steps.sprite.setPositionY(GLOBAL.ASSETS.GAME.txt_steps.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		GLOBAL.ASSETS.GAME.target.sprite.setPositionY(GLOBAL.ASSETS.GAME.target.sprite.getPositionY()+GLOBAL.SCREEN.DELTA_Y);
		
		GLOBAL.MONETIZATION.start();
		load();
		checkCoinsPackInfo();
		
		GLOBAL.ASSETS.GAME.btn_add_money.sprite.setVisible(GLOBAL.MONETIZATION.have_iap);
		GLOBAL.ASSETS.GAME.btn_add_money.enabled=GLOBAL.MONETIZATION.have_iap;
		
		GLOBAL.ASSETS.GAME.finger.sprite.setAnchorPoint(0.5,0.5);
		GLOBAL.ASSETS.GAME.finger.sprite.setPosition(GLOBAL.ASSETS.GAME.finger.sprite.getPositionX()+0.5*GLOBAL.ASSETS.GAME.finger.uni_width,GLOBAL.ASSETS.GAME.finger.sprite.getPositionY()+0.5*GLOBAL.ASSETS.GAME.finger.uni_height);
		
		GLOBAL.ASSETS.GAME.txt_help.set_color(48,48,48,255);
		GLOBAL.ASSETS.GAME.txt_help.set_text(GLOBAL.STRINGS.get_str("lng_13"));
		
		GLOBAL.ASSETS.GAME.txt_steps.set_color(48,48,48,255);
		GLOBAL.ASSETS.GAME.txt_steps.set_text(step_cnt);
		
		GLOBAL.ASSETS.GAME.start.txt_rec.set_color(48,48,48,255);
		GLOBAL.ASSETS.GAME.start.txt_rec.set_text(GLOBAL.STRINGS.get_str("lng_7")+record_cnt);
		
		GLOBAL.ASSETS.GAME.txt_record.set_color(48,48,48,255);
		GLOBAL.ASSETS.GAME.txt_record.set_text(GLOBAL.STRINGS.get_str("lng_7")+record_cnt);
		
		GLOBAL.ASSETS.GAME.txt_msg_end.set_align(0);
		
		GLOBAL.ASSETS.GAME.txt_money.set_color(48,48,48,255);
		GLOBAL.ASSETS.GAME.txt_money.set_align(1);
		GLOBAL.ASSETS.GAME.txt_money.set_text(money_cnt);
		
		GLOBAL.ASSETS.GAME.btn_add_money.sprite.setPositionX(GLOBAL.ASSETS.GAME.txt_money.sprite.getPositionX()-GLOBAL.ASSETS.GAME.txt_money.text._getWidth()-GLOBAL.ASSETS.GAME.btn_add_money.uni_width*1.5);
			
		GLOBAL.ASSETS.GAME.start.txt_start.set_color(48,48,48,255);
		GLOBAL.ASSETS.GAME.start.txt_start.set_text(GLOBAL.STRINGS.get_str("lng_1"));
		GLOBAL.ASSETS.GAME.sprite.setAnchorPoint(0,0);
		GLOBAL.GUI.GUI_SPR.addChild(GLOBAL.ASSETS.GAME.sprite,0);
		
		GLOBAL.ASSETS.GAME.back.sprite.setPosition(-GLOBAL.SCREEN.DELTA_X/2,0);
		GLOBAL.ASSETS.GAME.start.msg.sprite.setPosition(-GLOBAL.SCREEN.DELTA_X/2,0);
		GLOBAL.ASSETS.GAME.start.msg.sprite.setScale((GLOBAL.SCREEN.DELTA_X+GLOBAL.SCREEN.WIDTH)/GLOBAL.SCREEN.WIDTH,(GLOBAL.SCREEN.DELTA_Y+GLOBAL.SCREEN.HEIGHT)/GLOBAL.SCREEN.HEIGHT);
		GLOBAL.ASSETS.GAME.back.sprite.setScale((GLOBAL.SCREEN.DELTA_X+GLOBAL.SCREEN.WIDTH)/GLOBAL.SCREEN.WIDTH,(GLOBAL.SCREEN.DELTA_Y+GLOBAL.SCREEN.HEIGHT)/GLOBAL.SCREEN.HEIGHT);
		
		GLOBAL.ASSETS.GAME.back.set_events();
		//от -5 до 5 сумма

		GLOBAL.ASSETS.GAME.place.sprite.addChild(platform);
		GLOBAL.ASSETS.GAME.field.sprite.addChild(money);
		GLOBAL.ASSETS.GAME.field.sprite.addChild(boat);

		GLOBAL.ASSETS.GAME.message_box.coin=GLOBAL.ASSETS.GAME.target.make_copy();
		GLOBAL.ASSETS.GAME.message_box.coin.set_parent(GLOBAL.ASSETS.GAME.message_box.sprite);
		
		GLOBAL.ASSETS.GAME.btn_no_snd.enabled=false;
		GLOBAL.ASSETS.GAME.btn_no_snd.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.help.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.message_box.coin.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.txt_record.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.message_box.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.path.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.mon_light.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.money_part.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.money.sprite.setVisible(false);
		GLOBAL.ASSETS.GAME.shop.sprite.setVisible(false);
		
		GLOBAL.ASSETS.GAME.light.sprite.setAnchorPoint(0.5,0.5);
		GLOBAL.ASSETS.GAME.light.sprite.setOpacity(200);
		
		for ( var i=0;i<8;i++)
		{
			GLOBAL.ASSETS.GAME["l_"+i].sprite.setVisible(false);
			GLOBAL.ASSETS.GAME["r_"+i].sprite.setVisible(false);
			
			GLOBAL.ASSETS.GAME["l_"+i].sprite.getParent().removeChild(GLOBAL.ASSETS.GAME["l_"+i].sprite);
			GLOBAL.ASSETS.GAME["r_"+i].sprite.getParent().removeChild(GLOBAL.ASSETS.GAME["r_"+i].sprite);
			
			boat.addChild(GLOBAL.ASSETS.GAME["l_"+i].sprite);
			boat.addChild(GLOBAL.ASSETS.GAME["r_"+i].sprite);
			
			GLOBAL.ASSETS.GAME["l_"+i].sprite.setAnchorPoint(0.5,0.5);
			GLOBAL.ASSETS.GAME["r_"+i].sprite.setAnchorPoint(0.5,0.5);
			
			GLOBAL.ASSETS.GAME["l_"+i].sprite.setPosition(0,0);
			GLOBAL.ASSETS.GAME["r_"+i].sprite.setPosition(0,0);
		}
		
		for (i=1;i<8;i++)
		{
			GLOBAL.ASSETS.GAME["txt_price_"+i].set_text(GLOBAL.MONETIZATION.cost[i]);
		}

		targetX=GLOBAL.ASSETS.GAME.target.sprite.getPositionX()+GLOBAL.ASSETS.GAME.target.uni_width/2;
		targetY=GLOBAL.ASSETS.GAME.target.sprite.getPositionY()+GLOBAL.ASSETS.GAME.target.uni_height/2;

		bl=GLOBAL.ASSETS.GAME["l_"+current_boat].sprite;
		br=GLOBAL.ASSETS.GAME["r_"+current_boat].sprite;
		
		init_map();
		select_bot(current_boat);
	}
	
	here.EVENT=function(act,wnd,el,id,x,y,tag)
	{
		//cc.log(act+":"+wnd+":"+el+":"+id);
		if ((GLOBAL.APP.BUSY)&&(el!="btn_snd")&&(el!="btn_no_snd"))
			return;

		if ((act=="touch_began")&&(!GLOBAL.ASSETS.GAME.message_box.sprite.isVisible()))
		{
			switch (wnd)
			{
			case "GAME":
				switch (el)
				{
				case "back":
					if (!is_crush)
					{
						if (here.RUN)
						{
							napr=-napr;
							first=false;
						}else 
							hide_shop();
						
						here.RUN=true;
						GLOBAL.ASSETS.GAME.start.sprite.setVisible(false);
						GLOBAL.CLOSE_ITEM.setVisible(false);
						if (here.MSG)
						{
							here.MSG=false;
							first=false;
							GLOBAL.ASSETS.GAME.help.sprite.setVisible(false);
						}
					}
					break;
				}
			}
		}else if ((act=="touch_ended")&&((!here.MSG)||((el=="btn_snd")||(el=="btn_no_snd"))))
		{
			if (!first_play)
			{
				first_play=true;
				try
				{
					cc.audioEngine.playMusic(res.music,true);
				}catch(e)
				{
					first_play=false;
				}
				cc.audioEngine.setMusicVolume(1);
				cc.audioEngine.setEffectsVolume(1);
				vol=1;
				if (!cc.sys.isNative)
				{
					GLOBAL.APP.verify_volume();
					window.addEventListener("pagehide", function(){
						if (vol==1)
						{
							cc.audioEngine.setMusicVolume(0);
							cc.audioEngine.setEffectsVolume(0);
							vol=0;
						}
				
					});
					window.addEventListener("pageshow", function() {
						if (GLOBAL.ASSETS.GAME.btn_snd.enabled)
						{
							if (vol==0)
							{
								cc.audioEngine.setMusicVolume(1);
								cc.audioEngine.setEffectsVolume(1);
								vol=1;
							}
						}
					});
				}
			}
			switch (wnd)
			{
			case "GAME":
				switch (el)
				{
				case "btn_snd":
					GLOBAL.ASSETS.GAME.btn_no_snd.enabled=true;
					GLOBAL.ASSETS.GAME.btn_snd.enabled=false;
					GLOBAL.ASSETS.GAME.btn_no_snd.sprite.setVisible(true);
					GLOBAL.ASSETS.GAME.btn_snd.sprite.setVisible(false);
					cc.audioEngine.setMusicVolume(0);
					cc.audioEngine.setEffectsVolume(0);
					vol=0;
					break;
				case "btn_no_snd":
					GLOBAL.ASSETS.GAME.btn_no_snd.enabled=false;
					GLOBAL.ASSETS.GAME.btn_snd.enabled=true;
					GLOBAL.ASSETS.GAME.btn_no_snd.sprite.setVisible(false);
					GLOBAL.ASSETS.GAME.btn_snd.sprite.setVisible(true);
					cc.audioEngine.setMusicVolume(1);
					cc.audioEngine.setEffectsVolume(1);
					vol=1;
					break;
				case "btn_sel_0":
					select_bot(0);
					break;
				case "btn_sel_1":
					select_bot(1);
					break;
				case "btn_sel_2":
					select_bot(2);
					break;
				case "btn_sel_3":
					select_bot(3);
					break;
				case "btn_sel_4":
					select_bot(4);
					break;
				case "btn_sel_5":
					select_bot(5);
					break;
				case "btn_sel_6":
					select_bot(6);
					break;
				case "btn_sel_7":
					select_bot(7);
					break;
					
				case "btn_selCoins_0":
					 hide_shopCoins();
					 show_shop();
					break;
				case "btn_selCoins_1":
					gotoCGV();
					break;
				case "btn_selCoins_2":
					show_msg((GLOBAL.STRINGS.get_str("lng_15").replace("&", "" + coinsPackInfo[0].amount)).replace("%" , "" + coinsPackInfo[0].price),
							function(){
							idPurchase = 2;
							toBuyGoods();
							},
							function(){show_shopCoins();},null);
					hide_shopCoins();
					break;
				case "btn_selCoins_3":
					show_msg((GLOBAL.STRINGS.get_str("lng_15").replace("&", "" + coinsPackInfo[1].amount)).replace("%" , "" + coinsPackInfo[1].price),
							function(){
							idPurchase = 3;
							toBuyGoods();
							},
							function(){show_shopCoins();},null);
					hide_shopCoins();
					break;
				case "btn_selCoins_4":
					show_msg((GLOBAL.STRINGS.get_str("lng_15").replace("&", "" + coinsPackInfo[2].amount)).replace("%" , "" + coinsPackInfo[2].price),
							function(){
							idPurchase = 4;
							toBuyGoods();},
							function(){show_shopCoins();},null);
					hide_shopCoins();
					break;
				case "btn_selCoins_5":
					show_msg((GLOBAL.STRINGS.get_str("lng_15").replace("&", "" + coinsPackInfo[3].amount)).replace("%" , "" + coinsPackInfo[3].price),
							function(){
							idPurchase = 5;
							toBuyGoods();
							},
							function(){show_shopCoins();},null);
					hide_shopCoins();
					
					break;
				case "btn_selCoins_6":
					 hide_shopCoins();
					 show_shop();
					break;
				case "btn_add_money":
					show_msg(GLOBAL.STRINGS.get_str("lng_4")+GLOBAL.MONETIZATION.num_buy_money,function(){},function(){},null,"?","",GLOBAL.MONETIZATION.buy_money);
					break;
				}
			}
		}else if ((act=="touch_ended")&&(here.MSG)&&(GLOBAL.ASSETS.GAME.message_box.sprite.isVisible()))
		{
			switch (wnd)
			{
			case "GAME":
				switch (el)
				{
				case "btn_y":
					on_y();
					hide_msg()
					break;
				case "btn_n":
					on_f=null;
					on_c=null;
					on_n();
					hide_msg()
					break;
				}
			}
		}
	}
	
	here.verify_volume=function()
	{
		setTimeout("GLOBAL.APP.verify_volume()", 500);
		if(document.hidden || document.webkitHidden || document.msHidden)
		{  
			if (vol==1)
			{
				cc.audioEngine.setMusicVolume(0);
				cc.audioEngine.setEffectsVolume(0);
				vol=0;
			}
		}else
		{
			if (GLOBAL.ASSETS.GAME.btn_snd.enabled)
			{
				if (vol==0)
				{
					cc.audioEngine.setMusicVolume(1);
					cc.audioEngine.setEffectsVolume(1);
					vol=1;
				}
			}
		}
	}
	
	here.UPDATE=function(tk)
	{
		scale_val+=tk*scale_sign/3;
		if (scale_val<0.75)
			scale_val=1;
		
		GLOBAL.ASSETS.GAME.finger.sprite.setScale(scale_val,scale_val);
		GLOBAL.ACTION.update(tk);
		if (here.MSG)
			return;
		
		for (var i=0;i<particles.length;i++)
		{
			if ((particles[i]!=null)&&(particles[i].active))
			{
				if ((!here.RUN)&&(particles[i].dy!=0))
				{
					particles[i].dt=0;
				}
				
				particles[i].dt-=tk;

				if (particles[i].dt<=0)
				{
					GLOBAL.CONTAINER.free(particles[i]);
					particles[i]=null;
				}else
				{
					var p=particles[i].dt/particles[i].life;
					particles[i].sprite.setScale(p,p);
					particles[i].sprite.setPositionY(particles[i].sprite.getPositionY()+particles[i].dy*tk);
				}
			}
		}
		
		if (!here.RUN)
			return;
		
		if(!is_crush)
		{
			speed-=tk*(start_speed-max_speed*(1+current_boat*GLOBAL.MONETIZATION.speed_decrease_characters))/3;
			if (speed<max_speed*(1+current_boat*GLOBAL.MONETIZATION.speed_decrease_characters))
				speed=max_speed*(1+current_boat*GLOBAL.MONETIZATION.speed_decrease_characters);
			current_pos+=tk*GLOBAL.SCREEN.HEIGHT/speed;
		}else
		{
			if(speed<200)
				speed+=tk*10;
				
			speed_fall*=0.9;
			boat_pos_fall+=tk*GLOBAL.SCREEN.HEIGHT/speed;
			boat_pos-=tk*GLOBAL.SCREEN.HEIGHT/speed_fall;
		}
		
		if (!GLOBAL.SCREEN.IS_MOBILE)
		{
			var c=colorB.g+128*tk;
			if (c>255)
				c=255;
			colorB.g=c;
		
			GLOBAL.ASSETS.GAME.back.sprite.setColor(colorB);
		}

		while (current_pos>deltaY)
		{
			current_pos-=deltaY;
			add_map();
			start_visible--;
			if (start_visible<0)
				start_visible=0;
		}
		
		draw_map(current_pos/deltaY);
		platform.setPosition(0,-current_pos);
		money.setPosition(0,-current_pos);
		
		var nx=get_position(current_pos);
		if (is_crush)
			nx=get_position(boat_pos_fall);
		
		var prog=Math.abs(nx-px);

		if (napr==1)
		{
			br.setVisible(true);
			bl.setVisible(false);
		}else
		{
			prog=-prog;
			br.setVisible(false);
			bl.setVisible(true);
		}

		if (first)
		{
			if(((get_position(current_pos+1)>nx)&&(napr==-1))||((get_position(current_pos+1)<=nx)&&(napr==1)))
			{
				GLOBAL.ASSETS.GAME.help.sprite.setVisible(true);
				here.MSG=true;
			}
		}

		if (is_crush)
		{
			boat.setPosition(boat.getPositionX()+prog,currentH+boat_pos);
			if (currentH+boat_pos+GLOBAL.ASSETS.GAME.l_0.uni_height<0)
				before_finish();
		}else
			boat.setPosition(boat.getPositionX()+prog,currentH);
		//boat.setPosition(get_position(current_pos),currentH);
		GLOBAL.ASSETS.GAME.light.sprite.setPosition(boat.getPositionX()+prog,currentH);
		px=nx;
		
		if (!is_crush)
			if (Math.random()>0.5)
				add_path(boat.getPositionX(),currentH);
		
		for (i=0;i<money_stack.length;i++)
		{
			if ((money_stack[i]!=null)&&(money_stack[i].active))
			{
				if (money_stack[i].index==null)
				{
					money_stack[i].dt-=tk;
	
					if (money_stack[i].dt<=0)
					{
						GLOBAL.CONTAINER.free(money_stack[i]);
						money_stack[i]=null;
					}else
					{
						var p=money_stack[i].dt/money_stack[i].life;
						var x=money_stack[i].sx+(targetX-money_stack[i].sx)*(1-p)*(1-p);
						var y=money_stack[i].sy+(targetY-money_stack[i].sy)*Math.sqrt(1-p)+current_pos;
						money_stack[i].sprite.setPosition(x,y);
						money_stack[i].sprite.setScale(p,p);
						add_particle(x,y-current_pos);
					}
				}else
				{
					var x=money_stack[i].sprite.getPositionX();
					var y=money_stack[i].sprite.getPositionY()-current_pos;
					
					var dx=x-boat.getPositionX();
					var dy=y-boat.getPositionY();
					if (Math.sqrt(dx*dx+dy*dy)<10)
					{
						here.add_money(GLOBAL.MONETIZATION.coin_cost);
						if (first_play)
							cc.audioEngine.playEffect(res.bell);
						money_stack[i].index=null;
						money_stack[i].dt=1.8;
						money_stack[i].life=1.8;
						money_stack[i].sx=x;
						money_stack[i].sy=y;
						if (!GLOBAL.SCREEN.IS_MOBILE)
							colorB.g=128;
						add_light(x,y);
					}
				}
			}
		}
		if ((!is_crush)&&(Math.abs(boat.getPositionX()-px)>deltaX))
			fall_finish();
	}
}
var coinsPackInfo = [];
function onBuySuccess(goodsId, isOnResume)
{
	  console.log("buy Success " + goodsId);
 switch(goodsId){
 	case 1:
 		break;
 	case 2:
		GLOBAL.APP.add_money(coinsPackInfo[0].amount);
 		GLOBAL.APP.save();
 		break;
 	case 3:
		GLOBAL.APP.add_money(coinsPackInfo[1].amount);
 		GLOBAL.APP.save();
 
 		break;
 	case 4:
		GLOBAL.APP.add_money(coinsPackInfo[2].amount);
 		GLOBAL.APP.save();
 		break;
 	case 5:
 		GLOBAL.APP.add_money(coinsPackInfo[3].amount);
 		GLOBAL.APP.save();
 		
 		break;
 }

 console.log("buy Success");
 GLOBAL.APP.show_msgFinal(GLOBAL.STRINGS.get_str("lng_17"),null,null,null);
 
}

function onBuyError(goodsId, insufficientCredit, isOnResume){
	   
    var msj = "";
  
   if(insufficientCredit == 0){
   	msj = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture.";
   } else {
   	msj = "Votre achat n'a pu être effectué car le crédit de votre compte est insuffisant.";
   }
  
   console.log("buy Failed");
   GLOBAL.APP.show_msgFinal(msj,null,null,null);
	
}
