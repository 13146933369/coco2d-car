var GuideScene = cc.Scene.extend({

    _ui : null,
    ctor : function(){
        this._super()
        this._ui = new GameGuideUI(this)
        this.addChild(this._ui)

        return true
    },
    onEnterGame : function(){
        $(".page-1").css("background-image" , "")
        $(".page-1").css("background-color" , "#6ec3fe")
        cc.director.runScene(new GameScene())
        //cc.director.runScene(new cc.TransitionFade(0.5 , new GameScene()))
    },
  
})