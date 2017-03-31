/**
 * Created by yuanxiang on 3/30/17.
 */
import 'yuki-createjs'
import * as _ from 'lodash'

var cjs = createjs,
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
    canvas.width = w;
    canvas.height = h;
    //创建舞台
    stage = new cjs.Stage(canvas);
    container = new cjs.Container();//绘制外部容器
    stage.addChild(container);

    //创建矩形
    s = new DrawArc(10, '#fff');
    s2 = new DrawArc(10, '#fff');
    //PS：Shape 类是没有getBounds这个方法，可以通过setBounds来获得
    var bounds = s.getBounds(),
        bounds2 = s2.getBounds();
    //控制居中位置
    s.x = w - bounds.width >>1;
    s.y = h - bounds.height >>1;
    s2.x = w - bounds2.width >>1;
    s2.y = h - bounds2.height >>1;
    s2.alpha = 0.6;

    s.on('click', function () {
        alert('提示！');
    });
    //加入场景
    container.addChild(s);
    container.addChild(s2);

    //Tween
    cjs.Tween.get(s, {loop: true})
        .to({scaleX: 2.5, scaleY: 2.5, alpha: 0}, 1000,  cjs.Ease.linear) // jump to the new scale properties (default duration of 0)
        .to({scaleX: 1, scaleY: 1, alpha: 1}, 0,  cjs.Ease.linear);

    cjs.Ticker.setFPS(60);//设置游戏帧率
    cjs.Ticker.on("tick", stage);
}

//绘制矩形 类
function DrawArc(r, c) {
    cjs.Shape.call(this);//继承Shap类
    this.graphics.beginFill(c).arc(0, 0, r, 0, 2*Math.PI);
    this.setBounds(0,0,r,r);//设置矩形的边界属性，这样可以获得width和height属性
}
DrawArc.prototype = new cjs.Shape();//获得原型方法

export {init}