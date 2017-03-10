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
        if (roomUsers[i].userId == userId) {
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
        if (roomUsers[i].userId == userId) {
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

    if (room.currentNum === 0) {
        //如果房间没人取消房主
        room.hostId = '';
        room.hostNickname = '';
    } else if (room.currentNum > 0 && currentUserId === room.hostId) {
        //检测当前用户是否为原房主,是的话,则房间易主
        room.hostId = room.users[0].userId;
        room.hostNickname = room.users[0].nickname;
    }
};