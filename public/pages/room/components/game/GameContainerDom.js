/**
 * Created by yuanxiang on 12/27/17.
 */
import Component from '../../../../common/myreact/Component'
import {initChessBoard} from '../../../game/js/chessboard'
import {initNetwork} from '../../../game/js/network'
import {getQueryString} from '../../../../common/utils/router'
import $ from 'jquery'

export default class GameContainerDom extends Component{

  constructor(){
    super()
    this.state = {}
    this.domId = "game"
  }

  render(){
    return `<canvas class="game" id="${this.domId}"></canvas>`
  }

  componentDidMount(){
    //初始化棋盘
    initChessBoard(this.domId, $('.top').width());
    //初始化网络
    const roomNo = getQueryString("roomNo");
    initNetwork(roomNo);
  }
}