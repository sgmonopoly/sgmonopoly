/**
 * Created by yuanxiang on 2/28/17.
 */
'use strict';
class GAME_Room {
    constructor(_roomName, _hostId, _hostNickname, _users, _currentNum, _maxNum = 4, _isGaming = false) {
        this._roomName = _roomName;
        this._hostId = _hostId;
        this._hostNickname = _hostNickname;
        this._currentNum = _currentNum;
        this._maxNum = _maxNum;
        this._users = _users;
        this._isGaming = _isGaming;
    }
}
module.exports = GAME_Room;