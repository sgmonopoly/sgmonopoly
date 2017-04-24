/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来操作dom
 */
import $ from 'jquery'
import * as _ from 'lodash'
import {socket, room_ws, game_ws} from '../../../api/ws/emit'

const dom_chatLog = $("#chatLog");
const dom_errorLog = $("#errorLog");
const dom_gameLog = $("#gameLog");
const dom_user1 = $("#user1");
const dom_user2 = $("#user2");
const dom_user3 = $("#user3");
const dom_user4 = $("#user4");
const dom_roomInfo = $("#roomInfo");
const dom_gameInfo = $("#gameInfo");
const dom_btn_quitRoom = $("#quitRoom");
const dom_btn_sendMessage = $("#sendMessage");
const dom_btn_toReady = $("#toReady");
const dom_btn_toUnready = $("#toUnready");
const dom_btn_startGame = $("#startGame");
const dom_btn_endTurn = $("#endTurn");
const dom_btn_throwDice = $("#throwDice");
const dom_dicePoint = $("#dicePoint");

(function () {
    /**
     * 绑定退出房间事件
     */
    dom_btn_quitRoom.on('click', () => {
        room_ws.quitRoom();
    });
    /**
     * 绑定发送聊天事件
     */
    dom_btn_sendMessage.on('click', message => {
        room_ws.addChatMessage(message);
    });
    /**
     * 绑定准备好了事件
     */
    dom_btn_toReady.on('click', () => {
        room_ws.toReady();
    });
    /**
     * 绑定取消准备事件
     */
    dom_btn_toUnready.on('click', () => {
        room_ws.toUnready();
    });
    /**
     * 绑定开始游戏事件
     */
    dom_btn_startGame.on('click', () => {
        game_ws.startGame();
    });
    //默认隐藏 回合结束 和 掷骰子
    dom_btn_endTurn.hide();
    dom_btn_throwDice.hide();
    /**
     * 绑定回合结束事件
     */
    dom_btn_endTurn.on('click', () => {
        game_ws.endTurn();
    });
    /**
     * 绑定掷骰子事件
     */
    dom_btn_throwDice.on('click', () => {
        const point = dom_dicePoint.val();
        console.log("掷骰子",point);
        game_ws.throwDice();
    });
})();

/**
 * 根据消息,更新房间内用户
 * @param roomInfo
 */
export const updateRoomInfo = roomInfo => {
    console.log("updateRoomInfo", roomInfo);
    if (roomInfo) {
        clearUserInfo();
        for (let i = 1; i <= roomInfo.users.length; i++) {
            if (i > 4) break;
            const currentUserObj = getUserByIndex(i);
            currentUserObj.text(JSON.stringify(roomInfo.users[i - 1]));
        }
        const roomInfoOther = _.omit(roomInfo,"users");
        dom_roomInfo.text(JSON.stringify(roomInfoOther));
    }

};
/**
 * 根据消息,更新游戏的属性
 * @param gameInfo
 */
export const updateGameInfo = gameInfo => {
    console.log("updateGameInfo", gameInfo);
    if (gameInfo) {
        dom_gameInfo.text(JSON.stringify(gameInfo));
    }
};

const getUserByIndex = (i) => {
    switch (i) {
        case 1:
            return dom_user1;
        case 2:
            return dom_user2;
        case 3:
            return dom_user3;
        case 4:
            return dom_user4;
    }
};

const clearUserInfo = () => {
    dom_user1.text("");
    dom_user2.text("");
    dom_user3.text("");
    dom_user4.text("");
};
/**
 * 增加聊天记录(被动)
 */
export const addChatLog = message => {
    dom_chatLog.append(message);
    dom_chatLog.append("\n");
};
/**
 * 增加游戏日志
 */
export const addGameLog = message => {
    dom_gameLog.append(message);
    dom_gameLog.append("\n");
};
/**
 * 增加错误日志
 */
export const addErrorLog = message => {
    dom_errorLog.append(message);
    dom_errorLog.append("\n");
};
/**
 * 处理下一回合触发时方法
 * @param currentTurnUser
 * @param myUserId
 */
export const handleNextTurn = (currentTurnUser, myUserId) => {
    if(currentTurnUser.userId == myUserId){
        //如果是自己,则显示回合结束,和掷骰子
        dom_btn_endTurn.show(1000);
        dom_btn_throwDice.show(1000);
    }else{
        //不是则隐藏
        dom_btn_endTurn.hide();
        dom_btn_throwDice.hide();
    }
};
