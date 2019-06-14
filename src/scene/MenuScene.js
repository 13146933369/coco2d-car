var MenuScene = cc.Scene.extend({
    _playBtn : null, //游戏开始
    _aboutBtn : null,//游戏规则
    _prizeBtn : null,//游戏奖励
    _offsetX : 24,
    _offsetY : 24,
    ctor : function () {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer)

        // 创建首页的背景图
        var bgWel = new cc.Sprite(res.wel)
        var winSize = cc.director.getWinSize()
        bgWel.x = winSize.width / 2
        bgWel.y = winSize.height / 2
        layer.addChild(bgWel)

        // about 游戏规则
        this._aboutBtn = new cc.MenuItemImage(res.about, res.about ,this._about ,this)
        this._aboutBtn.x = GameConst.GAME_WIDTH - this._aboutBtn.width/2 - this._offsetX;
        this._aboutBtn.y = GameConst.GAME_HEIGHT - this._aboutBtn.height/2  - this._offsetY;



        //游戏奖励
        this._prizeBtn = new cc.MenuItemImage(res.prize, res.prize ,this._prize , this)
        this._prizeBtn.x = this._aboutBtn.x
        this._prizeBtn.y = this._aboutBtn.y - this._offsetY - this._aboutBtn.height;

        //游戏开始
        this._playBtn = new cc.MenuItemImage(res.play, res.play ,this._play , this)
        this._playBtn.x = winSize.width/2
        this._playBtn.y = 240

        //按钮渲染
        var menu= new cc.Menu(this._aboutBtn,this._prizeBtn,this._playBtn)
        layer.addChild(menu)
        menu.x = menu.y = 0


        layer.addChild(menu)
        this.scheduleUpdate();
        return true;
    },
        _about : function(){
            // if(!$(".rule-div").is(':hidden')){
            //     $(".rule-div").hide()
            // }else{
            //     $(".rule-div").show()
            // }
    },
    //游戏开始
    _play : function(){
        cc.director.runScene(new GuideScene())
    }


})