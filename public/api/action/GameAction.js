/**
 * Created by yuanxiang on 12/28/17.
 * 发送请求,业务和游戏相关
 */
'use strict'
export default class GameAction {
  constructor(socket) {
    this.socket = socket
  }

  addGameLog(message) {
    console.log("send addGameLog:", message)
    this.socket.emit("addGameLog", message)
  }

  startGame() {
    console.log("send startGame")
    this.socket.emit("startGame")
  }

  endTurn() {
    console.log("send endTurn")
    this.socket.emit("endTurn")
  }

  /**
   * 扔骰子走路
   * @param point 点数为空则随机
   */
  throwDiceForWalk(point) {
    console.log("send throwDiceForWalk:", point)
    this.socket.emit("throwDiceForWalk", point)
  }

  throw3Dices(point1, point2, point3) {
    console.log("send throw3Dices:", point1, point2, point3)
    this.socket.emit("throw3Dices", point1, point2, point3)
  }

  buyCity(stageId) {
    console.log("send buyCity:", stageId)
    this.socket.emit("buyCity", stageId)
  }

  payToll(stageId) {
    console.log("send payToll:", stageId)
    this.socket.emit("payToll", stageId)
  }

  payTroop(troop) {
    console.log("send payTroop:", troop)
    this.socket.emit("payTroop", troop)
  }

  payHero(num = 1) {//num为空=1
    console.log("send payHero:", num)
    this.socket.emit("payHero", num)
  }

  upgradeCity(stageId, ifPay = true, level = 1) {
    console.log("send upgradeCity:", stageId, ifPay, level)
    this.socket.emit("upgradeCity", stageId, ifPay, level)
  }

  inCity(stageId) {
    console.log("send inCity:", stageId)
    this.socket.emit("inCity", stageId)
  }

  inPark() {
    console.log("send inPark")
    this.socket.emit("inPark")
  }

  inMassage() {
    console.log("send inMassage")
    this.socket.emit("inMassage")
  }

  inTax() {
    console.log("send inTax")
    this.socket.emit("inTax")
  }

  inCottage() {
    console.log("send inCottage")
    this.socket.emit("inCottage")
  }

  inIsland() {
    console.log("send inIsland")
    this.socket.emit("inIsland")
  }

  inBet() {
    console.log("send inBet")
    this.socket.emit("inBet")
  }

  bet(money) {
    console.log("send bet:", money)
    this.socket.emit("bet", money)
  }

  inStart() {
    console.log("send inStart")
    this.socket.emit("inStart")
  }

  inSituation(index) {
    console.log("send inSituation:", index)
    this.socket.emit("inSituation", index)
  }

  inSuggestion(index) {
    console.log("send inSuggestion:", index)
    this.socket.emit("inSuggestion", index)
  }

  passByStart() {
    console.log("send passByStart")
    this.socket.emit("passByStart")
  }

  readyForBattle(stageId) {
    console.log("send readyForBattle:", stageId)
    this.socket.emit("readyForBattle", stageId)
  }

  heroSelected(battleId, heroId) {
    console.log("send heroSelected:", battleId, heroId)
    this.socket.emit("heroSelected", battleId, heroId)
  }
}