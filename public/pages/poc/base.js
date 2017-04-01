/**
 * Created by yuanxiang on 3/30/17.
 */
import 'yuki-createjs'
import * as _ from 'lodash'
import {map_info} from "./mapInfo"
import {game_constants} from "./constants"

let cjs = createjs,
    canvas,
    stage,
    container,
    container2,
    ww = window.innerWidth,
    wh = window.innerHeight,
    image,
    gameStageCoodInfos = [];

const init = () => {
    //设置canvas属性
    canvas = document.getElementById('game');
    canvas.width = parseInt(ww * 0.7);
    canvas.height = parseInt(canvas.width / 1.625);
    console.log("canvas.width ", canvas.width);
    console.log("canvas.height ", canvas.height);
    //创建舞台
    stage = new cjs.Stage(canvas);
    container = new cjs.Container();//绘制第1层容器
    container2 = new cjs.Container();//绘制第2层容器,用于覆盖底层
    stage.addChild(container);
    stage.addChild(container2);


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
        const text = new cjs.Text(gameStage.stageId + "," + gameStage.stageName, "13px Arial", "#FFFFFF");
        text.x = s2.x + 5;
        text.y = s2.y + 5;
        text.name = gameStage.stageId + "_" + "text";
        console.log("test: ", gameStage);

        container2.addChild(s1);
        container2.addChild(s2);
        container2.addChild(text);
    });

    image = new Image();
    image.src = "../../assets/bawangdalu.png";
    image.onload = handleImageLoad;

    cjs.Ticker.setFPS(60);//设置游戏帧率
    cjs.Ticker.on("tick", () => stage.update());
};

//绘制矩形 类
function DrawRect(w, h, c) {
    cjs.Shape.call(this);//继承Shape类
    this.graphics.setStrokeStyle(1).beginStroke("black");
    this.graphics.beginFill(c).drawRect(0, 0, w, h);
    this.setBounds(0, 0, w, h);//设置矩形的边界属性，这样可以获得width和height属性
}
//绘制线 类
function DrawLine(sx, sy, ex, ey, c) {
    cjs.Shape.call(this);//继承Shape类
    this.graphics.setStrokeStyle(1).beginStroke(c);
    this.graphics.moveTo(sx, sy);
    this.graphics.lineTo(ex, ey);
    this.graphics.endStroke();
}
DrawRect.prototype = new cjs.Shape();//获得原型方法
DrawLine.prototype = new cjs.Shape();//获得原型方法
//给createjs增加getbyid的功能
cjs.DisplayObject.prototype.getChildById = (id) => {
    var kids = this.children;
    for (var i = 0, l = kids.length; i < l; i++) {
        if (kids[i].id == id) {
            return kids[i];
        }
    }
    return null;
};


const handleImageLoad = (event) => {
    var bitmap = new cjs.Bitmap(event.target);//必须图片加载完成之后 img.onload之后执行

    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.alpha = 0.4;
    //为了图片适应整个container,添加缩放信息
    bitmap.scaleX = canvas.width / bitmap.getBounds().width;
    bitmap.scaleY = canvas.height / bitmap.getBounds().height;
    console.log("图片", bitmap.getBounds().width, bitmap.getBounds().height);

    //加入场景
    container.addChild(bitmap);

    stage.update();
};


export {init}