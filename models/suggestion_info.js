/**
 * Created by yuanxiang on 2/27/17.
 */
'use strict';
const SG_suggestion = require("./sg_suggestion");
const suggestion_info = {};

let i = 1;
let suggestion = new SG_suggestion(i, "空城计", "遭遇攻城战时可使用,使攻城战失效,并俘虏敌军1000兵力", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "落井下石", "令一名正在休息的玩家,继续休息1次", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "移花接木", "选择一名玩家,将其一座小城转移到自己的空城上,或者将其一座大城与自己的小城交换", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "金蝉脱壳", "在需要缴路过税金的时候使用,免缴路过税金", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "火烧连环", "烧毁其他一名玩家一座城池,无论大城小城", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "贿赂之计", "选择一名玩家,付他500两,抽取其一张武将卡,如抽到君主卡,需要向你交2000两赎回", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "偷梁换柱", "选择一名玩家,用自己的一处领地与他交换(含城池)", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "以逸待劳", "后退至起点,并获得国库或者其他玩家手里的免战卡", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "苦肉计", "弃置手里的一张武将卡,随机抽取其他玩家一张武将卡,如抽到君主卡,需要向你交2000两赎回", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "浑水摸鱼", "攻城战结束后,可自动补充1500兵力", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "未卜先知", "自己投骰子时,可自由选择前进至1-6任意地点", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "趁虚而入", "当有玩家停留在游乐园或者按摩院时,你可以从该玩家手里抽其一张武将卡,如抽到君主卡,需要向你交2000两赎回", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "无懈可击", "抵消其他玩家对你使用的任何锦囊妙计和紧急军情的效果", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "嫁祸于人", "当你在休息轮时,使用让别人代你休息", true);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "草船借箭", "投骰子向每位玩家收取士兵,1-2点500名,3-4点1000名,5-6点1500名(不足则全交)", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "激将之计", "其他所有玩家原地休息一次,并损失1000两", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "孔明借东风", "投骰子,单数获武将1名,双数获2名", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "抛砖引玉", "投骰子,每点向其他所有玩家收取每人500两", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "疑兵之计", "其他所有玩家原地休息一次,并损失1000兵力", false);
suggestion_info[i++] = suggestion;

suggestion = new SG_suggestion(i, "鱼目混珠", "用手里的1张武将卡,换国库的2张武将卡", false);
suggestion_info[i++] = suggestion;

console.log(JSON.stringify(suggestion_info));

module.exports = suggestion_info;