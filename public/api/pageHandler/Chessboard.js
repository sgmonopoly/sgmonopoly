/**
 * Created by yuanxiang on 4/20/17.
 * 这个用来初始化棋盘canvas
 */
import 'yuki-createjs'
import * as _ from 'lodash'
import {game_constants} from "../common/GameConstants"
import {map_info} from "../domain/MapInfo"
import {DrawRect} from "./CreateJsCommon"

let cjs = createjs,
    canvas,
    stage,
    container1,
    container2,
    ww = window.innerWidth,
    wh = window.innerHeight,
    image,
    gameStageCoodInfos = [];

/**
 * 初始化棋盘
 * @param domId
 * @param canvasWidth canvas的宽度不能通过css控制,手动传入
 */
const initChessBoard = (domId = 'game', canvasWidth = ww) => {
    //设置canvas属性
    canvas = document.getElementById(domId);
    canvas.width = canvasWidth//parseInt(ww * game_constants.global_scale);//这里要乘以一个整体缩放系数
    canvas.height = parseInt(canvas.width / 1.625);
    console.log("ww ", ww);
    console.log("wh ", wh);
    console.log("canvas.width ", canvas.width);
    console.log("canvas.height ", canvas.height);
    //创建舞台
    stage = new cjs.Stage(canvas);
    container1 = new cjs.Container();//绘制第1层容器
    container2 = new cjs.Container();//绘制第2层容器,用于覆盖底层
    stage.addChild(container1);
    stage.addChild(container2);

    addBackground();//加背景

    const horizontalCount = 7;//水平放7个
    const verticalCount = 8;//垂直放8个
    const marginSpace = 5;//每格之间间隙
    const minBoard = canvas.width > canvas.height ? canvas.height : canvas.width;
    const boardLength = parseInt(minBoard / verticalCount) - marginSpace * 2;
    console.log("boardLength ", boardLength);

    const w = boardLength * 2,
        h = boardLength;

    const allGameStageWidth = horizontalCount * w + (horizontalCount - 1) * 2 * marginSpace;
    const allMarginLeft = (canvas.width - allGameStageWidth ) / 2 - marginSpace;//为了居中,算出左边间隙

    console.log("allGameStageWidth:", allGameStageWidth);
    console.log("allMarginLeft:", allMarginLeft);

    let gameStageIndex = 1;
    //算出所有shape的坐标参数
    _.times(verticalCount, (j)=> {
        _.times(horizontalCount, (i)=> {
            //创建矩形

            const gameStageInfo = {
                s1: {},
                s2: {},
                i: gameStageIndex++,//索引
            };

            gameStageInfo.s1.x = i * (w + marginSpace * 2 ) + marginSpace + allMarginLeft;
            gameStageInfo.s1.y = j * (h + marginSpace * 2 ) + marginSpace;
            gameStageInfo.s1.w = w;
            gameStageInfo.s1.h = h * 0.2;

            gameStageInfo.s2.x = i * (w + marginSpace * 2 ) + marginSpace + allMarginLeft;
            gameStageInfo.s2.y = gameStageInfo.s1.y + h * 0.2;
            gameStageInfo.s2.w = w;
            gameStageInfo.s2.h = h * 0.6;


            gameStageCoodInfos.push(gameStageInfo);


        });
    });

    console.log("gameStageCoodInfos:", gameStageCoodInfos);

    //根据坐标参数创建真的gameStage
    gameStageCoodInfos.forEach(gameStageInfo => {
        const gameStage = map_info[game_constants.index_map_cood[gameStageInfo.i]];

        //画框
        const s1 = new DrawRect(gameStageInfo.s1.w, gameStageInfo.s1.h, 'white');
        s1.x = gameStageInfo.s1.x;
        s1.y = gameStageInfo.s1.y;
        s1.name = gameStage.stageId + "_" + "s1";

        const s2_color = gameStage.stageType != 1
            ? game_constants.stage_type_color[gameStage.stageType]
            : game_constants.stage_type_color[gameStage.stageType][gameStage.colorFollow];

        const s2 = new DrawRect(gameStageInfo.s2.w, gameStageInfo.s2.h, s2_color);
        s2.x = gameStageInfo.s2.x;
        s2.y = gameStageInfo.s2.y;
        s2.name = gameStage.stageId + "_" + "s2";
        //画字
        const text = new cjs.Text(gameStage.stageId + "," + gameStage.stageName, "20px Arial", "#FFFFFF");
        text.x = s2.x + 5;
        text.y = s2.y + 5;
        text.name = gameStage.stageId + "_" + "text";
        //console.log("test: ", gameStage);

        container2.addChild(s1);
        container2.addChild(s2);
        container2.addChild(text);
    });

    cjs.Ticker.setFPS(60);//设置游戏帧率
    cjs.Ticker.on("tick", tick);

};

const tick = event => {
    stage.update(event);
};

const addBackground = () => {
    image = new Image();
    image.src = "../../../assets/bawangdalu.png";
    image.onload = handleImageLoad;
};

const handleImageLoad = event => {
    var bitmap = new cjs.Bitmap(event.target);//必须图片加载完成之后 img.onload之后执行

    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.alpha = 0.4;
    //为了图片适应整个container,添加缩放信息
    bitmap.scaleX = canvas.width / bitmap.getBounds().width;
    bitmap.scaleY = canvas.height / bitmap.getBounds().height;
    console.log("图片", bitmap.getBounds().width, bitmap.getBounds().height);

    //加入场景
    container1.addChild(bitmap);

    stage.update();
};
/**
 * 根据ID返回stage节点对象
 * @param stageId
 * @returns {*}
 */
const getStage = stageId => {
    for (var i = 0, l = gameStageCoodInfos.length; i < l; i++) {
        if (gameStageCoodInfos[i].i === stageId) {
            return gameStageCoodInfos[i];
        }
    }
};

/**
 * 为createjs增加getById的方法
 * @param id
 * @returns {*}
 */
cjs.DisplayObject.prototype.getChildById = (id) => {
    var kids = this.children;
    for (var i = 0, l = kids.length; i < l; i++) {
        if (kids[i].id == id) {
            return kids[i];
        }
    }
    return null;
};

export {initChessBoard,stage,cjs,container2,getStage}