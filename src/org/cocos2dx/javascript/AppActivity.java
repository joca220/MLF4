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

import android.content.pm.ActivityInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;

import com.jirbo.adcolony.AdColony;
import com.jirbo.adcolony.AdColonyAd;
import com.jirbo.adcolony.AdColonyAdAvailabilityListener;
import com.jirbo.adcolony.AdColonyAdListener;
import com.jirbo.adcolony.AdColonyV4VCAd;
import com.jirbo.adcolony.AdColonyVideoAd;


// The name of .so is specified in AndroidMenifest.xml. NativityActivity will load it automatically for you.
// You can use "System.loadLibrary()" to load other .so files.

public class AppActivity extends Cocos2dxActivity implements AdColonyAdListener, AdColonyAdAvailabilityListener{

    static String hostIPAdress = "0.0.0.0";
    private static AppActivity app = null;
    static boolean giveMoney = false;

	/*final static String APP_ID  = "app60800739de7744f691";
	final static String ZONE_ID = "vzce2bcb9b71454d5b91";
	final static String ZONE_ID2 = "vz1bbd9c8d1493499193";// - 4VCV4 -v4vcabb26b8008ab44da9f
    final static String ZONE_ID3 = "vz4187bf0d88604d769f";*/
    
    
    // ID TEST
    final static String APP_ID  = "app185a7e71e1714831a49ec7";
    final static String ZONE_ID = "vz06e8c32a037749699e7050";
    final static String ZONE_ID2 = "vz1fd5a8b2bf6841a0a4b826";
    final static String ZONE_ID3 = "vz06e8c32a037749699e7050";
    
    
    // static EditText txtNombre;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	// TODO Auto-generated method stub
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.entercode);
        if(nativeIsLandScape()) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
        }
        if(nativeIsDebug()){
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        }
        hostIPAdress = getHostIpAddress();
        
        
        AdColony.configure( this, "version:1.0,store:google", APP_ID, ZONE_ID, ZONE_ID2, ZONE_ID3);
      	 
   	   AdColony.addAdAvailabilityListener(this);

   	    // Disable rotation if not on a tablet-sized device (note: not
   	    // necessary to use AdColony).
   	    if ( !AdColony.isTablet() )
   	    {
   	      setRequestedOrientation( ActivityInfo.SCREEN_ORIENTATION_PORTRAIT );
   	    }
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
    }
     
    @Override
    protected void onResume() 
    {
        super.onResume();
    }
    
    @Override
    public void onDestroy()
    {
    	super.onDestroy();
    }
    
   
    public static String gameLoaded(){
    	String info = "loaded";
    	giveMoney = false;
    	System.out.println("debe correr colony");
    	  AdColonyVideoAd ad = new AdColonyVideoAd( ZONE_ID ).withListener( app );
		 ad.show();
    	return info;
    }
    
    
    public static String gameLoaded3(){
    	String info = "loaded";
    	giveMoney = false;
    	System.out.println("debe correr colony");
    	  AdColonyVideoAd ad = new AdColonyVideoAd( ZONE_ID ).withListener( app );
		 ad.show();
    	return info;
    }
    public static String gameLoaded2(){
    	String info = "loaded";
    	giveMoney = true;
    	System.out.println("debe correr colony");
    	AdColonyV4VCAd v4vc_ad;
    	v4vc_ad = new AdColonyV4VCAd( ZONE_ID2 ).withListener( app );
    	v4vc_ad.show();
    	return info;
    }
    
    
    //Ad Started Callback - called only when an ad successfully starts playing
    public void onAdColonyAdStarted( AdColonyAd ad )
    {
  	Log.d("AdColony", "onAdColonyAdStarted");
    }

    //Ad Attempt Finished Callback - called at the end of any ad attempt - successful or not.
    public void onAdColonyAdAttemptFinished( AdColonyAd ad )
    {
  	// You can ping the AdColonyAd object here for more information:
  	// ad.shown() - returns true if the ad was successfully shown.
  	// ad.notShown() - returns true if the ad was not shown at all (i.e. if onAdColonyAdStarted was never triggered)
  	// ad.skipped() - returns true if the ad was skipped due to an interval play setting
  	// ad.canceled() - returns true if the ad was cancelled (either programmatically or by the user)
  	// ad.noFill() - returns true if the ad was not shown due to no ad fill.
  	  
      Log.d("AdColony", "onAdColonyAdAttemptFinished");
     if(ad.skipped() || ad.canceled() || ad.noFill()){
    	 return;
     }
      
      if(ad.shown() && giveMoney){
      app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
            	System.out.println("adcolony reward es: " + "ID_COLONYAD");
            	String evalStr = "onBuySuccess("+20+ "," + true +")";
         	   Cocos2dxJavascriptJavaBridge.evalString(evalStr);
            }
        });
      }
     
    }
    
    //Ad Availability Change Callback - update button text
    public void onAdColonyAdAvailabilityChange(boolean available, String zone_id) 
    {
    	//if (available) button_text_handler.post(button_text_runnable);
    	 Log.d("AdColony", "listo para cobrar");
    }
    
}
