/**
 * Created by yuanxiang on 2/27/17.
 */
'use strict';
const SG_Hero = require("./sg_card");
const sg_constant = require("../services/sg_constant");
const hero_info = {};

let count = 1;
let i = 1;
//吴国
let hero = new SG_Hero(count, "孙权", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.king, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "丁奉", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "黄盖", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "凌统", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "甘宁", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "吕蒙", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "周泰", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "太史慈", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "陆逊", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "周瑜", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "鲁肃", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.strategy, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "宝雕弓", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.weapon, null, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "烈焰阵", sg_constant.hero_suit.diamond, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.formation, null, "", "");
i++;
hero_info[count++] = hero;

i = 1;
//群
hero = new SG_Hero(count, "董卓", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.king, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "潘凤", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "高顺", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "公孙瓒", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "郭汜", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "李傕", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "华雄", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "颜良", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "文丑", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "吕布", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "贾诩", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.strategy, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "方天画戟", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.weapon, null, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "轰雷阵", sg_constant.hero_suit.club, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.formation, null, "", "");
i++;
hero_info[count++] = hero;

i = 1;
//蜀国
hero = new SG_Hero(count, "刘备", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.king, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "法正", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "严颜", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "魏延", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "姜维", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "黄忠", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "马超", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "张飞", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "赵云", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "关羽", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "诸葛亮", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.strategy, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "青龙偃月刀", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.weapon, null, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "八卦阵", sg_constant.hero_suit.heart, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.formation, null, "", "");
i++;
hero_info[count++] = hero;

i = 1;
//魏国
hero = new SG_Hero(count, "曹操", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.king, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "李典", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "曹仁", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "徐晃", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "夏侯渊", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "张郃", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "庞德", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "夏侯惇", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "许褚", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "典韦", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.combat, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "司马懿", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.person, sg_constant.hero_duty.strategy, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "火牛阵", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.weapon, null, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "青釭剑", sg_constant.hero_suit.spade, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.formation, null, "", "");
i++;
hero_info[count++] = hero;

//霸王卡
hero = new SG_Hero(count, "霸王卡", sg_constant.hero_suit.smallKing, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.bigboss, null, "", "");
i++;
hero_info[count++] = hero;

hero = new SG_Hero(count, "霸王卡", sg_constant.hero_suit.bigKing, i, sg_constant.point2info[i].a, sg_constant.point2info[i].d,
    sg_constant.hero_type.bigboss, null, "", "");
hero_info[count++] = hero;

console.log(JSON.stringify(hero_info));

module.exports = hero_info;