/**
 * Created by yuanxiang on 3/24/17.
 */
import {initChessBoard} from './js/chessboard'
import {initNetwork} from './js/network'
import {getQueryString} from '../../common/utils/router'


(function () {
    const roomNo = getQueryString("roomNo");
    initChessBoard();//初始化棋盘
    initNetwork(roomNo);//初始化网络
})();

