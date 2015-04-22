GLOBAL.MONETIZATION=new function()
{
	var here=this;
	here.cost=[0,50,100,150,200,250,500,1000];
	here.record_cost=10;
	here.coin_cost=1;
	here.life_cost=25;
	here.num_buy_money=20;
	here.speed_decrease_characters=0.05;
	here.have_iap=false;
	var on_back=null;

	function incentiviseFinished(result) 
	{
		if(result) 
			GLOBAL.APP.show_msg(GLOBAL.STRINGS.get_str("lng_9")+GLOBAL.MONETIZATION.num_buy_money,function(){GLOBAL.APP.add_money(here.num_buy_money);GLOBAL.APP.save();},null,on_back," ",GLOBAL.STRINGS.get_str("lng_10"));
		else
			GLOBAL.APP.show_msg(GLOBAL.STRINGS.get_str("lng_12"),function(){},null,on_back,"",GLOBAL.STRINGS.get_str("lng_11"));
	}
	
	here.buy_money=function(fnc)
	{
		on_back=fnc;
		SG_Hooks.triggerIncentivise(incentiviseFinished)
	}

	here.start=function(score)
	{
		if (cc.sys.isNative)
		{
			GLOBAL.STRINGS.language="EN";
			switch(cc.sys.language)
			{
				case cc.sys.LANGUAGE_ENGLISH:
					GLOBAL.STRINGS.language="EN";
					break;
				case cc.sys.LANGUAGE_GERMAN:
					GLOBAL.STRINGS.language="DE";
					break;
				case cc.sys.LANGUAGE_SPANISH:
					GLOBAL.STRINGS.language="ES";
					break;
				case cc.sys.LANGUAGE_FRENCH:
					GLOBAL.STRINGS.language="FR";
					break;
				case cc.sys.LANGUAGE_ITALIAN:
					GLOBAL.STRINGS.language="IT";
					break;
				case cc.sys.LANGUAGE_PORTUGUESE:
					GLOBAL.STRINGS.language="PT";
					break;
				case cc.sys.LANGUAGE_RUSSIAN:
					GLOBAL.STRINGS.language="RU";
					break;
				case "tr":
					GLOBAL.STRINGS.language="TR";
					break;
				case "th":
					GLOBAL.STRINGS.language="TH";
					break;
				case "nl":
					GLOBAL.STRINGS.language="NL";
					break;
				case cc.sys.LANGUAGE_POLISH:
					GLOBAL.STRINGS.language="PL";
					break;
			}
			if (cc.sys.os==cc.sys.OS_ANDROID)
			{
				//var g_pAnalytics = plugin.PluginManager.getInstance().loadPlugin("AnalyticsFlurry");
			}
			
		}else 
		{
			function tmp(){window.scrollTo(0,1);};
			SG_Hooks.setOrientationHandler(tmp);
			SG_Hooks.setResizeHandler(tmp);
			SG_Hooks.start();
			GLOBAL.STRINGS.language= SG_Hooks.getLanguage(['en','de','es','fr','it','pt','ru','tr','th','nl','pl']).toUpperCase();
			here.have_iap= SG_Hooks.isEnabledIncentiviseButton();
		}
		
		//GLOBAL.ASSETS.GAME.btn_add_money.sprite.setVisible(here.have_iap);
	}

	here.on_finish=function(score)
	{
		if (!cc.sys.isNative)
			SG_Hooks.gameOver(0,score);
	}
}