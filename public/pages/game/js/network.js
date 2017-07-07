/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来连接ws
 */
import {socket, room_ws, game_ws} from '../../../api/ws/emit'
import {enterRoom} from '../../../api/rest/rooms'
import * as domHanlder from './domHanlder'
import * as canvasHandler from './canvasHandler'
import * as gameService from './gameService'
import myUserId from './localData'
import * as _ from 'lodash'
import {hero_info} from "./heroInfo"

/**
 * 连ws并接收ws任务
 * @param roomId
 */
const initNetwork = (roomId) => {

    console.log(`roomId:${roomId}`);

    //为了解决进入游戏后,刷新出错的问题,这里也执行一次enterRoom方法
    enterRoom(roomId)
        .then(() => {
            room_ws.connect(roomId);
            console.log("前端连接初始化成功");
            /**
             * WS连接握手通知,并直接发送进入房间的消息
             */
            socket.on("handshake", message => {
                console.log("handshake message:", message);
                room_ws.enterRoom(myUserId);
            });

            /**
             * 更新房间信息
             */
            socket.on("room", (roomInfo, gameInfo) => {
                domHanlder.updateRoomInfo(roomInfo);
                domHanlder.updateGameInfo(gameInfo);
                canvasHandler.updatePiecePosition(roomInfo.users);
            });

            /**
             * 接收聊天记录
             */
            socket.on("chat", message => {
                domHanlder.addChatLog(message);
            });

            /**
             * 接收游戏日志
             */
            socket.on("gameLog", message => {
                domHanlder.addGameLog(message);
            });

            /**
             * 接收错误日志
             */
            socket.on("errorLog", message => {
                domHanlder.addErrorLog(message);
            });

            /**
             * 接收警告日志
             */
            socket.on("alertLog", message => {
                alert(message);
            });

            /**
             * 成功开始游戏时
             */
            /*
             socket.on("startGameSuccess", roomUsers => {

             });
             */

            /**
             * 游戏结束
             */
            socket.on("gameover", () => {
                alert("游戏结束");
            });

            /**
             * 下一回合时
             */
            socket.on("nextTurn", currentTurnUser => {
                domHanlder.handleNextTurn(currentTurnUser);
            });

            /**
             * 掷骰子结果,之后走路
             */
            socket.on("diceResultForWalk", result => {
                const point = result.point;
                const userId = result.userId;
                const midway = result.midway;
                const offset = result.offset;
                console.log("掷骰子点数:", point, "途径", midway);
                //根据点数走路

                canvasHandler.movePiece(userId, _.cloneDeep(midway), offset);

                gameService.targetPositionFeedback(midway.shift(), midway.pop(), result.userInfo);
            });

            /**
             * 后端通知前端任务已完成
             */
            socket.on("eventOver", (overType) => {
                gameService.eventOverCallback(overType);
            });

            /**
             * 进入城市,返回城市主人ID
             */
            socket.on("cityOwnerId", (cityId, cityName, ownerId, ownerName, toll) => {
                if(!ownerId){
                    //空城,显示是否购买
                    domHanlder.showBuyCity(cityId, cityName);
                }else if(ownerId === myUserId){
                    //自己的城,显示是否升级
                    domHanlder.showUpgradeCity(cityId, cityName);
                }else{
                    //弹出选择付过路费,或者 攻打(攻打暂时不做)
                    domHanlder.showPaytollOrAttack({
                        cityId, cityName, ownerName, toll
                    });
                }
            });
            /**
             * 开始攻城战
             * 进入选择武将界面
             */
            socket.on("startBattle", (battleInfo) => {
                const getDetailHeroInfo = (heroIds) => {
                    const detailHeros = [];
                    heroIds.forEach(heroId => {
                        detailHeros.push(hero_info[heroId]);
                    });
                    return detailHeros;
                };

                if(myUserId === battleInfo.atkUserId){
                    console.log("startBattle atkHeros", battleInfo.atkUserHeros);
                    domHanlder.showSelectHero(battleInfo.battleId, getDetailHeroInfo(battleInfo.atkUserHeros));
                }else if(myUserId === battleInfo.defUserId){
                    console.log("startBattle defHeros", battleInfo.defUserHeros);
                    domHanlder.showSelectHero(battleInfo.battleId, getDetailHeroInfo(battleInfo.defUserHeros));
                }

            });

        })
        .catch((err) => {
            alert(err.response.data);
            console.log(err.response.data);
        });

};

export {initNetwork}