var Item = cc.Sprite.extend({

    type : 0,
    ctor : function(type){
        this.type = type
        this._super(res["item" + type]);
        return true
    },

    reuse : function(type){

        this.setTexture(res["item" + type])
        this.type = type
    },

    unuse : function(){

    },
})

Item.create = function(type){
    if(cc.pool.hasObject(Item)){
        return cc.pool.getFromPool(Item , type)
    }else{
        return new Item(type);
    }
}