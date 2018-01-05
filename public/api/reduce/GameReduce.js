/**
 * Created by yuanxiang on 12/28/17.
 */
'use strict'
import {currentOwnerUserId} from '../domain/LocalCacheData'
//import * as domHanlder from '../pageHandler/DomHandler'
import * as canvasHandler from '../pageHandler/canvasHandler'
import * as moveEventHandler from '../pageHandler/MoveEventHandler'
import * as _ from 'lodash'
import {hero_info} from "../domain/heroInfo"
import ModalBuilder from "../common/ModalBuilder"

/**
 * 从服务端接受请求,业务和游戏相关
 */
export default class GameReduce {
  constructor(socket, {playerContainer, chatContainer, controlContainer, gameLogContainer, infoContainer, gameContainer}) {
    this.socket = socket
    this.socket.on("gameOver", this.gameOver.bind(this))
    this.socket.on("nextTurn", this.nextTurn.bind(this))
    this.socket.on("diceResultForWalk", this.diceResultForWalk.bind(this))
    this.socket.on("eventOver", this.eventOver.bind(this))
    this.socket.on("cityOwnerId", this.cityOwnerId.bind(this))
    this.socket.on("startBattle", this.startBattle.bind(this))

    this.playerContainer = playerContainer
    this.chatContainer = chatContainer
    this.controlContainer = controlContainer
    this.gameLogContainer = gameLogContainer
    this.infoContainer = infoContainer
    this.gameContainer = gameContainer
  }

  /**
   * 游戏结束
   */
  gameOver() {
    alert("游戏结束")
  }

  /**
   * 下一回合时
   */
  nextTurn(currentTurnUser) {
    console.log("receive nextTurn ", currentTurnUser)
    //domHanlder.handleNextTurn(currentTurnUser)
    if (currentTurnUser.userId === currentOwnerUserId) {
      //如果是自己,则显示掷骰子
      ModalBuilder.CREATE_DICE()
    }
  }

  /**
   * 掷骰子结果,之后走路
   */
  diceResultForWalk({point, userId, midway, offset, userInfo}) {

    ModalBuilder.CLOSE()
    console.log("receive diceResultForWalk ", {point, userId, midway, offset})
    console.log("掷骰子点数:", point, "途径", midway)
    //根据点数走路
    this.gameContainer.movePiece(userId, _.cloneDeep(midway), offset)

    moveEventHandler.targetPositionFeedback(midway.shift(), midway.pop(), userInfo)
  }

  /**
   * 后端通知前端任务已完成
   */
  eventOver(overType) {
    console.log("receive eventOver ", overType)
    moveEventHandler.eventOverCallback(overType)
  }

  /**
   * 进入城市,返回城市主人ID
   */
  cityOwnerId(cityId, cityName, ownerId, ownerName, toll) {
    console.log("receive cityOwnerId ", cityId, cityName, ownerId, ownerName, toll)
    if (!ownerId) {
      //空城,显示是否购买
      //domHanlder.showBuyCity(cityId, cityName)
    } else if (ownerId === currentOwnerUserId) {
      //自己的城,显示是否升级
      //domHanlder.showUpgradeCity(cityId, cityName)
    } else {
      //弹出选择付过路费,或者 攻打(攻打暂时不做)
      /*domHanlder.showPaytollOrAttack({
        cityId, cityName, ownerName, toll
      })*/
    }
  }

  /**
   * 开始攻城战
   * 进入选择武将界面
   */
  startBattle({battleId, atkUserId, defUserId, atkUserHeros, defUserHeros}) {
    console.log("receive startBattle ", battleId, atkUserId, defUserId, atkUserHeros, defUserHeros)
    const getDetailHeroInfo = (heroIds) => {
      const detailHeros = []
      heroIds.forEach(heroId => {
        detailHeros.push(hero_info[heroId])
      })
      return detailHeros
    }

    if (currentOwnerUserId === atkUserId) {
      console.log("startBattle atkHeros", atkUserHeros)
      //domHanlder.showSelectHero(battleId, getDetailHeroInfo(atkUserHeros))
    } else if (currentOwnerUserId === defUserId) {
      console.log("startBattle defHeros", defUserHeros)
      //domHanlder.showSelectHero(battleId, getDetailHeroInfo(defUserHeros))
    }

  }

  //-----------------下面是只操作DOM

  showEndTurnBtn(){
    this.infoContainer.showEndTurnBtn()
  }


}