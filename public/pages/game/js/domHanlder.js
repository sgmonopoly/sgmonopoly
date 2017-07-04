/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来操作dom
 */
import $ from 'jquery'
import * as _ from 'lodash'
import {socket, room_ws, game_ws} from '../../../api/ws/emit'
import myUserId from './localData'

const dom_chatLog = $("#chatLog");
const dom_errorLog = $("#errorLog");
const dom_gameLog = $("#gameLog");
const dom_user1 = $("#user1");
const dom_user2 = $("#user2");
const dom_user3 = $("#user3");
const dom_user4 = $("#user4");
const dom_roomInfo = $("#roomInfo");
const dom_gameInfo = $("#gameInfo");
const dom_chatMessage = $("#chatMessage");
const dom_dicePoint = $("#dicePoint");

const dom_btn_quitRoom = $("#quitRoom");
const dom_btn_sendMessage = $("#sendMessage");
const dom_btn_toReady = $("#toReady");
const dom_btn_toUnready = $("#toUnready");
const dom_btn_startGame = $("#startGame");
const dom_btn_endTurn = $("#endTurn");
const dom_btn_endTurn2 = $("#endTurn2");
const dom_btn_throwDice = $("#throwDice");

//购买兵力
const dom_buyTroop_show = $("#buyTroop_show");
const dom_buyTroop_value = $("#buyTroop_value");
const dom_btn_buyTroop_confirm = $("#buyTroop_confirm");
const dom_btn_buyTroop_cancel = $("#buyTroop_cancel");
//购买武将
const dom_buyHero_show = $("#buyHero_show");
const dom_buyHero_value = $("#buyHero_value");
const dom_btn_buyHero_confirm = $("#buyHero_confirm");
const dom_btn_buyHero_cancel = $("#buyHero_cancel");
//购买城市
const dom_buyCity_show = $("#buyCity_show");
const dom_buyCity_name = $("#buyCity_name");
const dom_buyCity_id = $("#buyCity_id");
const dom_btn_buyCity_confirm = $("#buyCity_confirm");
const dom_btn_buyCity_cancel = $("#buyCity_cancel");
//升级城市
const dom_upgradeCity_show = $("#upgradeCity_show");
const dom_upgradeCity_name = $("#upgradeCity_name");
const dom_upgradeCity_id = $("#upgradeCity_id");
const dom_btn_upgradeCity_confirm = $("#upgradeCity_confirm");
const dom_btn_upgradeCity_cancel = $("#upgradeCity_cancel");
//付过路费或者攻打
const dom_paytollOrAttack_show = $("#paytollOrAttack_show");
const dom_paytollOrAttack_cityname = $("#paytollOrAttack_cityname");
const dom_paytollOrAttack_owner = $("#paytollOrAttack_owner");
const dom_paytollOrAttack_toll = $("#paytollOrAttack_toll");
const dom_paytollOrAttack_cityid = $("#paytollOrAttack_cityid");
const dom_paytollOrAttack_userid = $("#paytollOrAttack_userid");
const dom_btn_paytollOrAttack_paytoll = $("#paytollOrAttack_paytoll");
const dom_btn_paytollOrAttack_attack = $("#paytollOrAttack_attack");


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
    dom_btn_sendMessage.on('click', () => {
        const message = dom_chatMessage.val();
        if(message) room_ws.addChatMessage(message);
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
        dom_btn_endTurn.hide();
    });
    /**
     * 绑定回合结束事件2,临时的
     */
    dom_btn_endTurn2.on('click', () => {
        game_ws.endTurn();
    });
    /**
     * 绑定掷骰子事件
     */
    dom_btn_throwDice.on('click', () => {
        const point = dom_dicePoint.val();
        console.log("掷骰子",point);
        game_ws.throwDiceForWalk(point);
    });

    //默认隐藏购买兵力界面
    dom_buyTroop_show.hide();
    dom_btn_buyTroop_confirm.on('click', () => {
        game_ws.payTroop(dom_buyTroop_value.val());
        //showEndTurnBtn();//后端调用显示回合结束按钮
    });
    dom_btn_buyTroop_cancel.on('click', () => {
        dom_buyTroop_show.hide();
        showEndTurnBtn();//前端直接调用显示回合结束按钮
    });

    //默认隐藏购买武将界面
    dom_buyHero_show.hide();
    dom_btn_buyHero_confirm.on('click', () => {
        game_ws.payHero(dom_buyHero_value.val());
        //showEndTurnBtn();
    });
    dom_btn_buyHero_cancel.on('click', () => {
        dom_buyHero_show.hide();
        showEndTurnBtn();
    });

    //默认隐藏购买城市界面
    dom_buyCity_show.hide();
    dom_btn_buyCity_confirm.on('click', () => {
        const stageId = dom_buyCity_id.val();
        game_ws.buyCity(stageId);
    });
    dom_btn_buyCity_cancel.on('click', () => {
        dom_buyCity_show.hide();
        showEndTurnBtn();
    });
    //默认隐藏升级城市界面
    dom_upgradeCity_show.hide();
    dom_btn_upgradeCity_confirm.on('click', () => {
        const stageId = dom_upgradeCity_id.val();
        game_ws.upgradeCity(stageId);
    });
    dom_btn_upgradeCity_cancel.on('click', () => {
        dom_upgradeCity_show.hide();
        showEndTurnBtn();
    });
    //默认隐藏付费攻打界面
    dom_paytollOrAttack_show.hide();
    dom_btn_paytollOrAttack_paytoll.on('click', () => {
        const stageId = dom_paytollOrAttack_cityid.val();
        game_ws.payToll(stageId);
    });
    dom_btn_paytollOrAttack_attack.on('click', () => {
        //TODO 攻打先不做
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
        const roomInfoOther = _.omit(_.cloneDeep(roomInfo),"users");
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
    //滚动条始终在下面
    dom_chatLog[0].scrollTop = dom_chatLog[0].scrollHeight;
    dom_chatLog.append("\n");
};
/**
 * 增加游戏日志
 */
export const addGameLog = message => {
    dom_gameLog.append(message);
    //滚动条始终在下面
    dom_gameLog[0].scrollTop = dom_gameLog[0].scrollHeight;
    dom_gameLog.append("\n");
};
/**
 * 增加错误日志
 */
export const addErrorLog = message => {
    dom_errorLog.append(message);
    //滚动条始终在下面
    dom_errorLog[0].scrollTop = dom_errorLog[0].scrollHeight;
    dom_errorLog.append("\n");
};
/**
 * 处理下一回合触发时方法
 * @param currentTurnUser
 */
export const handleNextTurn = (currentTurnUser) => {
    if(currentTurnUser.userId === myUserId){
        //如果是自己,则显示掷骰子
        //dom_btn_endTurn.show(1000);
        dom_btn_throwDice.show(1000);
    }else{
        //不是则隐藏
        //dom_btn_endTurn.hide();
        dom_btn_throwDice.hide();
    }
};
/**
 * 显示回合结束按钮
 */
export const showEndTurnBtn = () => {
    dom_btn_endTurn.show(1000);
};

/**
 * 显示购买兵力
 */
export const showBuyTroop = () => {
    dom_buyTroop_show.show(1000);
};

/**
 * 隐藏购买兵力
 */
export const hideBuyTroop = () => {
    dom_buyTroop_show.hide();
};

/**
 * 显示招将
 */
export const showBuyHero = () => {
    dom_buyHero_show.show(1000);
};
/**
 * 隐藏招将
 */
export const hideBuyHero = () => {
    dom_buyHero_show.hide();
};

/**
 * 显示购买城市
 */
export const showBuyCity = (cityId, cityName) => {
    dom_buyCity_show.show(1000);
    dom_buyCity_name.text(cityName);
    dom_buyCity_id.val(cityId);
};
/**
 * 隐藏购买城市
 */
export const hideBuyCity = () => {
    dom_buyCity_show.hide();
};

/**
 * 显示购买城市
 */
export const showUpgradeCity = (cityId, cityName) => {
    dom_upgradeCity_show.show(1000);
    dom_upgradeCity_name.text(cityName);
    dom_upgradeCity_id.val(cityId);
};
/**
 * 隐藏购买城市
 */
export const hideUpgradeCity = () => {
    dom_upgradeCity_show.hide();
};

/**
 * 显示付过路费或者攻打选项
 */
export const showPaytollOrAttack = (obj) => {
    dom_paytollOrAttack_show.show(1000);
    dom_paytollOrAttack_cityname.text(obj.cityName);
    dom_paytollOrAttack_owner.text(obj.ownerName);
    dom_paytollOrAttack_toll.text(obj.toll);
    dom_paytollOrAttack_cityid.val(obj.cityId);
};
/**
 * 隐藏付过路费或者攻打选项
 */
export const hidePaytollOrAttack = () => {
    dom_paytollOrAttack_show.hide();
};