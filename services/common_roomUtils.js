/**
 * Created by yuanxiang on 3/8/17.
 */
/**
 * 根据ID快速获取用户
 * @param roomUsers
 * @param userId
 */
exports.getUser = (roomUsers, userId) => {
    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i]._userId == userId) {
            return roomUsers[i];
        }
    }
};
/**
 * 根据ID快速获取用户索引
 * @param roomUsers
 * @param userId
 * @returns {*}
 */
exports.getUserIndex = (roomUsers, userId) => {
    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i]._userId == userId) {
            return i;
        }
    }
};

/**
 * 房间检测,没有人就取消房主,还有人则选第一个人自动当房主
 * @param room
 * @param currentUserId
 */
exports.checkAndResetRoomHost = (room, currentUserId) => {

    if (room._currentNum === 0) {
        //如果房间没人取消房主
        room._hostId = '';
        room._hostNickname = '';
    } else if (room._currentNum > 0 && currentUserId === room._hostId) {
        //检测当前用户是否为原房主,是的话,则房间易主
        room._hostId = room._users[0]._userId;
        room._hostNickname = room._users[0]._nickname;
    }
};