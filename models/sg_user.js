/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict'
class SG_User extends require("./user_info") {
    constructor(_userId, _nickname, _avatar, _money = 18000, _troop = 2000) {
        super(_userId, _nickname, _avatar)
        this.lordName = ""//君主姓名
        this.lordAvatar = ""//君主头像
        this.lordId = ""//君主id
        this.money = _money//默认金额18000
        this.troop = _troop//默认兵力2000
        this.citys = []//占有的城池
        this.heros = []//拥有的武将
        this.suggestions = []//拥有的锦囊
        //this.order = 0//顺序(1,2,3,4)
        this.suspended = 0//0不暂停,其他数字为暂停轮数
        this.status = 1//状态 1未准备,2已准备,3开战,4掉线
        this.socketId = ""//socketId
        this.turn = 0//已经经历的总轮数
        this.color = ""//颜色
        this.offset = 0//头像偏移量
        this.currentPosition = 1//当前位置(默认初始化时在第一个地方)
        this.name = ""//君主名+昵称
        this.updateName()
    }

    updateName(){
        if(this.lordName){
            this.name = this.lordName + "(" + this.nickname + ")"
        }else{
            this.name = this.nickname
        }
    }
}
module.exports = SG_User