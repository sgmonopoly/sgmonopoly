'use strict';

exports.init = (_socket, io) => {

    /**
     * 用rest接口修改昵称成功之后,客户端需要发送一条ws来更新socket对象
     */
    _socket.on('changeUserInfo', (nickname,avatar)=> {
        _socket.nickname = nickname;
        _socket.avatar = avatar;
    });

};
