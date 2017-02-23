/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
module.exports = {
    // 武将花色
    hero_suit: {
        heart: 1,//红桃
        spade: 2,//黑桃
        diamond: 3,//方块
        club: 4//梅花
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
    stageType: {
        city:1,//城池
        conscription:2,//征兵
        draft:3,//招将
        park:4,//游乐园
        massage:5,//按摩院
        tax:6,//缴税
        cottage:7,//茅庐
        island:8,//金银岛
        bet:9,//赌馆
        situation:10,//紧急军情
        suggestion:11,//锦囊妙计
        start:12//起点
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
    city_type: {
        normal: 1,//普通
        small: 2,//小城
        big: 4//大城
    },

};
