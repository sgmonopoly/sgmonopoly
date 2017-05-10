/**
 * Created by yuanxiang on 4/25/17.
 * 处理棋盘canvas方法
 */
import 'yuki-createjs'
import * as _ from 'lodash'
import {game_constants} from "./game_constants"
import {map_info} from "./mapInfo"
import {stage,cjs,container2,gameStageCoodInfos} from './chessboard'

/**
 * 开始游戏时,准备棋子
 * @param lordAvatar 头像地址
 * @param offset 偏移量
 */
const pieceReady = (lordAvatar, offset) => {
    console.log("pieceReady",lordAvatar);
    const image = new Image();
    image.src = "../../.." + lordAvatar;
    const firstStage = gameStageCoodInfos[0];
    image.onload = (event) => {
        const lord = new cjs.Bitmap(event.target);//必须图片加载完成之后 img.onload之后执行
        const x = firstStage.s1.x+firstStage.s1.w-event.target.getBounds().width*0.3 * game_constants.global_scale - offset;
        lord.x = x;
        lord.y = firstStage.s1.y;
        lord.alpha = 0.9;
        console.log("君主:", lord.getBounds().width, lord.getBounds().height);
        lord.scaleX = 0.3 * game_constants.global_scale;
        lord.scaleY = 0.3 * game_constants.global_scale;
        //加入场景
        container2.addChild(lord);

        stage.update();
    };

};

export {pieceReady}