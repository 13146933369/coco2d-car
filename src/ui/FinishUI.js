var FinishUI = cc.Layer.extend({

    _bg : null,
    _flag : false,
   
    ctor : function(){

        this._super();
        var winSize = cc.director.getWinSize();
        this._bg = new cc.Layer();
        this.addChild(this._bg)

        var bj = new cc.Sprite(res.bj)
        bj.x = winSize.width/2;
        bj.y = winSize.height - bj.height/2;
        this._bg.addChild(bj)

        var finish = new cc.Sprite(res.finish)
        finish.x = winSize.width/2
        finish.y = 500
        this._bg.addChild(finish)
      
        return true
    },

    init : function(){
        this._flag = true
        var winSize = cc.director.getWinSize();
        this._bg.y = winSize.height/2
        this._bg.x = 0
        if(this._bg.isVisible()){
            this._bg.setVisible(false)
        }
    },

    showFinish : function(){
        if(!this._bg.isVisible()){
            this._bg.setVisible(true)
        }
        
        var action = cc.moveTo(2.5 , cc.p(this._bg.x , 0))
        if(this._flag){
            // $(".page-1").css("background-color" , "")
            // $(".page-1").css("background-image" , "url(./cart/res/graphics/pagebg.jpg)")
            this._flag = false;
            this._bg.runAction(action)
        }
    }



})