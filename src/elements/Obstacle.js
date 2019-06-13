var Obstacle = cc.Sprite.extend({

    type : 0,
    speed : 0,
    distance :0,
    alreadyHit : false,
    position : null,
    _boom : null,

    ctor : function(type ,position , speed ,distance){
        this._super();
        this.reuse(type , position , speed , distance)
        return true
    },
    reuse:function(type , position , speed , distance){
        // 所有障碍物没有特效的效果
        // if(type == GameConst.OBSTACLE_TYPE_4){
        //     this.setTexture(res["obstacle4_001"])
        //     var animation = new cc.Animation();
        //     animation.addSpriteFrameWithFile(res["obstacle4_001"])
        //     animation.addSpriteFrameWithFile(res["obstacle4_002"])
        //     animation.setDelayPerUnit(1/10)
        //     var action = cc.animate(animation).repeatForever();
        //     this.runAction(action)
        // }else{
        //    this.setTexture(res["obstacle" + type])
        // }
        
        this.setTexture(res["obstacle" + type])
        this.position = position
        this.speed = speed;
        this.distance = distance
        this.alreadyHit = false;
        this.type = type

        this._boom = new cc.Sprite(res.boom)
        this._boom.x = this.width/2
        this._boom.y = this.height/5
        this._boom.setVisible(false)
        this.addChild(this._boom)

    },
    unuse : function(){
        //this.stopAllActions();
        this._boom.setVisible(false)
    },

    crash : function(){
        this._boom.setVisible(true)
    },
   
})

Obstacle.create = function(type , position , speed , distance){

    if(cc.pool.hasObject(Obstacle)){
        return cc.pool.getFromPool(Obstacle , type , position , speed , distance)
    }else{
        return new Obstacle(type , position , speed , distance)
    }
}