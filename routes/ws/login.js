'use strict';
const nicknameList = new Set();
let _io;
exports.init = (_socket,io) => {
    _io = io;
    console.log("login ws : ",_socket.id);
    /**
    输入昵称登入
     */
    _socket.on('login', (_nickname) => {
        console.log("login:",_nickname);
        if (nicknameList.has(_nickname)) {
            return _socket.emit('change_nickname_error', '此昵称已被人使用。');
        }
        _socket._nickname = _nickname;
        nicknameList.add(_nickname);
        _socket.emit('change_nickname_done', _nickname);
        updateOnlinePlayerCount();
    });
    /**
     * 更改昵称
     */
    _socket.on('change_nickname', (_oldNickname,_nickname) => {
        if (_oldNickname === _nickname || nicknameList.has(_nickname)) {
            return _socket.emit('change_nickname_error', '此昵称已被人使用。');
        }
        nicknameList.delete(_oldNickname);
        nicknameList.add(_nickname);
        _socket.emit('change_nickname_done', _nickname);
    });

};
/**
 * 更新全局在线人数
 * @param io
 */
const updateOnlinePlayerCount = () => {
    _io.sockets.emit("online_player_count",nicknameList.size);
};