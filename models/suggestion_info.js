/**
 * Created by yuanxiang on 2/27/17.
 */
'use strict';
const SG_suggestion = require("./sg_suggestion");
const suggestion_info = {};

let i = 1;
const name1 = "空城计";
const des1 = "遭遇攻城战时可使用,使攻城战失效,并俘虏敌军1000兵力";
let suggestion = new SG_suggestion(i, name1, des1, true,
    obj => {
        console.log("进入锦囊妙计索引", 1, name1);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name1},${des1}`);
    }
);
suggestion_info[i++] = suggestion;

const name2 = "落井下石";
const des2 = "令一名正在休息的玩家,继续休息1次";
suggestion = new SG_suggestion(i, name2, des2, true,
    obj => {
        console.log("进入锦囊妙计索引", 2, name2);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name2},${des2}`);
    }
);
suggestion_info[i++] = suggestion;

const name3 = "移花接木";
const des3 = "路过他人领地时,强行获得该城池的拥有权,但城池建筑需移除(无论大小)";
suggestion = new SG_suggestion(i, name3, des3, true,
    obj => {
        console.log("进入锦囊妙计索引", 3, name3);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name3},${des3}`);
    }
);
suggestion_info[i++] = suggestion;

const name4 = "金蝉脱壳";
const des4 = "在需要缴路过税金的时候使用,免缴路过税金";
suggestion = new SG_suggestion(i, name4, des4, true,
    obj => {
        console.log("进入锦囊妙计索引", 4, name4);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name4},${des4}`);
    }
);
suggestion_info[i++] = suggestion;

const name5 = "火烧连环";
const des5 = "烧毁其他一名玩家一座城池,无论大城小城";
suggestion = new SG_suggestion(i, name5, des5, true,
    obj => {
        console.log("进入锦囊妙计索引", 5, name5);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name5},${des5}`);
    }
);
suggestion_info[i++] = suggestion;

const name6 = "贿赂之计";
const des6 = "选择一名玩家,付他500两,抽取其一张武将卡,如抽到君主卡,需要向你交2000两赎回";
suggestion = new SG_suggestion(i, name6, des6, false,
    obj => {
        console.log("进入锦囊妙计索引", 6, name6);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name6},${des6}`);
    }
);
suggestion_info[i++] = suggestion;

const name7 = "偷梁换柱";/////////////////////
const des7 = "选择一名玩家,用自己的一处领地与他交换(含城池)";
suggestion = new SG_suggestion(i, name7, des7, false,
    obj => {
        console.log("进入锦囊妙计索引", 7, name7);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name7},${des7}`);
    }
);
suggestion_info[i++] = suggestion;

const name8 = "以逸待劳";
const des8 = "后退至起点,并获得国库或者其他玩家手里的免战卡";
suggestion = new SG_suggestion(i, name8, des8, false,
    obj => {
        console.log("进入锦囊妙计索引", 8, name8);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name8},${des8}`);
    }
);
suggestion_info[i++] = suggestion;

const name9 = "苦肉计";
const des9 = "弃置手里的一张武将卡,随机抽取其他玩家一张武将卡,如抽到君主卡,需要向你交2000两赎回";
suggestion = new SG_suggestion(i, name9, des9, false,
    obj => {
        console.log("进入锦囊妙计索引", 9, name9);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name9},${des9}`);
    }
);
suggestion_info[i++] = suggestion;

const name10 = "浑水摸鱼";
const des10 = "补充1500兵力";
suggestion = new SG_suggestion(i, name10, des10, false,
    obj => {
        console.log("进入锦囊妙计索引", 10, name10);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name10},${des10}`);
    }
);
suggestion_info[i++] = suggestion;

const name11 = "未卜先知";
const des11 = "自己投骰子时,可自由选择前进至1-6任意地点";
suggestion = new SG_suggestion(i, name11, des11, true,
    obj => {
        console.log("进入锦囊妙计索引", 11, name11);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name11},${des11}`);
    }
);
suggestion_info[i++] = suggestion;

const name12 = "趁虚而入";
const des12 = "当有玩家停留在游乐园或者按摩院时,你可以从该玩家手里抽其一张武将卡,如抽到君主卡,需要向你交2000两赎回";
suggestion = new SG_suggestion(i, name12, des12, true,
    obj => {
        console.log("进入锦囊妙计索引", 12, name12);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name12},${des12}`);
    }
);
suggestion_info[i++] = suggestion;

const name13 = "无懈可击";
const des13 = "抵消其他玩家对你使用的任何锦囊妙计和紧急军情的效果";
suggestion = new SG_suggestion(i, name13, des13, true,
    obj => {
        console.log("进入锦囊妙计索引", 13, name13);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name13},${des13}`);
    }
);
suggestion_info[i++] = suggestion;

const name14 = "嫁祸于人";
const des14 = "当你在休息轮时,使用让别人代你休息";
suggestion = new SG_suggestion(i, name14, des14, true,
    obj => {
        console.log("进入锦囊妙计索引", 14, name14);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name14},${des14}`);
    }
);
suggestion_info[i++] = suggestion;

const name15 = "草船借箭";
const des15 = "投骰子向每位玩家收取士兵,1-2点500名,3-4点1000名,5-6点1500名(不足则全交)";
suggestion = new SG_suggestion(i, name15, des15, false,
    obj => {
        console.log("进入锦囊妙计索引", 15, name15);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name15},${des15}`);
    }
);
suggestion_info[i++] = suggestion;

const name16 = "激将之计";
const des16 = "其他所有玩家原地休息一次,并损失1000两";
suggestion = new SG_suggestion(i, name16, des16, false,
    obj => {
        console.log("进入锦囊妙计索引", 16, name16);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name16},${des16}`);
    }
);
suggestion_info[i++] = suggestion;

const name17 = "孔明借东风";
const des17 = "投骰子,单数获武将1名,双数获2名";
suggestion = new SG_suggestion(i, name17, des17, false,
    obj => {
        console.log("进入锦囊妙计索引", 17, name17);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name17},${des17}`);
    }
);
suggestion_info[i++] = suggestion;

const name18 = "抛砖引玉";
const des18 = "投骰子,每点向其他所有玩家收取每人500两";
suggestion = new SG_suggestion(i, name18, des18, false,
    obj => {
        console.log("进入锦囊妙计索引", 18, name18);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name18},${des18}`);
    }
);
suggestion_info[i++] = suggestion;

const name19 = "疑兵之计";
const des19 = "其他所有玩家原地休息一次,并损失1000兵力";
suggestion = new SG_suggestion(i, name19, des19, false,
    obj => {
        console.log("进入锦囊妙计索引", 19, name19);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name19},${des19}`);
    }
);
suggestion_info[i++] = suggestion;

const name20 = "鱼目混珠";
const des20 = "用手里的1张武将卡,换国库的2张武将卡";
suggestion = new SG_suggestion(i, name20, des20, false,
    obj => {
        console.log("进入锦囊妙计索引", 20, name20);
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取锦囊妙计为${name20},${des20}`);
    }
);
suggestion_info[i++] = suggestion;

console.log(JSON.stringify(suggestion_info));

module.exports = suggestion_info;