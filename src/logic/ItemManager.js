var ItemManager = cc.Class.extend({

    _container : null,
    _gameScene : null,
    _itemsToAnimate : null,
    _patternChangeDistance: 0,
    _pattern: 0,
    _oldPattern : 0,
    _patternPosX: 0,
    _patternGap: 0,
    _patternGapCount: 0,
    _position : null,

    ctor : function(gameScene){
        this._container = gameScene.itemLayer;
        this._gameScene = gameScene;
        this._itemsToAnimate = new Array();
    },
    removeAll: function () {
        if (this._itemsToAnimate.length > 0) {
            for (var i = this._itemsToAnimate.length - 1; i >= 0; i--) {
                var item = this._itemsToAnimate[i];
                this._itemsToAnimate.splice(i, 1);
                cc.pool.putInPool(item);
                this._container.removeChild(item);
            }
        }
    },
    init: function () {
        
        this.removeAll();
        this._pattern = 0;
        this._patternPosX = cc.director.getWinSize().height - GameConst.GAME_AREA_TOP_BOTTOM;
   
        this._patternGap = 1200 + Math.ceil(Math.random()*1000); 
        this._patternGapCount = 0;
        this._patternChangeDistance = 3000;
        Game.user.speedFood = Game.user.superFood = 0;
    
    },

    update : function(cartHero , elapsed){
        this._createItem(elapsed);
        this._animateItems(cartHero , elapsed)
    },

    _createItem: function (elapsed) {

        //控制多少米之后出现 特效道具
        if (this._patternChangeDistance > 0) {
            this._patternChangeDistance -= Game.user.heroSpeed * elapsed;
           
        }else{
            this._patternChangeDistance = 0;
            this._setPosition()
            //出现次数的控制
            this._pattern = Math.ceil(Math.random()*2)
            // 控制频率
            if (this._patternGapCount < this._patternGap) {  // 0 < 20
                this._patternGapCount += Game.user.heroSpeed * elapsed*0.5;
            }else  { //if (this._pattern != 0)

                this._patternGapCount = 0;
                var winSize = cc.director.getWinSize();
                this._pattern = this._oldPattern == 1? 2:1;
               
                switch (this._pattern) {
                    case 1:
                       
                        var item = Item.create(1);
                        item.x = this._patternPosX
                        item.y = winSize.height + item.height
                        this._itemsToAnimate.push(item);
                        this._container.addChild(item, 2);
                        break;
                    case 2:
                       
                        var item = Item.create(2);
                        item.x = this._patternPosX
                        item.y = winSize.height + item.height
                        this._itemsToAnimate.push(item);
                        this._container.addChild(item, 2);
                        break;
                
                }
                this._oldPattern = this._pattern
            }
        }
    },
    _setPosition : function(){
        var ran = Math.random()
        var winSize =  cc.director.getWinSize();
        if( ran > 0.7){
            //后期 x 定死在右边的位置
            this._patternPosX = winSize.width - 180
            this._position = "right"
        }else if(ran > 0.4){    
            this._patternPosX =  winSize.width/2
            this._position = "middle"
        }else{
            //后期 x 定死在左边的位置
            this._patternPosX = 180
            this._position = "left"
        }
    },
    _animateItems: function (cartHero, elapsed) {
        var item;
        for (var i = this._itemsToAnimate.length - 1; i >= 0; i--) {
            item = this._itemsToAnimate[i];
            if (item) {

                item.y -= (Game.user.heroSpeed + GameConst.ITEM_VEl) * elapsed;
            
                if (item.y < -item.height/2 || Game.gameState == GameConst.GAME_STATE_OVER) {
                    this._itemsToAnimate.splice(i, 1);
                    cc.pool.putInPool(item);
                    this._container.removeChild(item);
                    continue;
                    
                } else {
                   
                    var heroItem_xDist =  Math.abs(item.x - cartHero.x);
                    var heroItem_yDist =  Math.abs(item.y - cartHero.y);
                    var xflag = heroItem_xDist < (cartHero.width/2 + item.width/2) 
                    var yflag = heroItem_yDist < (cartHero.height/2 + item.height/2) 

                    if (xflag && yflag) {
                        if (item.type == 1) {
                            Game.user.speedFood = 5;
                            //开启加速特效
                            //this._gameScene.showSpeedEffect()
                        }
                        else if (item.type == 2) {
                            //开启无敌特效
                            Game.user.superFood = 4;
                            this._gameScene.showSuperEffect()
                        }

                        this._itemsToAnimate.splice(i, 1);
                        cc.pool.putInPool(item);
                        this._container.removeChild(item);
                    }
                }
            }
        }
    }

})