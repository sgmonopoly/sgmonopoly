/**
 * Created by yuanxiang on 2/22/17.
 */
'use strict';
const SG_City = require("./sg_city");
const SG_Stage = require("./sg_stage");
const sg_constant = require("../services/sg_constant");
const sg_map = {};

let i = 1;
//1起点
let stage = new SG_Stage(1,sg_constant.stage_type.start,"起点");
sg_map._1 = stage;

//2征兵处
stage = new SG_Stage(2,sg_constant.stage_type.conscription,"征兵处");
sg_map._2 = stage;
//TODO

module.exports = sg_map;