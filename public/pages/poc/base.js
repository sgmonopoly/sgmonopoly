/**
 * Created by yuanxiang on 3/30/17.
 */
import 'yuki-createjs'
import * as _ from 'lodash'

let cjs = createjs,
    canvas,
    stage,
    container,
    w = window.innerWidth,
    h = window.innerHeight,
    s,
    s2,
    dt = '';

function init() {
    //设置canvas属性
    canvas = document.getElementById('game');
    canvas.width = w * 0.7;
    canvas.height = h * 0.7;
    console.log("canvas.width ", canvas.width);
    console.log("canvas.height ", canvas.height);
    //创建舞台
    stage = new cjs.Stage(canvas);
    container = new cjs.Container();//绘制外部容器
    stage.addChild(container);

    var marginSpace = 5;//每格之间间隙
    var boardLength = parseInt(canvas.height / 8) - marginSpace * 2;
    console.log("boardLength ", boardLength);

    _.times(7, (i)=> {
        //创建矩形
        s = new DrawSquare(boardLength, boardLength, '#ff0000');
        s.x = i * (boardLength + marginSpace * 2 ) + marginSpace + boardLength * 2;//最后那个boardLength*2是为了居中
        console.log("s.x ", s.x);
        //加入场景
        container.addChild(s);
    });


    cjs.Ticker.setFPS(60);//设置游戏帧率
    cjs.Ticker.on("tick", tick);
}

function tick() {
    stage.update();
}

//绘制矩形 类
function DrawSquare(w, h, c) {
    cjs.Shape.call(this);//继承Shap类
    this.graphics.beginFill(c).drawRect(0, 0, w, h);
    this.setBounds(0, 0, w, h);//设置矩形的边界属性，这样可以获得width和height属性
}
DrawSquare.prototype = new cjs.Shape();//获得原型方法

export {init}