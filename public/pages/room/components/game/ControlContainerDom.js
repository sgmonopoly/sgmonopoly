/**
 * Created by yuanxiang on 12/29/17.
 */
import Component from '../../../../common/myreact/Component'
import {roomAction, gameAction} from "../../../../../public/api/network"
import $ from 'jquery'

export default class ControlContainerDom extends Component{
  constructor(){
    super()
    this.state = {}
    this.readyBtn = null
    this.startGameBtn = null
  }

  componentDidMount(){
    this.readyBtn = $('#readyBtn')
    this.startGameBtn = $('#startGameBtn')
    /**
     * 绑定准备和未准备事件
     */
    this.readyBtn.on('click', () => {
      roomAction.readyCheck()
    });

    /**
     * 绑定开始游戏事件
     */
    this.startGameBtn.on('click', () => {
      gameAction.startGame()
    });
  }

  ready(){
    this.readyBtn.text("取消准备")
  }

  unready(){
    this.readyBtn.text("准备好了")
  }

  render(){
    return `<div class="control">
            <button id="readyBtn">准备好了</button><button id="startGameBtn">开始游戏</button>
            </div>`
  }

}