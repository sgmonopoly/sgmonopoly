/**
 * Created by yuanxiang on 3/24/17.
 */
let socket;
socket = io();
const room_ws = {
    connect: roomId => {
        socket = io("/room/" + roomId);
    },
    enterRoom: (userId) => {
        socket.emit("enterRoom", userId);
    },
    quitRoom: (isKick = false) => {
        socket.emit("quitRoom", isKick);
    },
    toReady: () => {
        socket.emit("toReady");
    },
    toUnready: () => {
        socket.emit("toUnready");
    },
    kick: (kickUserId) => {
        socket.emit("kick", kickUserId);
    },
    addChatMessage: (message) => {
        socket.emit("addChatMessage", message);
    },
};
const game_ws = {
    addGameLog: (message) => {
        socket.emit("addGameLog", message);
    },
    startGame: () => {
        socket.emit("startGame");
    },
    endTurn: () => {
        socket.emit("endTurn");
    },
    throwDiceForWalk: (point) => {//point为空则随机
        socket.emit("throwDiceForWalk", point);
    },
    throw3Dices: (point1,point2,point3) => {
        socket.emit("throw3Dices",point1,point2,point3);
    },
    buyCity: (stageId) => {
        socket.emit("buyCity",stageId);
    },
    payToll: (stageId) => {
        socket.emit("payToll",stageId);
    },
    payTroop: (troop) => {
        socket.emit("payTroop", troop);
    },
    payHero: (num = 1) => {//num为空=1
        socket.emit("payHero", num);
    },
    upgradeCity: (stageId, ifPay = true, level = 1) => {
        socket.emit("upgradeCity",stageId, ifPay, level);
    },
    inCity: (stageId) => {
        socket.emit("inCity", stageId);
    },
    inPark: () => {
        socket.emit("inPark");
    },
    inMassage: () => {
        socket.emit("inMassage");
    },
    inTax: () => {
        socket.emit("inTax");
    },
    inCottage: () => {
        socket.emit("inCottage");
    },
    inIsland: () => {
        socket.emit("inIsland");
    },
    inBet: () => {
        socket.emit("inBet");
    },
    bet: (money) => {
        socket.emit("bet", money);
    },
    inStart: () => {
        socket.emit("inStart");
    },
    passByStart: () => {
        socket.emit("passByStart");
    }

};

export {socket,room_ws,game_ws}