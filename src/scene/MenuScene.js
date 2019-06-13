var MenuScene = cc.Scene.extend({
    ctor : function () {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer)

        // 创建首页的背景图
        var bgWel = new cc.Sprite(res.wel)
        console.log(bgWel)
        var winSize = cc.director.getWinSize()
        bgWel.x = winSize.width / 2
        bgWel.y = winSize.height / 2
        layer.addChild(bgWel)
    }


})