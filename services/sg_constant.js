/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
module.exports = {
    roomNamePrefix: "room",//默认返回的房间对象中,可能会包含自带属性,用这个名称来过滤房间对象
    roomNumbers: [1, 2],//暂时只有2个房间,以后再加
    // 武将花色
    hero_suit: {
        heart: 1,//红桃
        spade: 2,//黑桃
        diamond: 3,//方块
        club: 4,//梅花
        smallKing: 5,//小王
        bigKing: 6//大王
    },
    hero_type: {
        person: 1,//人物
        weapon: 2,//武器
        formation: 3,//阵式
        bigboss: 4//霸王卡
    },
    hero_duty: {
        king: 1,//君主
        combat: 2,//武将
        strategy: 3//军师
    },
    //节点类型
    stage_type: {
        city: 1,//城池
        conscription: 2,//征兵
        draft: 3,//招将
        park: 4,//游乐园
        massage: 5,//按摩院
        tax: 6,//缴税
        cottage: 7,//茅庐
        island: 8,//金银岛
        bet: 9,//赌馆
        situation: 10,//紧急军情
        suggestion: 11,//锦囊妙计
        start: 12//起点
    },
    //城池同花色的类型
    city_follow: {
        follow1: 1,
        follow2: 2,
        follow3: 3,
        follow4: 4,
        follow5: 5,
        ancient: 6//古战场
    },
    city_build_fee: 600,//默认建城费用为600
    city_type: {
        normal: 1,//普通
        small: 2,//小城
        big: 4//大城
    },
    //点数对应的角色信息,方便初始化用
    point2info: {
        1: {a: 1900, d: 2000},
        2: {a: 1550, d: 1600},
        3: {a: 1600, d: 1550},
        4: {a: 1500, d: 1750},
        5: {a: 1700, d: 1650},
        6: {a: 1800, d: 1700},
        7: {a: 1750, d: 1850},
        8: {a: 1850, d: 1750},
        9: {a: 1850, d: 1850},
        10: {a: 2000, d: 1800},
        11: {a: 1600, d: 1900},
        12: {a: 3000, d: 0},
        13: {a: 3000, d: 0},
        14: {a: 5000, d: 0},//小王
        15: {a: 5000, d: 0}//大王
    },
    user_status: {
        unready: 1,//未准备
        ready: 2,//已准备
        gaming: 3,//正在游戏
        lost: 4//掉线
    },
    ws_name: {
        errorLog: "errorLog",//全局错误日志
        chat: "chat",//聊天记录
        roomUsers: "roomUsers",//房间所有用户信息
        room: "room",//房间信息
        gameLog: "gameLog"//操作日志
    },
    item_count: {
        card: 54,//卡片总数量
        situation: 16,//紧急军情总数量
        suggestion: 20//锦囊总数量
    }
};
