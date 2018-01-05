/**
 * Created by yuanxiang on 4/20/17.
 */
'use strict'
import 'yuki-createjs'

let cjs = createjs

//绘制矩形 类
export function DrawRect(w, h, c) {
    cjs.Shape.call(this)//继承Shape类
    this.graphics.setStrokeStyle(1).beginStroke("black")
    this.graphics.beginFill(c).drawRect(0, 0, w, h)
    this.setBounds(0, 0, w, h)//设置矩形的边界属性，这样可以获得width和height属性
}
//绘制线 类
export function DrawLine(sx, sy, ex, ey, c) {
    cjs.Shape.call(this)//继承Shape类
    this.graphics.setStrokeStyle(1).beginStroke(c)
    this.graphics.moveTo(sx, sy)
    this.graphics.lineTo(ex, ey)
    this.graphics.endStroke()
}
DrawRect.prototype = new cjs.Shape()//获得原型方法
DrawLine.prototype = new cjs.Shape()//获得原型方法

//给createjs增加getbyid的功能
cjs.DisplayObject.prototype.getChildById = (id) => {
    return this.children.find(kid => kid.id == id)
}