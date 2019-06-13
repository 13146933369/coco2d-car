var LoseOverUI = cc.Layer.extend({

    _gameScene:null,
    _call : null,
    ctor:function(gameScene){
        this._super();
        this._gameScene = gameScene;

        var winSize = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0,0,0,200), winSize.width, winSize.height);
        this.addChild(bg);

        //招换朋友
        // this._call =  new cc.Sprite(res.callf)
        // this._call.x = 480
        // this._call.y = winSize.height - 24 - this._call.height/2
        // this.addChild(this._call)
        // this._call.setVisible(false)
        
        //背景的位置
        var sprite = new cc.Sprite(res.lAlert)
        sprite.x = winSize.width/2
        sprite.y = winSize.height/2 
        this.addChild(sprite)

        // 按钮的位置
        // var closeBtn = new cc.MenuItemImage( res.close , res.close , this._return.bind(this))
        // closeBtn.x = 215
        // closeBtn.y = 290

        var replayBtn = new cc.MenuItemImage( res.again, res.again, this._replay.bind(this));
        replayBtn.x = - replayBtn.width/2
        
        var friendBtn = new cc.MenuItemImage(res.friend, res.friend , this._return , this);
        friendBtn.x = friendBtn.width/2
        var menu = new cc.Menu(replayBtn, friendBtn );
        this.addChild(menu);

        menu.y = winSize.height/2 - 200;
        menu.x = winSize.width/2 

        var line = new cc.Sprite(res.line)
        this.addChild(line)
        line.x = winSize.width/2
        line.y = winSize.height/2 - 200
    },
    init : function(){
    //     if(this._call.isVisible()){
    //         this._call.setVisible(false)
    //    }
    },
    _replay:function(){
        $(".page-1").css("background-image" , "")
        $(".page-1").css("background-color" , "#6ec3fe")
        this._gameScene.init();
    },

    _callFriend:function(){
       
    //     if(!this._call.isVisible()){
    //         this._call.setVisible(true)
    //    }
    },

    _return:function(){
        $(".page-1").css("background-color" , "")
        $(".page-1").css("background-image" , "url(./cart/res/graphics/pagebg.jpg)")
        cc.director.runScene(new MenuScene());
    }    




})