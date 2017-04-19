import {getRooms, enterRoom} from '../../api/rest/rooms'
import $ from 'jquery'
import {open} from '../../common/utils/router'
import {pages} from '../../config/pages'

function initAnimation() {
    const roomObj = $('.room-block');
    roomObj.addClass('init-block');
    setTimeout(() => {
        roomObj.removeClass('init-block');
    }, 800)

}

function init() {
    getRooms()
        .then((res) => {
            console.log('success!');
            const rooms = res.data;
            const roomContainer = $('.container');
            roomContainer.html("");//清空房间列表信息
            let i = 2;
            rooms.forEach(room => {
                const str = [];
                str.push("<div class=\"room-block background-g-" + (i++ % 2) + "\" id=\"" + room.roomNo + "\">1234");
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
                const currentDiv = $(`#${room.roomNo}`);
                currentDiv.on("click", ()=> {
                    enterRoom(room.roomNo)
                        .then(() => {
                            //跳转
                            open(pages.game, {roomNo: room.roomNo});
                        })
                        .catch((err) => {
                            alert(console.log(err.response.data));
                            console.log(err.response.data);
                        });
                });


            });


        })
        .catch((err) => {
            console.log(err.response.data);
        });
    //5秒刷新一次
    setTimeout(()=> {
        init();
    }, 5000)
}

init();