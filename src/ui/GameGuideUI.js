//游戏规则页
var GameGuideUI = cc.Layer.extend({
    _close  : null,
    _guideScene : null,
    _hand : null,
   ctor : function (guideScene) {
       this._super()
       this._guideScene = guideScene
       var winSize = cc.director.getWinSize();//获取屏幕的宽高
       var sprite = new cc.Sprite(res.guide)
       sprite.x = winSize.width/2
       sprite.y = winSize.height/2
       this.addChild(sprite)

       //手指示
       this._hand = new cc.Sprite(res.hand)
       this._hand.x = winSize.width/2 -100
       this._hand.y = 750
       this.addChild(this._hand)

        //关闭按钮
       this._close = new cc.MenuItemImage(res.close, res.close ,this._changeScene , this)
       this._close.x = winSize.width/2 + 210
       this._close.y = winSize.height - 140
       var menu = new cc.Menu( this._close);
       menu.x = menu.y = 0
       this.addChild(menu)

       if("touches" in cc.sys.capabilities){
           cc.eventManager.addListener({
               event : cc.EventListener.TOUCH_ONE_BY_ONE,
               onTouchBegan : this._onTouchBegan.bind(this),
               onTouchMoved : this._onTouchMoved.bind(this),
               onTouchEnded : this._onTouchEnded.bind(this),
               onTouchCancelled : this._onTouchCalled.bind(this)
           },this)
       }
       this.scheduleUpdate();
       return true
   },
    update:function () {
        var winSize = cc.director.getWinSize();
        var xcenter = winSize.width/2;
        if(this._hand.x >= xcenter + 100){
            this._hand.x = xcenter -100
        }else{
            this._hand.x += (xcenter + 110 - this._hand.x)*0.03
        }
    },


    _changeScene : function(){
        this._guideScene.onEnterGame();
    },
    _onTouchBegan : function(touch , event){
        this._guideScene.onEnterGame();
    },
    _onTouchMoved : function(touch , event){
        console.log("_onTouchMoved")
    },
    _onTouchEnded : function(touch , event){
        console.log("_onTouchEnded")
    },
    _onTouchCalled : function(touch , event){
        console.log("_onTouchCalled")
    },


})