var CartHero = cc.Sprite.extend({

    state : 0,
    _fast : false,
    _fastCart : null,
    _cover : null,
    _wind : null,

    ctor : function(){
        this._super(res["cart1"])

        this._cover = new cc.Sprite(res.cover)
        this._cover.x = this.width/2
        this._cover.y = this.height/2
        this.addChild(this._cover , 1 , 1)
        this._cover.setVisible(false)

        this._wind = new cc.Sprite(res.speed)
        this._wind.x = this.width/2 - 5
        this._wind.y = this.height/2 - 150
        this.addChild(this._wind , 1 , 2)
        this._wind.setVisible(false)
        
        return true
    },

    toggleSpeed : function(fast){

        if(fast == this._fast){
            return
        }
        this._fast = fast
        if(!fast){
            this._wind.setVisible(false)
        }else{
            this._wind.setVisible(true)
        }
    },
    suppperEffect : function(){
        if(!this._cover.isVisible()){
            this._cover.setVisible(true)
        }
    },
    stopSuppperEffect : function(){
        if(this._cover.isVisible()){
            this._cover.setVisible(false)
        }
    }
})