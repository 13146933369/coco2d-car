var SuccessOverUI = cc.Layer.extend({

    _gameScene:null,
  
    ctor:function(gameScene){
        this._super();
        this._gameScene = gameScene;

        var winSize = cc.director.getWinSize();
        var bg = new cc.Sprite(res.success);
        this.addChild(bg);
        bg.x = winSize.width/2
        bg.y = winSize.height/2


        // 按钮的位置
        var replayBtn = new cc.MenuItemImage( res.sagain, res.sagain, this._replay.bind(this));
        replayBtn.x = - replayBtn.width/2 -20
        
        var lottoBtn = new cc.MenuItemImage(res.slotto , res.slotto , this._lottery , this);
        lottoBtn.x = lottoBtn.width/2 + 20

        var menu = new cc.Menu(replayBtn, lottoBtn);
        this.addChild(menu);
        menu.y = 288;
        menu.x = winSize.width/2 
    },
    
    _replay:function(){
        $(".page-1").css("background-image" , "")
        $(".page-1").css("background-color" , "#6ec3fe")
        this._gameScene.init();
    },

    _lottery:function(){
        $(".page-1").css("background-color" , "")
        $(".page-1").css("background-image" , "url(./cart/res/graphics/pagebg.jpg)")
        cc.director.runScene(new MenuScene());
        $(".page-1").hide()
        $(".page-2").show()
    },

})