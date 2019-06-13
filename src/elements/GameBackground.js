var GameBackground = cc.Layer.extend({
    _bg1 : null,
    _bg2 : null,
    _bg3 : null,
    speed : 5, 
    ctor : function(){
        this._super();
        this.scheduleUpdate();
        var buildParallax = function(texture){
            var layer = new cc.Layer();
            var bg1 = new cc.Sprite(texture)
            bg1.x = bg1.width/2;
            bg1.y = bg1.height/2;
            layer.addChild(bg1)

            var bg2 = new cc.Sprite(texture)
            bg2.x = bg2.width/2;
            bg2.y = bg2.height/2 + bg2.height;
            layer.addChild(bg2)
            return layer
        }
        this._bg1 = buildParallax(res.bg1)
        this.addChild(this._bg1)

        this._bg2 = buildParallax(res.bg2)
        this.addChild(this._bg2)

        this._bg3 = buildParallax(res.bg3)
        this.addChild(this._bg3)

        return true
    },        
    update : function(){

        var winSize = cc.director.getWinSize();
        this._bg1.y -= Math.ceil(this.speed*0.05) 
        if(this._bg1.y < -parseInt(winSize.height)){
            this._bg1.y = 0
        }
        this._bg2.y -= Math.ceil(this.speed*0.5)
        if(this._bg2.y < -parseInt(winSize.height)){
            this._bg2.y = 0
        }
        this._bg3.y -= Math.ceil(this.speed*0.5)
        if(this._bg3.y < -parseInt(winSize.height)){
            this._bg3.y = 0
        }

    }



})