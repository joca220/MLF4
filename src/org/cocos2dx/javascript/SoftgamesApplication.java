package org.cocos2dx.javascript;


import android.app.Application;

import com.avk.tiptap.R;

import de.softgames.sdk.util.SGSettings;


public class SoftgamesApplication extends Application {
       
    @Override
    public void onCreate() {
        super.onCreate();
        
        SGSettings.initGAnalyticsTracker(getApplicationContext());
        /*
         * Init your app's entry point activity. This is the activity that you
         * want to be called when the app starts
         */
        SGSettings.setLauncherActivity(AppActivity.class);    

        /*
         * You can set with this method the teaser image that is going to be
         * displayed in the cross-promotion page. This image is relate to your game
         */
        SGSettings.setTeaserImage(getResources().getDrawable(R.drawable.teaser_image));
        
        /*
         * Set the name of the game.
         * */
        SGSettings.setGameName(getResources().getString(R.string.app_name));
        
    }
}
