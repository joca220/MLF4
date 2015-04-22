GLOBAL.AVK.LOAD=function()
{
    for (var i=0;i<3;i++)
        cc.spriteFrameCache.addSpriteFrames(res["frame_"+(i+1)],res["pic_"+(i+1)]);


  
    
	GLOBAL.AVK.AVK_DOWN=function()
	{
		this.sprite = new cc.Sprite();

		GLOBAL.TMP.EL="game_btn_sel_0";
		this.game_btn_sel_0 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_0",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_0.sprite);
		GLOBAL.TMP.EL="game_btn_add_money";
		this.game_btn_add_money = new GLOBAL.AVK.AVK_SPR("down_game_btn_add_money",526,736,44,44,1);
		this.sprite.addChild(this.game_btn_add_money.sprite);
		GLOBAL.TMP.EL="game_btn_snd";
		this.game_btn_snd = new GLOBAL.AVK.AVK_SPR("down_game_btn_snd",272,829,44,44,1);
		this.sprite.addChild(this.game_btn_snd.sprite);
		GLOBAL.TMP.EL="game_btn_no_snd";
		this.game_btn_no_snd = new GLOBAL.AVK.AVK_SPR("down_game_btn_no_snd",272,829,44,44,1);
		this.sprite.addChild(this.game_btn_no_snd.sprite);
		GLOBAL.TMP.EL="game_btn_n";
		this.game_btn_n = new GLOBAL.AVK.AVK_SPR("down_game_btn_n",18,94,180,69,1);
		this.sprite.addChild(this.game_btn_n.sprite);
		GLOBAL.TMP.EL="game_btn_y";
		this.game_btn_y = new GLOBAL.AVK.AVK_SPR("down_game_btn_y",570,94,180,69,1);
		this.sprite.addChild(this.game_btn_y.sprite);
		GLOBAL.TMP.EL="game_btn_sel_1";
		this.game_btn_sel_1 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_1",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_1.sprite);
		GLOBAL.TMP.EL="game_btn_sel_2";
		this.game_btn_sel_2 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_2",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_2.sprite);
		GLOBAL.TMP.EL="game_btn_sel_3";
		this.game_btn_sel_3 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_3",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_3.sprite);
		GLOBAL.TMP.EL="game_btn_sel_4";
		this.game_btn_sel_4 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_4",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_4.sprite);
		GLOBAL.TMP.EL="game_btn_sel_5";
		this.game_btn_sel_5 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_5",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_5.sprite);
		GLOBAL.TMP.EL="game_btn_sel_6";
		this.game_btn_sel_6 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_6",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_6.sprite);
		GLOBAL.TMP.EL="game_btn_sel_7";
		this.game_btn_sel_7 = new GLOBAL.AVK.AVK_SPR("down_game_btn_sel_7",294,422,180,180,1);
		this.sprite.addChild(this.game_btn_sel_7.sprite);
	}

	GLOBAL.AVK.AVK_GAME=function()
	{
		this.sprite = new cc.Sprite();

		GLOBAL.TMP.EL="back";
		this.back = new GLOBAL.AVK.AVK_SPR("game_back",0,0,768,1024,1);
		this.sprite.addChild(this.back.sprite);
		GLOBAL.TMP.EL="place";
		this.place = new GLOBAL.AVK.AVK_SPR("",0,0,768,1024,1);
		this.sprite.addChild(this.place.sprite);
		GLOBAL.TMP.EL="light";
		this.light = new GLOBAL.AVK.AVK_SPR("game_light",14,221,768,859,1);
		this.sprite.addChild(this.light.sprite);
		GLOBAL.TMP.EL="mon_light";
		this.mon_light = new GLOBAL.AVK.AVK_SPR("game_mon_light",294,524,114,58,1);
		this.sprite.addChild(this.mon_light.sprite);
		GLOBAL.TMP.EL="path";
		this.path = new GLOBAL.AVK.AVK_SPR("game_path",350,361,29,15,1);
		this.sprite.addChild(this.path.sprite);
		GLOBAL.TMP.EL="particles";
		this.particles = new GLOBAL.AVK.AVK_SPR("",0,0,768,1024,1);
		this.sprite.addChild(this.particles.sprite);
		GLOBAL.TMP.EL="field";
		this.field = new GLOBAL.AVK.AVK_SPR("",0,0,768,1024,1);
		this.sprite.addChild(this.field.sprite);
		GLOBAL.TMP.EL="r_7";
		this.r_7 = new GLOBAL.AVK.AVK_SPR("game_r_7",320,654,28,31,1);
		this.sprite.addChild(this.r_7.sprite);
		GLOBAL.TMP.EL="l_7";
		this.l_7 = new GLOBAL.AVK.AVK_SPR("game_l_7",320,654,28,31,1);
		this.sprite.addChild(this.l_7.sprite);
		GLOBAL.TMP.EL="r_6";
		this.r_6 = new GLOBAL.AVK.AVK_SPR("game_r_6",323,468,38,35,1);
		this.sprite.addChild(this.r_6.sprite);
		GLOBAL.TMP.EL="l_6";
		this.l_6 = new GLOBAL.AVK.AVK_SPR("game_l_6",323,468,38,35,1);
		this.sprite.addChild(this.l_6.sprite);
		GLOBAL.TMP.EL="r_5";
		this.r_5 = new GLOBAL.AVK.AVK_SPR("game_r_5",322,469,40,34,1);
		this.sprite.addChild(this.r_5.sprite);
		GLOBAL.TMP.EL="l_5";
		this.l_5 = new GLOBAL.AVK.AVK_SPR("game_l_5",321,469,41,34,1);
		this.sprite.addChild(this.l_5.sprite);
		GLOBAL.TMP.EL="r_4";
		this.r_4 = new GLOBAL.AVK.AVK_SPR("game_r_4",339,432,35,41,1);
		this.sprite.addChild(this.r_4.sprite);
		GLOBAL.TMP.EL="l_4";
		this.l_4 = new GLOBAL.AVK.AVK_SPR("game_l_4",264,418,35,41,1);
		this.sprite.addChild(this.l_4.sprite);
		GLOBAL.TMP.EL="r_3";
		this.r_3 = new GLOBAL.AVK.AVK_SPR("game_r_3",363,494,41,37,1);
		this.sprite.addChild(this.r_3.sprite);
		GLOBAL.TMP.EL="l_3";
		this.l_3 = new GLOBAL.AVK.AVK_SPR("game_l_3",509,567,41,37,1);
		this.sprite.addChild(this.l_3.sprite);
		GLOBAL.TMP.EL="r_2";
		this.r_2 = new GLOBAL.AVK.AVK_SPR("game_r_2",482,492,46,32,1);
		this.sprite.addChild(this.r_2.sprite);
		GLOBAL.TMP.EL="l_2";
		this.l_2 = new GLOBAL.AVK.AVK_SPR("game_l_2",400,481,46,32,1);
		this.sprite.addChild(this.l_2.sprite);
		GLOBAL.TMP.EL="r_1";
		this.r_1 = new GLOBAL.AVK.AVK_SPR("game_r_1",408,376,49,41,1);
		this.sprite.addChild(this.r_1.sprite);
		GLOBAL.TMP.EL="l_1";
		this.l_1 = new GLOBAL.AVK.AVK_SPR("game_l_1",290,356,49,41,1);
		this.sprite.addChild(this.l_1.sprite);
		GLOBAL.TMP.EL="r_0";
		this.r_0 = new GLOBAL.AVK.AVK_SPR("game_r_0",457,622,52,38,1);
		this.sprite.addChild(this.r_0.sprite);
		GLOBAL.TMP.EL="l_0";
		this.l_0 = new GLOBAL.AVK.AVK_SPR("game_l_0",286,502,52,38,1);
		this.sprite.addChild(this.l_0.sprite);
		GLOBAL.TMP.EL="tmp";
		this.tmp = new GLOBAL.AVK.AVK_SPR("",320,319,128,385,1);
		this.sprite.addChild(this.tmp.sprite);
		GLOBAL.TMP.EL="money";
		this.money = new GLOBAL.AVK.AVK_SPR("game_money",337,539,14,16,1);
		this.sprite.addChild(this.money.sprite);
		GLOBAL.TMP.EL="money_part";
		this.money_part = new GLOBAL.AVK.AVK_SPR("game_money_part",307,516,7,8,1);
		this.sprite.addChild(this.money_part.sprite);
		GLOBAL.TMP.EL="block";
		this.block = new GLOBAL.AVK.AVK_SPR("game_block",320,319,128,385,1);
		this.sprite.addChild(this.block.sprite);
		GLOBAL.TMP.EL="txt_steps";
		this.txt_steps = new GLOBAL.AVK.AVK_TXT("",384,51,384,107,1);
		this.sprite.addChild(this.txt_steps.sprite);
		GLOBAL.TMP.EL="start";
		this.start = new GLOBAL.AVK.AVK_AVK_start("",0,0,768,1024,1);
		this.sprite.addChild(this.start.sprite);
		GLOBAL.TMP.EL="target";
		this.target = new GLOBAL.AVK.AVK_SPR("game_target",714,3,52,52,1);
		this.sprite.addChild(this.target.sprite);
		GLOBAL.TMP.EL="txt_money";
		this.txt_money = new GLOBAL.AVK.AVK_TXT("",714,12,10,39,1);
		this.sprite.addChild(this.txt_money.sprite);
		GLOBAL.TMP.EL="shop";
		this.shop = new GLOBAL.AVK.AVK_SPR("",0,0,768,1024,1);
		this.sprite.addChild(this.shop.sprite);
		GLOBAL.TMP.EL="selected";
		this.selected = new GLOBAL.AVK.AVK_SPR("game_selected",-2,638,196,196,1);
		this.sprite.addChild(this.selected.sprite);
		GLOBAL.TMP.EL="btn_sel_0";
		this.btn_sel_0 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_0",6,646,180,180,1);
		this.sprite.addChild(this.btn_sel_0.sprite);
		GLOBAL.TMP.EL="pic_0";
		this.pic_0 = new GLOBAL.AVK.AVK_SPR("game_pic_0",22,660,148,101,1);
		this.sprite.addChild(this.pic_0.sprite);
		GLOBAL.TMP.EL="btn_sel_1";
		this.btn_sel_1 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_1",198,646,180,180,1);
		this.sprite.addChild(this.btn_sel_1.sprite);
		GLOBAL.TMP.EL="price_1";
		this.price_1 = new GLOBAL.AVK.AVK_SPR("game_price_1",198,768,52,52,1);
		this.sprite.addChild(this.price_1.sprite);
		GLOBAL.TMP.EL="txt_price_1";
		this.txt_price_1 = new GLOBAL.AVK.AVK_TXT("",288,779,74,37,1);
		this.sprite.addChild(this.txt_price_1.sprite);
		GLOBAL.TMP.EL="pic_1";
		this.pic_1 = new GLOBAL.AVK.AVK_SPR("game_pic_1",219,653,138,115,1);// en los pic es lo que se debe reemplazar
		this.sprite.addChild(this.pic_1.sprite);
		GLOBAL.TMP.EL="btn_sel_2";
		this.btn_sel_2 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_2",390,646,180,180,1);
		this.sprite.addChild(this.btn_sel_2.sprite);
		
		GLOBAL.TMP.EL="pic_2";
		this.pic_2 = new GLOBAL.AVK.AVK_SPR("game_pic_2",419,670,128,77,1);
		this.sprite.addChild(this.pic_2.sprite);
		
		GLOBAL.TMP.EL="close_1";
		this.close_1 = new GLOBAL.AVK.AVK_SPR("game_close_1",198,646,180,180,1);
		this.sprite.addChild(this.close_1.sprite);
		GLOBAL.TMP.EL="price_2";
		this.price_2 = new GLOBAL.AVK.AVK_SPR("game_price_2",390,768,52,52,1);
		this.sprite.addChild(this.price_2.sprite);
		GLOBAL.TMP.EL="txt_price_2";
		this.txt_price_2 = new GLOBAL.AVK.AVK_TXT("",480,779,74,37,1);
		this.sprite.addChild(this.txt_price_2.sprite);
		GLOBAL.TMP.EL="close_2";
		this.close_2 = new GLOBAL.AVK.AVK_SPR("game_close_2",390,646,180,180,1);
		this.sprite.addChild(this.close_2.sprite);
		GLOBAL.TMP.EL="btn_sel_3";
		this.btn_sel_3 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_3",582,646,180,180,1);
		this.sprite.addChild(this.btn_sel_3.sprite);
		GLOBAL.TMP.EL="pic_3";
		this.pic_3 = new GLOBAL.AVK.AVK_SPR("game_pic_3",615,661,109,86,1);
		this.sprite.addChild(this.pic_3.sprite);
	
		GLOBAL.TMP.EL="price_3";
		this.price_3 = new GLOBAL.AVK.AVK_SPR("game_price_3",582,768,52,52,1);
		this.sprite.addChild(this.price_3.sprite);
		GLOBAL.TMP.EL="txt_price_3";
		this.txt_price_3 = new GLOBAL.AVK.AVK_TXT("",672,779,74,37,1);
		this.sprite.addChild(this.txt_price_3.sprite);
		GLOBAL.TMP.EL="close_3";
		this.close_3 = new GLOBAL.AVK.AVK_SPR("game_close_3",582,646,180,180,1);
		this.sprite.addChild(this.close_3.sprite);
		GLOBAL.TMP.EL="btn_sel_4";
		this.btn_sel_4 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_4",6,838,180,180,1);
		this.sprite.addChild(this.btn_sel_4.sprite);
		GLOBAL.TMP.EL="pic_4";
		this.pic_4 = new GLOBAL.AVK.AVK_SPR("game_pic_4",46,854,89,93,1);
		this.sprite.addChild(this.pic_4.sprite);
	
		GLOBAL.TMP.EL="price_4";
		this.price_4 = new GLOBAL.AVK.AVK_SPR("game_price_4",6,960,52,52,1);
		this.sprite.addChild(this.price_4.sprite);
		GLOBAL.TMP.EL="txt_price_4";
		this.txt_price_4 = new GLOBAL.AVK.AVK_TXT("",96,970,74,37,1);
		this.sprite.addChild(this.txt_price_4.sprite);
		GLOBAL.TMP.EL="close_4";
		this.close_4 = new GLOBAL.AVK.AVK_SPR("game_close_4",6,838,180,180,1);
		this.sprite.addChild(this.close_4.sprite);
		GLOBAL.TMP.EL="btn_sel_5";
		this.btn_sel_5 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_5",198,838,180,180,1);
		this.sprite.addChild(this.btn_sel_5.sprite);
		GLOBAL.TMP.EL="pic_5";
		this.pic_5 = new GLOBAL.AVK.AVK_SPR("game_pic_5",239,846,109,98,1);
		this.sprite.addChild(this.pic_5.sprite);
	
		GLOBAL.TMP.EL="price_5";
		this.price_5 = new GLOBAL.AVK.AVK_SPR("game_price_5",198,960,52,52,1);
		this.sprite.addChild(this.price_5.sprite);
		GLOBAL.TMP.EL="txt_price_5";
		this.txt_price_5 = new GLOBAL.AVK.AVK_TXT("",288,970,74,37,1);
		this.sprite.addChild(this.txt_price_5.sprite);
		GLOBAL.TMP.EL="close_5";
		this.close_5 = new GLOBAL.AVK.AVK_SPR("game_close_5",198,838,180,180,1);
		this.sprite.addChild(this.close_5.sprite);
		GLOBAL.TMP.EL="btn_sel_6";
		this.btn_sel_6 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_6",390,838,180,180,1);
		this.sprite.addChild(this.btn_sel_6.sprite);
		GLOBAL.TMP.EL="pic_6";
		this.pic_6 = new GLOBAL.AVK.AVK_SPR("game_pic_6",432,846,99,91,1);
		this.sprite.addChild(this.pic_6.sprite);
		GLOBAL.TMP.EL="price_6";
		this.price_6 = new GLOBAL.AVK.AVK_SPR("game_price_6",390,960,52,52,1);
		this.sprite.addChild(this.price_6.sprite);
		GLOBAL.TMP.EL="txt_price_6";
		this.txt_price_6 = new GLOBAL.AVK.AVK_TXT("",480,970,74,37,1);
		this.sprite.addChild(this.txt_price_6.sprite);
		GLOBAL.TMP.EL="close_6";
		this.close_6 = new GLOBAL.AVK.AVK_SPR("game_close_6",390,838,180,180,1);
		this.sprite.addChild(this.close_6.sprite);
		GLOBAL.TMP.EL="btn_sel_7";
		this.btn_sel_7 = new GLOBAL.AVK.AVK_BTN("game_btn_sel_7",582,838,180,180,1);
		this.sprite.addChild(this.btn_sel_7.sprite);
		GLOBAL.TMP.EL="pic_7";
		this.pic_7 = new GLOBAL.AVK.AVK_SPR("game_pic_7",636,856,71,71,1);
		this.sprite.addChild(this.pic_7.sprite);
		GLOBAL.TMP.EL="price_7";
		this.price_7 = new GLOBAL.AVK.AVK_SPR("game_price_7",582,960,52,52,1);
		this.sprite.addChild(this.price_7.sprite);
		GLOBAL.TMP.EL="txt_price_7";
		this.txt_price_7 = new GLOBAL.AVK.AVK_TXT("",672,970,74,37,1);
		this.sprite.addChild(this.txt_price_7.sprite);
		GLOBAL.TMP.EL="close_7";
		this.close_7 = new GLOBAL.AVK.AVK_SPR("game_close_7",582,838,180,180,1);
		this.sprite.addChild(this.close_7.sprite);
		GLOBAL.TMP.EL="message_box";
		this.message_box = new GLOBAL.AVK.AVK_SPR("game_message_box",0,360,768,270,1);//206 in height // 427 *** GLOBAL.SCREEN.HEIGHT-y-here.uni_height;
		this.sprite.addChild(this.message_box.sprite);
		GLOBAL.TMP.EL="btn_n";
		this.btn_n = new GLOBAL.AVK.AVK_BTN("game_btn_n",6,558,180,69,1);
		this.sprite.addChild(this.btn_n.sprite);
		GLOBAL.TMP.EL="btn_y";
		this.btn_y = new GLOBAL.AVK.AVK_BTN("game_btn_y",582,558,180,69,1);
		this.sprite.addChild(this.btn_y.sprite);
		GLOBAL.TMP.EL="txt_msg";
		this.txt_msg = new GLOBAL.AVK.AVK_TXT("",363,472,367,42,1); //all text size height = 37 before and posY = 472
		this.sprite.addChild(this.txt_msg.sprite);
		GLOBAL.TMP.EL="txt_msg_end";
		this.txt_msg_end = new GLOBAL.AVK.AVK_TXT("",363,472,367,42,1);
		this.sprite.addChild(this.txt_msg_end.sprite);
		GLOBAL.TMP.EL="txt_msg_s1";
		this.txt_msg_s1 = new GLOBAL.AVK.AVK_TXT("",363,496,367,42,1);
		this.sprite.addChild(this.txt_msg_s1.sprite);
		GLOBAL.TMP.EL="txt_msg_s0";
		this.txt_msg_s0 = new GLOBAL.AVK.AVK_TXT("",363,450,367,42,1);
		this.sprite.addChild(this.txt_msg_s0.sprite);
		GLOBAL.TMP.EL="txt_record";
		this.txt_record = new GLOBAL.AVK.AVK_TXT("",384,208,384,107,1);
		this.sprite.addChild(this.txt_record.sprite);
		GLOBAL.TMP.EL="btn_add_money";
		this.btn_add_money = new GLOBAL.AVK.AVK_BTN("game_btn_add_money",719,7,44,44,1);
		this.sprite.addChild(this.btn_add_money.sprite);
		GLOBAL.TMP.EL="btn_snd";
		this.btn_snd = new GLOBAL.AVK.AVK_BTN("game_btn_snd",6,7,44,44,1);
		this.sprite.addChild(this.btn_snd.sprite);
		GLOBAL.TMP.EL="btn_no_snd";
		this.btn_no_snd = new GLOBAL.AVK.AVK_BTN("game_btn_no_snd",6,7,44,44,1);
		this.sprite.addChild(this.btn_no_snd.sprite);
		GLOBAL.TMP.EL="help";
		this.help = new GLOBAL.AVK.AVK_SPR("",0,0,0,0,1);
		this.sprite.addChild(this.help.sprite);
		GLOBAL.TMP.EL="txt_help";
		this.txt_help = new GLOBAL.AVK.AVK_TXT("",384,903,384,37,1);
		this.sprite.addChild(this.txt_help.sprite);
		GLOBAL.TMP.EL="finger";
		this.finger = new GLOBAL.AVK.AVK_SPR("game_finger",334,747,86,119,1);
		this.sprite.addChild(this.finger.sprite);

		
	
		
		
		
		this.selected.set_parent(this.shop.sprite);
		this.btn_sel_0.set_parent(this.shop.sprite);
		this.pic_0.set_parent(this.btn_sel_0.sprite);
		this.btn_sel_1.set_parent(this.shop.sprite);
		this.price_1.set_parent(this.btn_sel_1.sprite);
		this.txt_price_1.set_parent(this.price_1.sprite);
		this.pic_1.set_parent(this.btn_sel_1.sprite);
		this.btn_sel_2.set_parent(this.shop.sprite);
		this.pic_2.set_parent(this.btn_sel_2.sprite);
		this.close_1.set_parent(this.btn_sel_1.sprite);
		this.price_2.set_parent(this.btn_sel_2.sprite);
		this.txt_price_2.set_parent(this.price_2.sprite);
		this.close_2.set_parent(this.btn_sel_2.sprite);
		this.btn_sel_3.set_parent(this.shop.sprite);
		this.pic_3.set_parent(this.btn_sel_3.sprite);
		this.price_3.set_parent(this.btn_sel_3.sprite);
		this.txt_price_3.set_parent(this.price_3.sprite);
		this.close_3.set_parent(this.btn_sel_3.sprite);
		this.btn_sel_4.set_parent(this.shop.sprite);
		this.pic_4.set_parent(this.btn_sel_4.sprite);
		this.price_4.set_parent(this.btn_sel_4.sprite);
		this.txt_price_4.set_parent(this.price_4.sprite);
		this.close_4.set_parent(this.btn_sel_4.sprite);
		this.btn_sel_5.set_parent(this.shop.sprite);
		this.pic_5.set_parent(this.btn_sel_5.sprite);
		this.price_5.set_parent(this.btn_sel_5.sprite);
		this.txt_price_5.set_parent(this.price_5.sprite);
		this.close_5.set_parent(this.btn_sel_5.sprite);
		this.btn_sel_6.set_parent(this.shop.sprite);
		this.pic_6.set_parent(this.btn_sel_6.sprite);
		this.price_6.set_parent(this.btn_sel_6.sprite);
		this.txt_price_6.set_parent(this.price_6.sprite);
		this.close_6.set_parent(this.btn_sel_6.sprite);
		this.btn_sel_7.set_parent(this.shop.sprite);
		this.pic_7.set_parent(this.btn_sel_7.sprite);
		this.price_7.set_parent(this.btn_sel_7.sprite);
		this.txt_price_7.set_parent(this.price_7.sprite);
		this.close_7.set_parent(this.btn_sel_7.sprite);
		this.btn_n.set_parent(this.message_box.sprite);
		this.btn_y.set_parent(this.message_box.sprite);
		this.txt_msg.set_parent(this.message_box.sprite);
		this.txt_msg_end.set_parent(this.message_box.sprite);
		this.txt_msg_s1.set_parent(this.message_box.sprite);
		this.txt_msg_s0.set_parent(this.message_box.sprite);
		this.txt_help.set_parent(this.help.sprite);
		this.finger.set_parent(this.help.sprite);
	}

	GLOBAL.AVK.AVK_AVK_start=function(pic,x,y,w,h,c)
    {
        var here=this;

        here.uni_width = w;
        here.uni_height = h;
        here.WND = GLOBAL.TMP.WND;
        here.EL = GLOBAL.TMP.EL;
        here.ID = GLOBAL.TMP.ID;

        var mem=[pic,x,y,w,h,c];
        this.make_copy = function()
        {
            GLOBAL.TMP.WND = here.WND;
            GLOBAL.TMP.EL = here.EL;
            GLOBAL.TMP.ID = here.ID+1;
            return new GLOBAL.AVK.AVK_AVK_start(mem[0],mem[1],mem[2],mem[3],mem[4],mem[5]);
        }

        if (pic=="")
            here.sprite = new cc.Sprite();
        else
        {
            here.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pic+".png"));
        }
        
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
		GLOBAL.TMP.EL="msg";
		this.msg = new GLOBAL.AVK.AVK_SPR("game_msg",0,0,768,1024,1);
		this.sprite.addChild(this.msg.sprite);
		GLOBAL.TMP.EL="txt_rec";
		this.txt_rec = new GLOBAL.AVK.AVK_TXT("",384,540,10,39,1);
		this.sprite.addChild(this.txt_rec.sprite);
		GLOBAL.TMP.EL="txt_start";
		this.txt_start = new GLOBAL.AVK.AVK_TXT("",384,461,384,63,1);
		this.sprite.addChild(this.txt_start.sprite);
		
		GLOBAL.TMP.EL="btn_saisir_code";
		this.btn_saisir_code = new GLOBAL.AVK.AVK_BTN("saisir_code",555,-128,184,135,1);
		this.sprite.addChild(this.btn_saisir_code.sprite);
   
    }

	GLOBAL.TMP.WND = "DOWN";
	GLOBAL.ASSETS.DOWN = new GLOBAL.AVK.AVK_DOWN();
	GLOBAL.TMP.WND = "GAME";
	GLOBAL.ASSETS.GAME = new GLOBAL.AVK.AVK_GAME();
	
	
	GLOBAL.DATA.AVK_DATA=function()
    {
        var here=this;
        here.LANGUAGE="TXT";
		this.gui=[{id:"GAME",element:"txt_help",val:"LNG_1"},{id:"GAME",element:"txt_speed",val:"LNG_2"},
		          {id:"GAME",element:"txt_time",val:"LNG_3"},{id:"GAME",element:"txt_finish",val:"LNG_4"},
		          {id:"GAME",element:"txt_stop",val:"LNG_5"},{id:"GAME",element:"txt_oil",val:"LNG_6"},
		          {id:"GAME",element:"txt_pok",val:"LNG_7"},{id:"MAIN",element:"txt_caption_credits",val:"LNG_8"},
		          {id:"MAIN",element:"txt_credits",val:"LNG_9"},{id:"GAME",element:"txt_start",val:"LNG_10"},
		          {id:"GAME",element:"txt_left",val:"LNG_11"},{id:"GAME",element:"txt_right",val:"LNG_12"},
		          {id:"GAME",element:"txt_help_pc",val:"LNG_13"},{id:"GAME",element:"txt_center",val:"LNG_14"}];
		this.gui.id = false;
		this.gui.element = false;
		this.gui.val = true;
		this.str=[];
		this.str.id = false;
		this.str.txt = true;
		this.relations=[];
		this.relations.id = false;
		this.relations.rel_id = false;

        this.LOCAL={LNG_1:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"TAP to turn left or right.\nPick up stars,bonuses\nand finish."},LNG_2:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"speedup"},LNG_3:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"add time"},LNG_4:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"finish"},LNG_5:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"stop"},LNG_6:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"oil"},LNG_7:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"tire"},LNG_8:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"MAIN",TXT:"Credits:"},LNG_9:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"MAIN",TXT:"\ncode: Alexey Kalygin\n\nart: M. Mil\n\nmusic: Vierarming (Ilia Volkov)\n\nqa: Mikle K."},LNG_10:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"GO !!!"},LNG_11:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"TAP to turn left"},LNG_12:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"TAP to turn right"},LNG_13:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"Use ARROW keys to control the\ncar. Pick up stars,bonuses\nand finish."},LNG_14:{SRC_TABLE:"GUI",SRC_FIELD:"VAL",SRC_ID:"GAME",TXT:"Please use ARROW keys to control the car"}};

        this.get = function(tbl,clmn,ind)
        {
            if (here[tbl][clmn])
            {
                return here.LOCAL[here[tbl][ind][clmn]][here.LANGUAGE];
            }else
            {
                return here[tbl][ind][clmn];
            }
        }

        this.filtered = function(tbl,clmn,ind,fclmn,f)
        {
            var cnt=0;
            for (var i=0; i<here[tbl].length;i++)
            {
                if (here[tbl][i][fclmn]==f)
                {
                    if (cnt==ind)
                        return that.get(tbl,clmn,i);
                    else cnt++;
                }
            }
            return null;
        }

        this.find = function(tbl,clmn,f)
        {
            for (var i=0; i<here[tbl].length;i++)
            {
                if (here[tbl][i][clmn]==f)
                {
                    return i;
                }
            }
            return -1;
        }
    }
    GLOBAL.DATA=new GLOBAL.DATA.AVK_DATA();
}