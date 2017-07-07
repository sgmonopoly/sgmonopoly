/**
 * Created by yuanxiang on 2/27/17.
 */
'use strict';
const SG_Situation = require("./sg_situation");
const situation_info = {};

let i = 1;
let situation = new SG_Situation(i, "五谷丰登,社稷安宁", "获得1000两,如果自己的所有领地中每有一座小城得200两,每有一座大城得500两");

situation_info[i++] = situation;

situation = new SG_Situation(i, "天灾人祸,百姓流离失所,玩家雪中送炭", "向所有玩家收取1000两");
situation_info[i++] = situation;

situation = new SG_Situation(i, "习得武功秘籍,乾坤大挪移心法", "可随心所欲,前进或后退1-10步任意地点");//todo
situation_info[i++] = situation;

situation = new SG_Situation(i, "得建筑设计师相助,设计两座城池", "在任意自己的两处城池上,空城改小城或小城改大城,每座费用为建城费用");
situation_info[i++] = situation;

situation = new SG_Situation(i, "军中瘟疫肆虐,损兵折将", "损失兵力1000(不足则全交),并随机弃置一张武将卡,如弃置的是君主卡,需缴纳国库2000两赎回");
situation_info[i++] = situation;

situation = new SG_Situation(i, "勤政爱民,深得民心", "送给所有其他玩家每人500两");
situation_info[i++] = situation;

situation = new SG_Situation(i, "前进至茅庐,如经过起点,可拿取经费", "移动到茅庐");//todo
situation_info[i++] = situation;

situation = new SG_Situation(i, "城里遭遇盗贼团伙洗劫", "每有一座大城或者小城,损失200两");
situation_info[i++] = situation;

situation = new SG_Situation(i, "强将手下无弱兵,敌军慕名前来投靠", "向每位玩家收取500兵力(不足则全交)");
situation_info[i++] = situation;

situation = new SG_Situation(i, "幸遇高人指点,赐锦囊妙计", "前进至最近的锦囊妙计");//todo
situation_info[i++] = situation;

situation = new SG_Situation(i, "游说成功,招来士兵", "获得1000兵力");
situation_info[i++] = situation;

situation = new SG_Situation(i, "间谍成功获得敌军情报", "查看所有人的武将卡");
situation_info[i++] = situation;

situation = new SG_Situation(i, "智商不足,听信敌军谣言,军心涣散,损失兵力1000", "上缴国库1000兵力(不足则全交)");
situation_info[i++] = situation;

situation = new SG_Situation(i, "乘船遇龙卷风,漂至金银岛", "前进至金银岛");//todo
situation_info[i++] = situation;

situation = new SG_Situation(i, "截获免战卡", "获得国库中或者玩家手里的免战卡");//todo
situation_info[i++] = situation;

situation = new SG_Situation(i, "截获通行证", "获得国库中或者玩家手里的通行证");//todo
situation_info[i++] = situation;


console.log(JSON.stringify(situation_info));

module.exports = situation_info;