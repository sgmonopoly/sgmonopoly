/**
 * Created by yuanxiang on 12/27/17.
 */
import {initChessBoard} from '../../../../api/pageHandler/Chessboard'
import Component from '../../../../common/myreact/Component'
import $ from 'jquery'

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
}