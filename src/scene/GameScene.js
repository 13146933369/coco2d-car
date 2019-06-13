var GameScene = cc.Scene.extend({

    _background : null,
    _cartHero : null,
    _touchX : null,
    itemLayer : null,
    _obstacleManager : null,
    _successUI : null,
    _loseUI : null,
    _ItemManager : null,
    _superEffect : null,
    _speedEffect : null,
    _timeShow : null,
    _ui : null,
    _loop : false,
    _flag : false,
    _gui : null,
    _count : null,
    _boomEffect : null,
    _bj : null,

    ctor : function(){

        this._super();
        var winSize = cc.director.getWinSize();
        var layer = new cc.Layer();
        this.addChild(layer)
        this._background = new GameBackground();
        layer.addChild(this._background)

        this.itemLayer = new cc.Layer()
        this.addChild(this.itemLayer);

        this._cartHero = new CartHero();
        this.addChild(this._cartHero)

        // 结束效果ui
        this._bj = new FinishUI();
        this.addChild(this._bj)

        this._ui = new GameSceneUI()
        this.addChild(this._ui)
        this._ui.update()

        this._timeShow = new cc.Sprite(res.time3)
        this.addChild(this._timeShow)
        this._timeShow.x = winSize.width/2
        this._timeShow.y = 686

        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({event : cc.EventListener.TOUCH_ALL_AT_ONCE , onTouchesMoved : this._onTouchMoved.bind(this)},this)
        }else{
            cc.eventManager.addListener({event: cc.EventListener.MOUSE, onMouseMove: this._onMouseMove.bind(this)}, this);
        }

        this._obstacleManager = new ObstacleManager(this);
        this._ItemManager = new ItemManager(this)//ItemManager

        this.init();

        return true;
    },
    _onTouchMoved : function(touches , event){
        if(Game.gameState != GameConst.GAME_STATE_OVER){

            this._touchX = touches[0].getLocation().x;
        }
    },
    _onMouseMove : function(event){
        if(Game.gameState != GameConst.GAME_STATE_OVER){
            this._touchX = event.getLocationX();
        }
    },

    init : function(){

        var winSize = cc.director.getWinSize();

        this._ui.init();
        this._bj.init();

        this._timeShow.setTexture(res.time3)
        if(!this._timeShow.isVisible()){
            this._timeShow.setVisible(true);
        }
        if(this._successUI)
            this._successUI.setVisible(false);
        if(this._loseUI){
            this._loseUI.setVisible(false);
            this._loseUI.init()
        }


        Game.user.lives = GameConst.HERO_LIVES;
        Game.user.score = Game.user.distance = 0;
        Game.gameState = GameConst.GAME_STATE_IDLE;
        Game.user.heroSpeed = this._background.speed = 0;
        Game.user.time = 60
        this._count = 3;
        this._loop = true
        this._flag = true
        this._cartHero.x = winSize.width/2
        this._cartHero.y = -winSize.height/2
        this._touchX = winSize.width/2
        this._obstacleManager.init()
        this._ItemManager.init()
        this._ui.update()
        this.stopSuperEffect()
        // this.stopSpeedEffect()
        this.scheduleUpdate();
    },
    update : function(elapsed){

        var winSize = cc.director.getWinSize();
        switch(Game.gameState){

            case GameConst.GAME_STATE_IDLE :

                if(this._cartHero.y < winSize.height*0.5*0.5){
                    //this._cartHero.x -= (this._cartHero.x - this._touchX) * 0.1
                    this._cartHero.y += ((winSize.height*0.5*0.5+10) - this._cartHero.y)*0.05
                }else{
                    Game.gameState = GameConst.GAME_STATE_READY
                }
                break;
            case GameConst.GAME_STATE_READY :
                if(this._flag){
                    this._flag = false
                    this.schedule(this.readyGo , 1)
                }
                this._touchX = winSize.width/2;
                break;
            case GameConst.GAME_STATE_FLYING:

                if(this._loop){
                    this._loop = false
                    this.schedule(this.reduceTime , 1)
                }
                //================================特效层===============================
                if(Game.user.superFood > 0){
                    Game.user.superFood -= elapsed;
                }else{
                    //停止特效
                    this.stopSuperEffect()
                }

                if(Game.user.speedFood > 0){
                    Game.user.heroSpeed += (GameConst.HERO_MAX_SPEED - Game.user.heroSpeed) * 0.2
                    Game.user.speedFood -= elapsed;
                }else{
                    //this.stopSpeedEffect()
                    //停止特效
                }

                //碰撞一瞬间没有办法移动
                if(Game.user.hitObstacle <= 0){

                    this._cartHero.x -= (this._cartHero.x - this._touchX) * 0.1
                    if(this._cartHero.x < 180){
                        this._cartHero.x = 180
                    }else if(this._cartHero.x > winSize.width - 180){
                        this._cartHero.x = winSize.width - 180
                    }
                    if(Game.user.heroSpeed > GameConst.HERO_MIN_SPEED + 100){
                        this._cartHero.toggleSpeed(true)
                    }else{
                        this._cartHero.toggleSpeed(false)
                    }

                }else{
                    //碰撞到物体的效果
                    Game.user.hitObstacle -- ;
                    this._shakeAnimation();
                }
                Game.user.heroSpeed -= (Game.user.heroSpeed - GameConst.HERO_MIN_SPEED) * 0.01;

                this._background.speed = Game.user.heroSpeed * elapsed
                this._obstacleManager.update(this._cartHero, elapsed);
                this._ItemManager.update(this._cartHero, elapsed);
                Game.user.distance += (Game.user.heroSpeed*elapsed)*0.1
                this._ui.update()

                // ------------------------------------------------------------------------------

                if(Game.user.distance >= GameConst.DISTANCE){
                    Game.user.distance = GameConst.DISTANCE
                    this.endGame()
                }

                break;

            case GameConst.GAME_STATE_OVER:

                this._ui.update()
                this._obstacleManager.removeAll();
                this._ItemManager.removeAll();
                this._cartHero.toggleSpeed(false)
                this.stopSuperEffect()
                //this.stopSpeedEffect()

                this._background.speed = Game.user.heroSpeed = 0;
                this._cartHero.x += (winSize.width/2 - this._cartHero.x) * 0.02

                if(Game.user.distance >= GameConst.DISTANCE){

                    this._bj.showFinish();
                }
                if(this._cartHero.y < 690){
                    this._cartHero.y += (700 - this._cartHero.y ) * 0.02
                }else{
                    this._gameOver();
                    this.unscheduleUpdate();
                }
                break;
        }
        //console.log(Game.user.lives)
    },
    endGame : function(){
        this.x = 0;
        this.y = 0;
        Game.gameState = GameConst.GAME_STATE_OVER;

    },
    _gameOver:function(){
        console.log(Game.user.distance)
        if(Game.user.distance >= GameConst.DISTANCE){
            if(!this._successUI){
                this._successUI = new SuccessOverUI(this);
                this.addChild(this._successUI);
            }
            this._successUI.setVisible(true);
            $(".page-1").css("background-color" , "")
            $(".page-1").css("background-image" , "url(./cart/res/graphics/pagebg.jpg)")
            if(userInfo.gameTimes>0){
                RequestUrl.postGame(function(data){

                    if(data.status == 10){
                        userInfo.alert("活动未开始！")
                        return
                    }else if(data.status == 11){
                        userInfo.alert("活动已经结束！")
                        return
                    }
                    if(data.status == "1010"){
                        userInfo.gameTimes = data.data.gameTimes

                    }else if(data.status == "1011"){
                        userInfo.gameTimes = 0
                    }
                })
            }
        }else{
            if(!this._loseUI){
                this._loseUI = new LoseOverUI(this);
                this.addChild(this._loseUI);
            }
            this._loseUI.setVisible(true);
            $(".page-1").css("background-image" , "")
            $(".page-1").css("background-color" , "#162733")
        }

    },
    showSuperEffect:function(){
       this._cartHero.suppperEffect();
    },
    stopSuperEffect:function(){
       this._cartHero.stopSuppperEffect();
    },
    showSpeedEffect:function(){
    },
    stopSpeedEffect:function(){
    },


    reduceTime : function(){
        if(Game.user.time<=0){
            Game.user.time = 0
            this.endGame();
            this.unschedule(this.reduceTime)
        }else{
            Game.user.time--
        }
    },
    readyGo : function(){

        console.log(this._count)
        this._count --;
        if(this._count == 2){
            this._timeShow.setTexture(res.time2)
        }else if(this._count == 1){
            this._timeShow.setTexture(res.time1)
        }else{
            this.unschedule(this.readyGo)
            this._count = 0
            this._timeShow.setVisible(false)
            this._ui.isStart();
            Game.gameState = GameConst.GAME_STATE_FLYING
        }

    },
    _shakeAnimation : function(){
        if(Game.user.hitObstacle > 0){
            this.x = parseInt(Math.random()*Game.user.hitObstacle-Game.user.hitObstacle * 0.5)
            this.y = parseInt(Math.random()*Game.user.hitObstacle-Game.user.hitObstacle * 0.5)
        }else if(this.x != 0){
            this.x = 0;
            this.y = 0;
        }
    },

})