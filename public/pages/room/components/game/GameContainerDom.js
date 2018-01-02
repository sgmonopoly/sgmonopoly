/**
 * Created by yuanxiang on 12/27/17.
 */
import {initChessBoard,stage, cjs, container2, getStage} from '../../../../api/pageHandler/Chessboard'
import Component from '../../../../common/myreact/Component'
import $ from 'jquery'
import 'yuki-createjs'
import {game_constants} from "../../../../api/common/GameConstants"

export default class GameContainerDom extends Component{

  static CANVAS_DOM_ID = "game"

  constructor(){
    super()
    this.state = {}
  }

  render(){
    return `<canvas class="game" id="${GameContainerDom.CANVAS_DOM_ID}"></canvas>`
  }

  componentDidMount(){
    //初始化棋盘
    initChessBoard(GameContainerDom.CANVAS_DOM_ID, $('.top').width());
  }

  /**
   * 准备棋子的图片和位置
   * @param userId
   * @param lordAvatar 头像地址
   * @param offset 偏移量
   * @param currentPosition 用户当前位置
   */
  pieceReady(userId, lordAvatar, offset, currentPosition = 1) {
    console.log("pieceReady", lordAvatar);
    if(!lordAvatar) {
      return;
    }
    const image = new Image();
    image.src = "../../.." + lordAvatar;
    const targetStage = getStage(currentPosition);
    image.onload = (event) => {
      const oldLord = container2.getChildByName(userId);
      if(oldLord){
        /*
         FIXME
         由于为了使断线的用户进来,直接显示最新的战局,这里是每次更新都会把君主的头像在最新的位置画一遍。
         这里就要把老的君主棋子删除,这里有个问题,页面会卡一下,有待将来解决
         */
        container2.removeChild(oldLord);
      }
      const lord = new cjs.Bitmap(event.target);//必须图片加载完成之后 img.onload之后执行
      lord.x = targetStage.s1.x + targetStage.s1.w - lord.getBounds().width * 0.3 * game_constants.global_scale - offset;
      lord.y = targetStage.s1.y;
      lord.alpha = 0.9;
      console.log("君主宽高:", lord.getBounds().width, lord.getBounds().height);
      lord.scaleX = 0.3 * game_constants.global_scale;
      lord.scaleY = 0.3 * game_constants.global_scale;
      lord.id = userId;
      lord.name = userId;
      console.log("add lord",lord);
      //加入场景
      container2.addChild(lord);

      stage.update();
    };

  }

  /**
   * 全局更新所有人的棋子位置
   * @param roomUsers
   */
  updatePiecePosition(roomUsers) {
    roomUsers.forEach(user => {
      this.pieceReady(user.userId, user.lordAvatar, user.offset, user.currentPosition);
    });
  }

  /**
   * 移动棋子
   * @param userId
   * @param midway 途径的节点
   * @param offset 头像偏移量
   */
  movePiece(userId, midway, offset) {
    const lord = container2.getChildByName(userId);
    console.log("move lord:",lord);
    let moveLord = cjs.Tween.get(lord);
    //数组第一个元素是原始起点,所以要移除
    midway.shift();
    midway.forEach(position => {
      const currentStage = getStage(position);
      const dest_x = currentStage.s1.x + currentStage.s1.w - lord.getBounds().width * 0.3 * game_constants.global_scale - offset;
      const dest_y = currentStage.s1.y;
      moveLord.to({x: dest_x, y: dest_y}, 300);
    });
  }

}