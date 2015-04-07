/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.view.WindowManager;
import fr.pixtel.pxinapp.PXInapp;
import fr.pixtel.pxinapp.PXInappProduct;


// The name of .so is specified in AndroidMenifest.xml. NativityActivity will load it automatically for you.
// You can use "System.loadLibrary()" to load other .so files.

public class AppActivity extends Cocos2dxActivity implements PXInapp.PaymentCallback{

    static String hostIPAdress = "0.0.0.0";
    private static AppActivity app = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	// TODO Auto-generated method stub
        super.onCreate(savedInstanceState);
        
        if(nativeIsLandScape()) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
        }
        if(nativeIsDebug()){
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        }
        hostIPAdress = getHostIpAddress();
        
        PXInapp.create( this, "A024005229957220553164658470315538893739F7007FF", false );
        PXInapp.setPaymentCallback(this);
        app = this;
    }
    
    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        return glSurfaceView;
    }

    public String getHostIpAddress() {
        WifiManager wifiMgr = (WifiManager) getSystemService(WIFI_SERVICE);
        WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
        int ip = wifiInfo.getIpAddress();
        return ((ip & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF));
    }
    
    public static String getLocalIpAddress() {
        return hostIPAdress;
    }
    
    private static native boolean nativeIsLandScape();
    private static native boolean nativeIsDebug();
    
    @Override
    protected void onPause() 
    {
        super.onPause();
        PXInapp.pause();
    }
     
    @Override
    protected void onResume() 
    {
        super.onResume();
        PXInapp.resume();
    }
    
    @Override
    public void onDestroy()
    {
    	super.onDestroy();
    	PXInapp.destroy();
    }
    
    
    private final static int	LEVEL_UNLOCK		  	= 1;
   	private final static int	GAME_COINS1		  	    = 2;
   	private final static int	GAME_COINS2		  	    = 3;
   	private final static int	GAME_COINS3		  	    = 4;
   	private final static int	GAME_COINS4		  	    = 5;
   	
    public static String checkCoinsPackInfo()
    {
    	String info = "";
    	
    	PXInappProduct item = PXInapp.getInappProduct(GAME_COINS1);
		info += item.priceString + "&" + item.amount + "&";
		
    	item = PXInapp.getInappProduct(GAME_COINS2);
		info += item.priceString + "&" + item.amount + "&";
		
    	item = PXInapp.getInappProduct(GAME_COINS3);
		info += item.priceString + "&" + item.amount + "&";
		
    	item = PXInapp.getInappProduct(GAME_COINS4);
		info += item.priceString + "&" + item.amount;
		
    	return info;
    }
    
    public static void toBuyGoods(final int goodsId)
	{
		PXInapp.clearPayment(goodsId);	
		int result = PXInapp.initiatePayment(goodsId);
   		if(result >= 0){
   			//showAlertDialog("Purchasing", "Waiting...", false, false);
   		}else if (result<0){
   			String msgId = null;
    		switch(result){
	    		case PXInapp.RESULT_ALREADY_PURCHASED:
	    			//If it can be purchased again and again, it means ClearPayment() has not been called!
	    			app.onPayment(PXInapp.getInappProduct(goodsId), 1);
	    			break;
	    		case PXInapp.RESULT_PAYMENT_IN_PROGRESS:
	    			//msgId = "inProgress";
	    			break;
	    		case PXInapp.RESULT_ERROR_UNINITIALIZED_LIBRARY:
	    			msgId = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
	    			break;
	    		case PXInapp.RESULT_ERROR_BAD_INAPPPRODUCT:
	    			msgId = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
	    			break;
	    		case PXInapp.RESULT_FAILED:
	    			msgId = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
	    			break;
    		}
    		//final int res = -1;
    		if(msgId != null){
    			app.runOnGLThread(new Runnable() {
    	            @Override
    	            public void run() {
    	         	   Cocos2dxJavascriptJavaBridge.evalString("onBuyError("+ goodsId +"," + 0 + ")");
    	            }
    	        });
    		}
    	}
	}

    @Override
	public void onPayment(final PXInappProduct inappProduct,int result) 
	{
    	if (inappProduct==null)
			return;
    	result = 0;//buque 161.90,742.25,0.00,1,1,1.00,3,0,0 
		
    	/*if(!gameLoaded){
    		backupResult = result;
    		backupAppProduct = inappProduct;
    		System.out.println("Entro onPaymen y no cargo todo: " + inappProduct.id);
    		return;
    	}*/
    	
    	if (result<0)
		{
			String errMsg = "";
			boolean insuficcientCredit = false;
			switch (result)
			{
				case PXInapp.PAYMENT_ERROR:
					errMsg = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
					break;
				case PXInapp.PAYMENT_TIMEOUT:
					errMsg = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
					break;
				case PXInapp.PAYMENT_INSUFFICIENT_CREDIT:
					insuficcientCredit = true;
					errMsg = "Votre achat n'a pu être effectué car le crédit de votre compte est insuffisant.";
					break;
				case PXInapp.PAYMENT_OFFER_NOT_AVAILABLE:
					errMsg = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
					break;
				default:
					errMsg = "Votre achat n'a pas été validé. Vous étiez peut-être hors couverture, ou n'aviez pas suffisamment de crédit.";
			}
			
			final int option = (insuficcientCredit) ? 1 : 0;
			app.runOnGLThread(new Runnable() {
	            @Override
	            public void run() {
	               Cocos2dxJavascriptJavaBridge.evalString("onBuyError("+ inappProduct.id + "," + option + "," + false +")");
	            }
	        });
			
		}
		else
		{
			
			// mirar si se desbloquea un level entra en buySucess .. and mirar el id:
			app.runOnGLThread(new Runnable() {
	            @Override
	            public void run() {
	            	System.out.println("id de compra es: " + inappProduct.id);
	            	String evalStr = "onBuySuccess("+inappProduct.id + "," + false +")";
	            	Cocos2dxJavascriptJavaBridge.evalString(evalStr);
	            	//Cocos2dxJavascriptJavaBridge.evalString("console.log(\"JavaScript Java bridge!\")");
	            	
	            }
	        });
		}
	
	}
    
    public static int toEnterCode(final String code)
	{
    	int result = 0;
    	if (code.length() > 0) 
    		result = PXInapp.checkPaymentCode(code);
    	return result;
	}
    
    public static void gotoCGV()
	{
		//System.out.println("deberia abrir esto");
		Uri 	uri;
		Intent 	browser;
		String 	url = PXInapp.getUrl("CGV"); 
		if (url==null)
			return;
		
		browser 	= new Intent(Intent.ACTION_VIEW);
		uri 		= Uri.parse(url);
		browser.setData(uri);
		getContext().startActivity(browser);
	}
    
    public static String gameLoaded(){
    	String info = "loaded";
    	System.out.println("games is totally loaded");
    	return info;
    }
    
}
