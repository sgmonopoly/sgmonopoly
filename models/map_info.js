/**
 * Created by yuanxiang on 2/22/17.
 */
'use strict';
const SG_City = require("./sg_city");
const SG_Stage = require("./sg_stage");
const sg_constant = require("../services/sg_constant");
const map_info = {};

let i = 1;
//1
let stage = new SG_Stage(i, sg_constant.stage_type.start, "起点");
map_info[i++] = stage;

//2
stage = new SG_Stage(i, sg_constant.stage_type.conscription, "征兵处");
map_info[i++] = stage;

//3
stage = new SG_City(i, sg_constant.stage_type.city, "南皮", "", 1000, sg_constant.city_build_fee,
    sg_constant.city_follow.follow1, 1, 1);
map_info[i++] = stage;

//4
stage = new SG_Stage(i, sg_constant.stage_type.situation, "紧急军情");
map_info[i++] = stage;

//5
stage = new SG_City(i, sg_constant.stage_type.city, "代郡", "", 1200, sg_constant.city_build_fee,
    sg_constant.city_follow.follow1, 1, 1);
map_info[i++] = stage;

//6
stage = new SG_Stage(i, sg_constant.stage_type.draft, "招将处");
map_info[i++] = stage;

//7
stage = new SG_City(i, sg_constant.stage_type.city, "平原", "", 1500, sg_constant.city_build_fee,
    sg_constant.city_follow.follow1, 1, 1);
map_info[i++] = stage;

//8
stage = new SG_Stage(i, sg_constant.stage_type.suggestion, "锦囊妙计");
map_info[i++] = stage;

//9
stage = new SG_City(i, sg_constant.stage_type.city, "晋阳", "", 1600, sg_constant.city_build_fee,
    sg_constant.city_follow.follow1, 1, 1);
map_info[i++] = stage;

//10
stage = new SG_Stage(i, sg_constant.stage_type.tax, "缴税");
map_info[i++] = stage;

//11
stage = new SG_City(i, sg_constant.stage_type.city, "长坂坡", "", 1000, sg_constant.city_build_fee,
    sg_constant.city_follow.ancient, 1, 1);
map_info[i++] = stage;

//12
stage = new SG_Stage(i, sg_constant.stage_type.park, "游乐园");
map_info[i++] = stage;

//13
stage = new SG_Stage(i, sg_constant.stage_type.situation, "紧急军情");
map_info[i++] = stage;

//14
stage = new SG_City(i, sg_constant.stage_type.city, "永安", "", 1200, sg_constant.city_build_fee,
    sg_constant.city_follow.follow2, 1, 1);
map_info[i++] = stage;

//15
stage = new SG_Stage(i, sg_constant.stage_type.conscription, "征兵处");
map_info[i++] = stage;

//16
stage = new SG_City(i, sg_constant.stage_type.city, "桂阳", "", 1500, sg_constant.city_build_fee,
    sg_constant.city_follow.follow2, 1, 1);
map_info[i++] = stage;

//17
stage = new SG_Stage(i, sg_constant.stage_type.suggestion, "锦囊妙计");
map_info[i++] = stage;

//18
stage = new SG_City(i, sg_constant.stage_type.city, "江陵", "", 1600, sg_constant.city_build_fee,
    sg_constant.city_follow.follow2, 1, 1);
map_info[i++] = stage;

//19
stage = new SG_Stage(i, sg_constant.stage_type.draft, "招将处");
map_info[i++] = stage;

//20
stage = new SG_City(i, sg_constant.stage_type.city, "长沙", "", 1800, sg_constant.city_build_fee,
    sg_constant.city_follow.follow2, 1, 1);
map_info[i++] = stage;

//21
stage = new SG_Stage(i, sg_constant.stage_type.tax, "缴税");
map_info[i++] = stage;

//22
stage = new SG_City(i, sg_constant.stage_type.city, "五丈原", "", 1000, sg_constant.city_build_fee,
    sg_constant.city_follow.ancient, 1, 1);
map_info[i++] = stage;

//23
stage = new SG_Stage(i, sg_constant.stage_type.massage, "按摩院");
map_info[i++] = stage;

//24
stage = new SG_Stage(i, sg_constant.stage_type.situation, "紧急军情");
map_info[i++] = stage;

//25
stage = new SG_City(i, sg_constant.stage_type.city, "天水", "", 1500, sg_constant.city_build_fee,
    sg_constant.city_follow.follow3, 1, 1);
map_info[i++] = stage;

//26
stage = new SG_Stage(i, sg_constant.stage_type.conscription, "征兵处");
map_info[i++] = stage;

//27
stage = new SG_City(i, sg_constant.stage_type.city, "西凉", "", 1600, sg_constant.city_build_fee,
    sg_constant.city_follow.follow3, 1, 1);
map_info[i++] = stage;

//28
stage = new SG_Stage(i, sg_constant.stage_type.suggestion, "锦囊妙计");
map_info[i++] = stage;

//29
stage = new SG_City(i, sg_constant.stage_type.city, "汉中", "", 1800, sg_constant.city_build_fee,
    sg_constant.city_follow.follow3, 1, 1);
map_info[i++] = stage;

//30
stage = new SG_Stage(i, sg_constant.stage_type.draft, "招将处");
map_info[i++] = stage;

//31
stage = new SG_City(i, sg_constant.stage_type.city, "成都", "", 2000, sg_constant.city_build_fee,
    sg_constant.city_follow.follow3, 1, 1);
map_info[i++] = stage;

//32
stage = new SG_Stage(i, sg_constant.stage_type.bet, "赌馆");
map_info[i++] = stage;

//33
stage = new SG_Stage(i, sg_constant.stage_type.island, "金银岛");
map_info[i++] = stage;

//34
stage = new SG_City(i, sg_constant.stage_type.city, "赤壁", "", 1000, sg_constant.city_build_fee,
    sg_constant.city_follow.ancient, 1, 1);
map_info[i++] = stage;

//35
stage = new SG_Stage(i, sg_constant.stage_type.conscription, "征兵处");
map_info[i++] = stage;

//36
stage = new SG_City(i, sg_constant.stage_type.city, "下邳", "", 1600, sg_constant.city_build_fee,
    sg_constant.city_follow.follow4, 1, 1);
map_info[i++] = stage;

//37
stage = new SG_Stage(i, sg_constant.stage_type.situation, "紧急军情");
map_info[i++] = stage;

//38
stage = new SG_City(i, sg_constant.stage_type.city, "徐州", "", 1800, sg_constant.city_build_fee,
    sg_constant.city_follow.follow4, 1, 1);
map_info[i++] = stage;

//39
stage = new SG_Stage(i, sg_constant.stage_type.draft, "招将处");
map_info[i++] = stage;

//40
stage = new SG_City(i, sg_constant.stage_type.city, "庐江", "", 2000, sg_constant.city_build_fee,
    sg_constant.city_follow.follow4, 1, 1);
map_info[i++] = stage;

//41
stage = new SG_Stage(i, sg_constant.stage_type.suggestion, "锦囊妙计");
map_info[i++] = stage;

//42
stage = new SG_City(i, sg_constant.stage_type.city, "建业", "", 2200, sg_constant.city_build_fee,
    sg_constant.city_follow.follow4, 1, 1);
map_info[i++] = stage;

//43
stage = new SG_Stage(i, sg_constant.stage_type.tax, "缴税");
map_info[i++] = stage;

//44
stage = new SG_City(i, sg_constant.stage_type.city, "濡须口", "", 1000, sg_constant.city_build_fee,
    sg_constant.city_follow.ancient, 1, 1);
map_info[i++] = stage;

//45
stage = new SG_Stage(i, sg_constant.stage_type.cottage, "茅庐");
map_info[i++] = stage;

//46
stage = new SG_Stage(i, sg_constant.stage_type.situation, "紧急军情");
map_info[i++] = stage;

//47
stage = new SG_City(i, sg_constant.stage_type.city, "新野", "", 1800, sg_constant.city_build_fee,
    sg_constant.city_follow.follow4, 1, 1);
map_info[i++] = stage;

//48
stage = new SG_Stage(i, sg_constant.stage_type.conscription, "征兵处");
map_info[i++] = stage;

//49
stage = new SG_City(i, sg_constant.stage_type.city, "濮阳", "", 2000, sg_constant.city_build_fee,
    sg_constant.city_follow.follow5, 1, 1);
map_info[i++] = stage;

//50
stage = new SG_Stage(i, sg_constant.stage_type.draft, "招将处");
map_info[i++] = stage;

//51
stage = new SG_City(i, sg_constant.stage_type.city, "许昌", "", 2200, sg_constant.city_build_fee,
    sg_constant.city_follow.follow5, 1, 1);
map_info[i++] = stage;

//52
stage = new SG_Stage(i, sg_constant.stage_type.suggestion, "锦囊妙计");
map_info[i++] = stage;

//53
stage = new SG_City(i, sg_constant.stage_type.city, "洛阳", "", 2500, sg_constant.city_build_fee,
    sg_constant.city_follow.follow5, 1, 1);
map_info[i++] = stage;

//54
stage = new SG_Stage(i, sg_constant.stage_type.bet, "赌馆");
map_info[i++] = stage;

//55
stage = new SG_City(i, sg_constant.stage_type.city, "官渡", "", 1000, sg_constant.city_build_fee,
    sg_constant.city_follow.ancient, 1, 1);
map_info[i++] = stage;

console.log(JSON.stringify(map_info));

module.exports = map_info;