/**
 * Created by yuanxiang on 12/28/17.
 */
import {currentOwnerUserId} from '../domain/LocalCacheData'
import * as domHanlder from '../pageHandler/DomHandler'
import * as canvasHandler from '../pageHandler/canvasHandler'
import * as moveEventHandler from '../pageHandler/MoveEventHandler'
import * as _ from 'lodash'
import {hero_info} from "../domain/heroInfo"

export default class GameReduce {
  constructor(socket) {
    this.socket = socket
    this.socket.on("gameOver", this.gameOver)
    this.socket.on("nextTurn", this.nextTurn)
    this.socket.on("diceResultForWalk", this.diceResultForWalk)
    this.socket.on("eventOver", this.eventOver)
    this.socket.on("cityOwnerId", this.cityOwnerId)
    this.socket.on("startBattle", this.startBattle)
  }

  /**
   * 游戏结束
   */
  gameOver() {
    alert("游戏结束");
  }

  /**
   * 下一回合时
   */
  nextTurn(currentTurnUser) {
    console.log("receive nextTurn ", currentTurnUser)
    domHanlder.handleNextTurn(currentTurnUser);
  }

  /**
   * 掷骰子结果,之后走路
   */
  diceResultForWalk(result) {
    console.log("receive diceResultForWalk ", result)
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
    console.log("receive eventOver ", overType)
    moveEventHandler.eventOverCallback(overType);
  }

  /**
   * 进入城市,返回城市主人ID
   */
  cityOwnerId(cityId, cityName, ownerId, ownerName, toll) {
    console.log("receive cityOwnerId ", cityId, cityName, ownerId, ownerName, toll)
    if (!ownerId) {
      //空城,显示是否购买
      domHanlder.showBuyCity(cityId, cityName);
    } else if (ownerId === currentOwnerUserId) {
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
  startBattle({battleId, atkUserId, defUserId, atkUserHeros, defUserHeros}) {
    console.log("receive startBattle ", battleId, atkUserId, defUserId, atkUserHeros, defUserHeros)
    const getDetailHeroInfo = (heroIds) => {
      const detailHeros = [];
      heroIds.forEach(heroId => {
        detailHeros.push(hero_info[heroId]);
      });
      return detailHeros;
    };

    if (currentOwnerUserId === atkUserId) {
      console.log("startBattle atkHeros", atkUserHeros);
      domHanlder.showSelectHero(battleId, getDetailHeroInfo(atkUserHeros));
    } else if (currentOwnerUserId === defUserId) {
      console.log("startBattle defHeros", defUserHeros);
      domHanlder.showSelectHero(battleId, getDetailHeroInfo(defUserHeros));
    }

  }


}