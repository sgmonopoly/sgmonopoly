/**
 * Created by yuanxiang on 3/17/17.
 */
const schedule = require("node-schedule");

const room_contrl = require("../api/room_contrl");

/**
 * 定时执行 更新房间信息任务 每5秒触发
 */
const startJob = ()=> {
    schedule.scheduleJob('*/5 * * * * *', function () {
        room_contrl.updateRoomUserData();
    });
};

startJob();