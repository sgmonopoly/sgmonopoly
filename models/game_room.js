/**
 * Created by yuanxiang on 2/28/17.
 */
'use strict';
class GAME_Room {
    constructor(roomNo, _roomName, _hostId, _hostNickname, _users, _currentNum, _maxNum = 4, _isGaming = false) {
        this.roomNo = roomNo;
        this.roomName = _roomName;
        this.hostId = _hostId;
        this.hostNickname = _hostNickname;
        this.currentNum = _currentNum;
        this.maxNum = _maxNum;
        this.users = _users;
        this.isGaming = _isGaming;
        this.gameInfo = {};
    }
}
module.exports = GAME_Room;