/**
 * Created by yuanxiang on 12/27/17.
 */
import {initChessBoard} from '../../../../api/network'
import Component from '../../../../common/myreact/Component'
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
  }
}