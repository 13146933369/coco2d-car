var GameSceneUI = cc.Layer.extend({

    //_lifeText : null,
    _distanceText : null,
    _timeText : null,
    _gLayer : null,
    _xin1 : null,
    _xin2 : null,
    _xin3 : null,
    ctor : function(){
        this._super()

        var winSize = cc.director.getWinSize();
        
        var dsprite  = new cc.Sprite(res.title)
        var h = 24 + dsprite.height/2
        var w = dsprite.width/2 + 24

        dsprite.x = 24 + dsprite.width/2
        dsprite.y = winSize.height - h
        var tsprite  = new cc.Sprite(res.title)
        tsprite.x = winSize.width -(24 + dsprite.width/2)
        tsprite.y = winSize.height - h

        var lsprite  = new cc.Sprite(res.title)
        lsprite.x = winSize.width/2
        lsprite.y = winSize.height - h

        this.addChild(dsprite)
        this.addChild(tsprite)
        this.addChild(lsprite)

        // this._lifeText = new cc.LabelTTF("0" , "Arial" , 30)
        // this.addChild(this._lifeText)
        // this._lifeText.x = winSize.width/2
        // this._lifeText.y = winSize.height - h

        this._distanceText = new cc.LabelTTF("9km" , "Arial" , 30)
        this.addChild(this._distanceText)
        this._distanceText.x = w
        this._distanceText.y = winSize.height - h

        this._timeText = new cc.LabelTTF("00:30" , "Arial" , 30)
        this.addChild(this._timeText)
        this._timeText.x =  winSize.width - w
        this._timeText.y = winSize.height - h
        // var pauseButton = new cc.MenuItemImage(res.pause , res.pause ,this._pauseResume)
        // var menu = new cc.Menu(pauseButton)
        // menu.alignItemsHorizontallyWithPadding(30)
        // menu.x = 200;
        // menu.y = winSize.height - 45;
        // this.addChild(menu)
        this._gLayer  = new cc.Layer();
        this.addChild(this._gLayer)
        // var left = new cc.Sprite(res.left)
        // this._gLayer.addChild(left)
        // left.x = 180
        // left.y =  300
        // var right = new cc.Sprite(res.right)
        // this._gLayer.addChild(right)
        // right.x = 580
        // right.y = 300

        var barrier = new cc.Sprite(res.barrier)
        this._gLayer.addChild(barrier)
        barrier.x = winSize.width/2
        barrier.y = 510

        //生命桃心
        this._xin1 = new cc.Sprite(res.xin)
        this._xin2 = new cc.Sprite(res.xin)
        this._xin3 = new cc.Sprite(res.xin)
        this._xin1.x = winSize.width/2 - 40
        this._xin2.x = winSize.width/2
        this._xin3.x = winSize.width/2 + 40
        this._xin1.y = this._xin2.y = this._xin3.y  =  winSize.height - h
        this.addChild(this._xin1)
        this.addChild(this._xin2)
        this.addChild(this._xin3)

        return true


    },
    isStart : function(){
        if(this._gLayer.isVisible()){
            this._gLayer.setVisible(false)
        }
    },
    init : function(){
        if(!this._gLayer.isVisible()){
            this._gLayer.setVisible(true)
        }
        this._xin1.setTexture(res.xin)
        this._xin2.setTexture(res.xin)
        this._xin3.setTexture(res.xin)
    },
    _pauseResume:function(){
        if(cc.director.isPaused()){
            cc.director.resume()
        }else{
            cc.director.pause()
        }
    },

    update : function(){

        if(Game.user.lives == 2){
            this._xin1.setTexture(res.die)
        }else if(Game.user.lives == 1){
            this._xin2.setTexture(res.die)
        }else if(Game.user.lives <= 0){
            this._xin3.setTexture(res.die)
        }
        //this._lifeText.setString("life:"+Game.user.lives.toString())
        //GameConst.DISTANCE  = 1000
        var distance = ((GameConst.DISTANCE - Game.user.distance)/1000).toFixed(2);
        //var distance = (distance / 3.6).toFixed(2)
        this._distanceText.setString(distance.toString() + "km")
        var time = Game.user.time>9?Game.user.time:"0"+Game.user.time;
        this._timeText.setString("00:" + time.toString())
    }


})