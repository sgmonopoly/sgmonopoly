import {getRooms, enterRoom} from '../../api/rest/rooms'
import $ from 'jquery'
import {open} from '../../common/utils/router'
import {pages} from '../../config/pages'

function initAnimation() {
    const roomObj = $('.room-block');
    roomObj.addClass('init-block');
    setTimeout(() => {
        roomObj.removeClass('init-block');
    }, 800);

}

async function init() {
    let res
    try{
        res = await getRooms()
    }catch (err){
        return console.log(err.response.data);
    }
    const rooms = res.data;
    const roomContainer = $('.container');
    roomContainer.html("");//清空房间列表信息
    let i = 2;
    rooms.forEach(room => {
        const str = [];
        const roomNo = room.roomNo
        str.push("<div class=\"room-block background-g-" + (i++ % 2) + "\" id=\"" + room.roomNo + "\">");
        str.push("房间号:" + room.roomNo);
        str.push("&nbsp;");
        str.push("状态:");
        if (room.isGaming) {
            str.push("游戏中");
        } else {
            str.push("未开始");
        }
        str.push("&nbsp;");
        str.push("人数:" + room.currentNum + "/" + room.maxNum);
        str.push("</div>");
        roomContainer.append(str.join(""));

        //增加事件
        const currentDiv = $(`#${roomNo}`);
        currentDiv.on("click", () => {
            enterRoom(roomNo)
                .then(() => {
                    //跳转
                    open(pages.room, {roomNo});
                })
                .catch((err) => {
                    alert(err.response.data);
                    console.log(err.response.data);
                });
        });


    });

    //5秒刷新一次
    setTimeout(()=> {
        init();
    }, 5000);
}

init();