/**
 * Created by yuanxiang on 3/2/17.
 * 紧急军情
 */
'use strict';
class SG_Situation {
    constructor(_id, _name, des, cb) {
        this.id = _id;
        this.name = _name;//名称
        this.des = des;
        this.cb = cb;//从后台发起回调函数
    }

    /**
     * 执行对应的回调函数
     * @param roomUsers
     * @param gameInfo
     * @param io
     * @param socket
     */
    execute(roomUsers, gameInfo, io, socket) {
        if (this.cb) this.cb(roomUsers, gameInfo, io, socket);
    }
}
module.exports = SG_Situation;