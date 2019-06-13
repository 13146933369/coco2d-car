
var GameConst = {

    GAME_WIDTH : 750,
    GAME_HEIGHT : 1334,
 
    GAME_STATE_IDLE : 0,   // 游戏中的状态 0 起飞
    GAME_STATE_READY : 3,   // 游戏中的状态 0 起飞
    GAME_STATE_FLYING : 1, // 飞行中
    GAME_STATE_OVER : 2,   // 失败

    DISTANCE : 3900,

    ITEM_SPEED : 1, 
    ITEM_GOD : 2, 
    ITEM_VEl : 0,
    
    HERO_STATE_IDLE : 0, //起飞时候的状态
    HERO_STATE_FLYING : 1,  //飞行的状态
    HERO_STATE_HIT : 2, //碰撞翻转减速
    HERO_STATE_FALL : 3,    //失败
    
    OBSTACLE_TYPE_1 : 1,
    
    OBSTACLE_TYPE_2 : 2,

    OBSTACLE_TYPE_3 : 3,

    OBSTACLE_TYPE_4 : 4,

    OBSTACLE_TYPE_5 : 5,

    HERO_LIVES : 3,
    
    HERO_MIN_SPEED : 510,
    
    HERO_MAX_SPEED : 1000,

    OBSTACLE_SPEED : 100,

    OBSTACLE_GAP : 1200,

    GAME_AREA_TOP_BOTTOM : 100
};