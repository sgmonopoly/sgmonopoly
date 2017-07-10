/**
 * Created by yuanxiang on 2/27/17.
 */
'use strict';
const SG_Situation = require("./sg_situation");
const battle_service = require("../services/battle_service");
const sg_constant = require("../services/sg_constant");
const common = require("../services/common_roomUtils");
const situation_info = {};

let i = 1;
let name = "五谷丰登,社稷安宁";
let des = "获得1000两,如果自己的所有领地中每有一座小城得200两,每有一座大得500两";
let situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//1
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const myCitys = common.getCitysByIds(gameInfo.gameCitys, mine.citys);
        let earnMoney = 1000;
        myCitys.forEach(item => {
            switch (item.cityType) {
                case sg_constant.city_type.small://每个小城多200
                    earnMoney += 200;
                    break;
                case sg_constant.city_type.big://每个大城多500
                    earnMoney += 500;
                    break;
            }
        });

        battle_service.addMoney(mine, earnMoney);
        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, `${mine.name}最终获得${earnMoney}两`);
    }
);
situation_info[i++] = situation;

name = "天灾人祸,百姓流离失所,玩家雪中送炭";
des = "向所有玩家收取1000两";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//2
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        let earnMoney = 0;
        roomUsers.forEach(user => {
            if (user.id !== myId) {
                const loseMoney = battle_service.removeMoney(user, 1000);
                earnMoney += loseMoney;
                messages.push(`${user.name}失去${loseMoney}两`);
            }
        });
        messages.push(`${mine.name}一共获得${earnMoney}两`);

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "习得武功秘籍,乾坤大挪移心法";
des = "可随心所欲,前进或后退1-10步任意地点";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//3
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "得建筑设计师相助,设计两座城池";
des = "免费在随机自己的两处城池上,空城改小城或小城改大城";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//4
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const randomCitys = common.getRandomCityIndexByNum(gameInfo.gameCitys, mine.citys, 2);
        const messages = [];
        randomCitys.forEach(city => {
            gameInfo.upgradeCity(mine, city);
            messages.push(`${city.stageName}升级为${sg_constant.city_type_cn[city.cityType]}`);
        });
        if (messages.length === 0) {
            messages.push(`${mine.name}没有找到任何符合要求的城池`);
        }

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "军中瘟疫肆虐,损兵折将";
des = "损失兵力1000(不足则全交),并随机弃置一张武将卡,如弃置的是君主卡,需缴纳国库2000两赎回";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//5
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        const removeTroop = battle_service.removeTroop(mine, 1000);
        messages.push(`${mine.name}损失兵力${removeTroop}`);
        const loseHeroId = common.getRandomFromArray(mine.heros);
        if (loseHeroId) {
            const loseHero = common.getHero(loseHeroId);
            messages.push(`随机弃置了${mine.name}一名武将为${loseHero.heroName}`);
            if (loseHero.heroId === mine.lordId) {
                //如果是自己的君主,则需要交费2000
                const removeMoney = battle_service.removeMoney(mine, 2000);
                messages.push(`由于弃置了君主,已花费${removeMoney}两赎回`);
            }
        }
        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "勤政爱民,深得民心";
des = "送给所有其他玩家每人500两";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//6
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        const payUserCount = roomUsers.length - 1;

        let everyEarnMoney = 500;
        let needPayMoney = payUserCount * everyEarnMoney;
        if (mine.money < needPayMoney) {
            needPayMoney = mine.money;
            everyEarnMoney = parseInt(needPayMoney / payUserCount);
        }

        roomUsers.forEach(user => {
            if (myId === user.userId) {
                const loseMoney = battle_service.removeMoney(user, needPayMoney);
                messages.push(`${user.name}损失${loseMoney}两`);
            } else {
                battle_service.addMoney(user, everyEarnMoney);
                messages.push(`${user.name}获得${everyEarnMoney}两`);
            }
        });

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "前进至茅庐,如经过起点,可拿取经费";
des = "移动到茅庐";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//7
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "城里遭遇盗贼团伙洗劫";
des = "每有一座大城或者小城,损失200两";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//8
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        const myCitys = common.getCitysByIds(gameInfo.gameCitys, mine.citys);
        let loseMoney = 0;
        myCitys.forEach(item => {
            switch (item.cityType) {
                case sg_constant.city_type.small://每个小城损失200
                    loseMoney += 200;
                    break;
                case sg_constant.city_type.big://每个大城损失200
                    loseMoney += 200;
                    break;
            }
        });

        const loseMoneyActually = battle_service.removeMoney(mine, loseMoney);
        messages.push(`${mine.name}损失${loseMoneyActually}两`);

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "强将手下无弱兵,敌军慕名前来投靠";
des = "向每位玩家收取500兵力(不足则全交)";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//9
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        const everyTroop = 500;
        let earnTroop = 0;

        roomUsers.forEach(user => {
            if (myId !== user.userId) {
                const everyTroopActually = battle_service.removeTroop(user, everyTroop);
                earnTroop += everyTroopActually;
                messages.push(`${user.name}损失兵力${everyTroopActually}`);
            }
        });

        battle_service.addTroop(mine, earnTroop);
        messages.push(`${mine.name}获得兵力${earnTroop}`);

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "幸遇高人指点,赐锦囊妙计";
des = "前进至最近的锦囊妙计";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//10
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "游说成功,招来士兵";
des = "获得1000兵力";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//11
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        battle_service.addTroop(mine, 1000);
        messages.push(`${mine.name}获得兵力1000`);

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "间谍成功获得敌军情报";
des = "查看所有人的武将卡";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//12
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];

        roomUsers.forEach(user => {
            if (myId !== user.userId) {
                messages.push(`${user.name}武将如下`);
                user.heros.forEach(heroId => {
                    const hero = common.getHero(heroId);
                    messages.push(`${hero.heroName} 攻击力${hero.atk} 防御力${hero.def}`);
                });
            }
        });

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(socket, messages);
    }
);
situation_info[i++] = situation;

name = "智商不足,听信敌军谣言,军心涣散,损失兵力1000";
des = "上缴国库1000兵力(不足则全交)";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//13
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        const loseTroop = battle_service.removeTroop(mine, 1000);
        messages.push(`${mine.name}损失兵力${loseTroop}`);

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "乘船遇龙卷风,漂至金银岛";
des = "前进至金银岛";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//14
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "截获免战卡";
des = "获得国库中或者玩家手里的免战卡";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//15
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;

name = "截获通行证";
des = "获得国库中或者玩家手里的通行证";
situation = new SG_Situation(i, name, des,
    (obj) => {
        console.log("进入紧急军情索引", i);//16
        const {myId, targetId, roomUsers, gameInfo, io, socket} = obj;
        const mine = common.getUser(roomUsers, myId);
        const messages = [];
        //TODO

        common.addGameLog(io, `${mine.name}抽取紧急军情为${name},${des}`);
        common.addGameLog(io, messages);
    }
);
situation_info[i++] = situation;


console.log(JSON.stringify(situation_info));

module.exports = situation_info;