var ObstacleManager = cc.Class.extend({

    _conttainer : null,
    _gameScene : null,
    _obstaclesToAnimate : null,
    _obstacleGapCount : 0,

    ctor : function(gameScene){

        this._gameScene = gameScene;
        this._conttainer = gameScene.itemLayer;
        this._obstaclesToAnimate = new Array();
    },

    init : function(){
        this.removeAll();
        Game.user.hitObstacle = 0
    },

    removeAll : function(){
        if(this._obstaclesToAnimate.length > 0){
            for( var i = this._obstaclesToAnimate.length - 1 ; i>=0 ; i--){
                var item = this._obstaclesToAnimate[i]
                this._obstaclesToAnimate.splice(i , 1)
                cc.pool.putInPool(item)
                this._conttainer.removeChild(item)
            }
        }
    },
    update : function(cartHero , elapsed){
        if(this._obstacleGapCount < GameConst.OBSTACLE_GAP){

            this._obstacleGapCount += Game.user.heroSpeed * elapsed

        }else if(this._obstacleGapCount != 0){
           
            this._obstacleGapCount = 0;
            this._createObstacle(Math.ceil(Math.random()*5), Math.random()*1000 + 900)
        }
        if(this._obstaclesToAnimate.length > 0){
            this._animateObstacles(cartHero , elapsed)
        }
    },
    _createObstacle : function(type , distance){
        var winSize = cc.director.getWinSize()
        var x = 0
        var y = winSize.height;
        var position = null
        var ran = Math.random();
        if( ran > 0.7){
            //后期 x 定死在右边的位置
            x = winSize.width - 180
            position = "right"
        }else if(ran > 0.4){    
            x =  winSize.width/2
            position = "middle"
        }else{
            //后期 x 定死在左边的位置
            x = 180
            position = "left"
        }

        var obstacle = Obstacle.create(type, position, GameConst.OBSTACLE_SPEED, distance);
        obstacle.x = x ;
        obstacle.y = y + obstacle.height/2;
       
        this._obstaclesToAnimate.push(obstacle)
        this._conttainer.addChild(obstacle)

    },
    _animateObstacles : function(cartHero , elapsed){

       var obstacle;
        for(var i = this._obstaclesToAnimate.length-1 ; i>= 0 ;i--){
          
            obstacle = this._obstaclesToAnimate[i]
            
            if(obstacle.distance > 0){
                obstacle.distance -= Game.user.heroSpeed*elapsed
            }else{
                obstacle.y -= (Game.user.heroSpeed + obstacle.speed) * elapsed
            }
            if(obstacle.y < - obstacle.height/2 || Game.gameState == GameConst.GAME_STATE_OVER){
                this._obstaclesToAnimate.splice(i , 1)
                cc.pool.putInPool(obstacle)
                this._conttainer.removeChild(obstacle)
                continue;
            }
            var heroObstacle_xDist = Math.abs(obstacle.x - cartHero.x)
            var heroObstacle_yDist = Math.abs(obstacle.y - cartHero.y)
            var xflag = heroObstacle_xDist < (cartHero.width/2 + obstacle.width/2) 
            var yflag = heroObstacle_yDist < (cartHero.height/2 + obstacle.height/2) 
            
            //碰撞检测   
            if(xflag&&yflag&& !obstacle.alreadyHit){

                if(Game.user.superFood > 0 || Game.user.speedFood > 0){

                    //加速 情况下 也会 损失生命  但是不会减速 其他特效 不减速 不损失生命
                    if(Game.user.superFood > 0 && Game.user.speedFood > 0){
                    }else if( Game.user.superFood > 0){
                    }else if( Game.user.speedFood > 0){
                        Game.user.hitObstacle = 30
                        Game.user.lives--;
                    }

                    obstacle.alreadyHit = true;
                    obstacle.crash();
                }else{
                    //没有任何特效 碰撞后 速度减半 生命降低  或者 加速状态
                    obstacle.alreadyHit = true;
                    obstacle.crash();
                    Game.user.hitObstacle = 30
                    Game.user.heroSpeed *= 0.5
                    Game.user.lives--;
                }
                if(Game.user.lives <= 0){
                    Game.user.lives = 0
                    this._gameScene.endGame();
                }
            }else{
               
            }
        }
    },
})