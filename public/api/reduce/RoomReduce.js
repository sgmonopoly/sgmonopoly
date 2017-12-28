/**
 * Created by yuanxiang on 12/28/17.
 */
import {roomAction} from "../network"
import myUserId from '../domain/localData'
import * as domHanlder from '../pageHandler/domHanlder'
import * as canvasHandler from '../pageHandler/canvasHandler'
import * as moveEventHandler from '../pageHandler/MoveEventHandler'
import * as _ from 'lodash'
import {hero_info} from "../domain/heroInfo"

export default class RoomReduce {
  constructor(socket) {
    this.socket = socket
    this.socket.on("handshake", this.handshake)
    this.socket.on("room", this.room)
    this.socket.on("chat", this.chat)
    this.socket.on("gameLog", this.gameLog)
    this.socket.on("errorLog", this.errorLog)
    this.socket.on("alertLog", this.alertLog)
    this.socket.on("gameover", this.gameover)
    this.socket.on("nextTurn", this.nextTurn)
    this.socket.on("diceResultForWalk", this.diceResultForWalk)
    this.socket.on("eventOver", this.eventOver)
    this.socket.on("cityOwnerId", this.cityOwnerId)
    this.socket.on("startBattle", this.startBattle)

  }

  /**
   * WS连接握手通知,并直接发送进入房间的消息
   */
  handshake(message) {
    console.log("handshake message:", message);
    roomAction.enterGameRoom();
  }

  /**
   * 更新房间信息
   */
  room(roomInfo, gameInfo) {
    domHanlder.updateRoomInfo(roomInfo);
    domHanlder.updateGameInfo(gameInfo);
    canvasHandler.updatePiecePosition(roomInfo.users);
  }

  /**
   * 接收聊天记录
   */
  chat(message) {
    domHanlder.addChatLog(message);
  }

  /**
   * 接收游戏日志
   */
  gameLog(message) {
    domHanlder.addGameLog(message);
  }

  /**
   * 接收错误日志
   */
  errorLog(message) {
    domHanlder.addErrorLog(message);
  }

  /**
   * 接收警告日志
   */
  alertLog(message) {
    alert(message);
  }

  /**
   * 游戏结束
   */
  gameover() {
    alert("游戏结束");
  }

  /**
   * 下一回合时
   */
  nextTurn(currentTurnUser) {
    domHanlder.handleNextTurn(currentTurnUser);
  }

  /**
   * 掷骰子结果,之后走路
   */
  diceResultForWalk(result) {
    const point = result.point;
    const userId = result.userId;
    const midway = result.midway;
    const offset = result.offset;
    console.log("掷骰子点数:", point, "途径", midway);
    //根据点数走路

    canvasHandler.movePiece(userId, _.cloneDeep(midway), offset);

    moveEventHandler.targetPositionFeedback(midway.shift(), midway.pop(), result.userInfo);
  }

  /**
   * 后端通知前端任务已完成
   */
  eventOver(overType) {
    moveEventHandler.eventOverCallback(overType);
  }

  /**
   * 进入城市,返回城市主人ID
   */
  cityOwnerId(cityId, cityName, ownerId, ownerName, toll) {
    if (!ownerId) {
      //空城,显示是否购买
      domHanlder.showBuyCity(cityId, cityName);
    } else if (ownerId === myUserId) {
      //自己的城,显示是否升级
      domHanlder.showUpgradeCity(cityId, cityName);
    } else {
      //弹出选择付过路费,或者 攻打(攻打暂时不做)
      domHanlder.showPaytollOrAttack({
        cityId, cityName, ownerName, toll
      });
    }
  }

  /**
   * 开始攻城战
   * 进入选择武将界面
   */
  startBattle(battleInfo) {
    const getDetailHeroInfo = (heroIds) => {
      const detailHeros = [];
      heroIds.forEach(heroId => {
        detailHeros.push(hero_info[heroId]);
      });
      return detailHeros;
    };

    if (myUserId === battleInfo.atkUserId) {
      console.log("startBattle atkHeros", battleInfo.atkUserHeros);
      domHanlder.showSelectHero(battleInfo.battleId, getDetailHeroInfo(battleInfo.atkUserHeros));
    } else if (myUserId === battleInfo.defUserId) {
      console.log("startBattle defHeros", battleInfo.defUserHeros);
      domHanlder.showSelectHero(battleInfo.battleId, getDetailHeroInfo(battleInfo.defUserHeros));
    }

  }


}