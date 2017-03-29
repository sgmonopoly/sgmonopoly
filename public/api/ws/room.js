/**
 * Created by yuanxiang on 3/24/17.
 */
import {io} from 'socket.io-client'
export let socket;
export const room_ws = {
    connect: roomId => {
        socket = io("/room/" + roomId);
    },
    enterRoom: (roomId, userId) => {
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
    addGameLog: (message) => {
        socket.emit("addGameLog", message);
    }
};
