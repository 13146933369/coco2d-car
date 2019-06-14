var GameScene = cc.Scene.extend({
    _background : null,

    ctor : function(){
        this._super();
        var winSize = cc.director.getWinSize();
        var layer = new cc.Layer();
        this.addChild(layer)
        this._background = new GameBackground();
        layer.addChild(this._background)
    }


})