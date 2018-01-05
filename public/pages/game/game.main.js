/**
 * Created by yuanxiang on 3/24/17.
 */
'use strict'
import {initChessBoard} from '../../api/pageHandler/Chessboard'
import {initNetwork} from '../../api/network'
import {getQueryString} from '../../common/utils/router'


(function () {
    const roomNo = getQueryString("roomNo")
    initChessBoard()//初始化棋盘
    initNetwork(roomNo)//初始化网络
})()

