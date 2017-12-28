/**
 * Created by yuanxiang on 12/28/17.
 */
export default class GameAction {
  constructor(socket) {
    this.socket = socket
  }

  addGameLog(message) {
    this.socket.emit("addGameLog", message);
  }

  startGame() {
    this.socket.emit("startGame");
  }

  endTurn() {
    this.socket.emit("endTurn");
  }

  throwDiceForWalk(point) {//point为空则随机
    this.socket.emit("throwDiceForWalk", point);
  }

  throw3Dices(point1, point2, point3) {
    this.socket.emit("throw3Dices", point1, point2, point3);
  }

  buyCity(stageId) {
    this.socket.emit("buyCity", stageId);
  }

  payToll(stageId) {
    this.socket.emit("payToll", stageId);
  }

  payTroop(troop) {
    this.socket.emit("payTroop", troop);
  }

  payHero(num = 1) {//num为空=1
    this.socket.emit("payHero", num);
  }

  upgradeCity(stageId, ifPay = true, level = 1) {
    this.socket.emit("upgradeCity", stageId, ifPay, level);
  }

  inCity(stageId) {
    this.socket.emit("inCity", stageId);
  }

  inPark() {
    this.socket.emit("inPark");
  }

  inMassage() {
    this.socket.emit("inMassage");
  }

  inTax() {
    this.socket.emit("inTax");
  }

  inCottage() {
    this.socket.emit("inCottage");
  }

  inIsland() {
    this.socket.emit("inIsland");
  }

  inBet() {
    this.socket.emit("inBet");
  }

  bet(money) {
    this.socket.emit("bet", money);
  }

  inStart() {
    this.socket.emit("inStart");
  }

  inSituation(index) {
    this.socket.emit("inSituation", index);
  }

  inSuggestion(index) {
    this.socket.emit("inSuggestion", index);
  }

  passByStart() {
    this.socket.emit("passByStart");
  }

  readyForBattle(stageId) {
    this.socket.emit("readyForBattle", stageId);
  }

  heroSelected(battleId, heroId) {
    this.socket.emit("heroSelected", battleId, heroId);
  }
}