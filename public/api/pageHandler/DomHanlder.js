/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来操作dom
 */
import $ from 'jquery'
import * as _ from 'lodash'
import {roomAction, gameAction} from '../network'
import myUserId from '../domain/localData'

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
const dom_btn_paytollOrAttack_paytoll = $("#paytollOrAttack_paytoll");
const dom_btn_paytollOrAttack_attack = $("#paytollOrAttack_attack")
//赌博
const dom_bet_show = $("#bet_show");
const dom_bet_money = $("#bet_money");
const dom_btn_bet_confirm = $("#bet_confirm");
const dom_btn_bet_cancel = $("#bet_cancel");
//选择武将
const dom_select_hero_show = $("#select_hero_show");
const dom_select_hero_value = $("#select_hero_value");
const dom_battle_id = $("#battle_id");
const dom_btn_select_hero_confirm = $("#select_hero_confirm");
//默认紧急军情
const dom_default_situation = $("#default_situation");
//默认锦囊妙计
const dom_default_suggestion = $("#default_suggestion");



(function () {
    /**
     * 绑定退出房间事件
     */
    dom_btn_quitRoom.on('click', () => {
        roomAction.quitRoom();
    });
    /**
     * 绑定发送聊天事件
     */
    dom_btn_sendMessage.on('click', () => {
        const message = dom_chatMessage.val();
        if(message) roomAction.addChatMessage(message);
    });
    /**
     * 绑定准备好了事件
     */
    dom_btn_toReady.on('click', () => {
        roomAction.toReady();
    });
    /**
     * 绑定取消准备事件
     */
    dom_btn_toUnready.on('click', () => {
        roomAction.toUnready();
    });
    /**
     * 绑定开始游戏事件
     */
    dom_btn_startGame.on('click', () => {
        gameAction.startGame();
    });
    //默认隐藏 回合结束 和 掷骰子
    dom_btn_endTurn.hide();
    dom_btn_throwDice.hide();
    /**
     * 绑定回合结束事件
     */
    dom_btn_endTurn.on('click', () => {
        gameAction.endTurn();
        dom_btn_endTurn.hide();
    });
    /**
     * 绑定回合结束事件2,临时的
     */
    dom_btn_endTurn2.on('click', () => {
        gameAction.endTurn();
    });
    /**
     * 绑定掷骰子事件
     */
    dom_btn_throwDice.on('click', () => {
        const point = dom_dicePoint.val();
        console.log("掷骰子",point);
        gameAction.throwDiceForWalk(point);
    });

    //默认隐藏购买兵力界面
    dom_buyTroop_show.hide();
    dom_btn_buyTroop_confirm.on('click', () => {
        gameAction.payTroop(dom_buyTroop_value.val());
        //showEndTurnBtn();//后端调用显示回合结束按钮
    });
    dom_btn_buyTroop_cancel.on('click', () => {
        dom_buyTroop_show.hide();
        showEndTurnBtn();//前端直接调用显示回合结束按钮
    });

    //默认隐藏购买武将界面
    dom_buyHero_show.hide();
    dom_btn_buyHero_confirm.on('click', () => {
        gameAction.payHero(dom_buyHero_value.val());
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
        gameAction.buyCity(stageId);
    });
    dom_btn_buyCity_cancel.on('click', () => {
        dom_buyCity_show.hide();
        showEndTurnBtn();
    });
    //默认隐藏升级城市界面
    dom_upgradeCity_show.hide();
    dom_btn_upgradeCity_confirm.on('click', () => {
        const stageId = dom_upgradeCity_id.val();
        gameAction.upgradeCity(stageId);
    });
    dom_btn_upgradeCity_cancel.on('click', () => {
        dom_upgradeCity_show.hide();
        showEndTurnBtn();
    });
    //默认隐藏付费攻打界面
    dom_paytollOrAttack_show.hide();
    dom_btn_paytollOrAttack_paytoll.on('click', () => {
        const stageId = dom_paytollOrAttack_cityid.val();
        gameAction.payToll(stageId);
    });
    dom_btn_paytollOrAttack_attack.on('click', () => {
        const stageId = dom_paytollOrAttack_cityid.val();
        gameAction.readyForBattle(stageId);
    });
    //默认赌博界面不出现
    dom_bet_show.hide();
    dom_btn_bet_confirm.on('click', () => {
        const money = dom_bet_money.val();
        gameAction.bet(money);
    });
    dom_btn_bet_cancel.on('click', () => {
        dom_bet_show.hide();
        showEndTurnBtn();
    });

    //默认隐藏选择武将
    dom_select_hero_show.hide();
    dom_btn_select_hero_confirm.on('click', () => {
        const heroId = dom_select_hero_value.val();
        const battleId = dom_battle_id.val();
        gameAction.heroSelected(battleId, heroId);
        dom_select_hero_show.hide();
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
    dom_buyTroop_value.val(500);
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
    dom_buyHero_value.val(1);
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

/**
 * 显示赌博
 */
export const showBet = () => {
    dom_bet_money.val(0);
    dom_bet_show.show(1000);
};
/**
 * 隐藏赌博
 */
export const hideBet = () => {
    dom_bet_show.hide();
};

/**
 * 显示要选择的武将
 * @param herosDetail
 * @param isAtk true是攻方,false是守方
 */
export const showSelectHero = (battleId, herosDetail) => {
    dom_select_hero_value.empty();
    dom_battle_id.val("");
    //前端显示武将列表
    herosDetail.forEach(hero => {
        dom_select_hero_value.append(`<option value="${hero.cardId}">${hero.cardName}</option>`);
    });
    dom_battle_id.val(battleId);
    dom_select_hero_show.show(1000);
};

/**
 * 返回默认紧急军情
 * @returns {*}
 */
export const getDefaultSituation = () => {
    let value = dom_default_situation.val();
    if(value){
        value = parseInt(value);
        if(_.isNumber(value)){
            return value;
        }
    }
    return null;
};

/**
 * 返回默认锦囊妙计
 * @returns {*}
 */
export const getDefaultSuggestion = () => {
    let value = dom_default_suggestion.val();
    if(value){
        value = parseInt(value);
        if(_.isNumber(value)){
            return value;
        }
    }
    return null;
};