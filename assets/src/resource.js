var res = 
{
	pic_1:"res/images_1.png",
	frame_1:"res/images_1.plist", 
	pic_2:"res/images_2.png",
	frame_2:"res/images_2.plist",
	pic_3:"res/itemshoptiptap.png",
	frame_3:"res/itemshoptiptap.plist",
	bell:"res/bell.mp3",
	fail:"res/fail.mp3",
	finish:"res/finish.mp3",
	music:"res/music.mp3",
	logo:"res/logo.png"
};
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var GLOBAL={};

GLOBAL.TMP={};
GLOBAL.TMP.ID=0;

GLOBAL.AVK={};

GLOBAL.DATA={};

GLOBAL.ASSETS={};

GLOBAL.SCREEN={};
GLOBAL.SCREEN.WIDTH=768.0;
GLOBAL.SCREEN.HEIGHT=1024.0;