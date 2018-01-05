/**
 * Created by yuanxiang on 12/29/17.
 */
'use strict'
import Component from '../../../../common/myreact/Component'
import {roomAction, gameAction} from "../../../../../public/api/network"
import $ from 'jquery'

/**
 * 下方控制区
 * 对应CenterContainerDom(infoContainer) 中的controlDom
 */
export default class ControlContainerDom extends Component{
  constructor(isGameStart = false){
    super()
    this.state = {
      isGameStart
    }
    this.readyBtn = null
    this.startGameBtn = null
  }

  setState(obj = {}){
    super.setState(obj)
    this.refresh()
  }

  refresh(){
    //开始游戏后,不显示开始游戏按钮和准备按钮
    if(this.state.isGameStart){
      this.readyBtn.hide()
      this.startGameBtn.hide()

      /**
       * 绑定回合结束事件
       */
      this.turnOverBtn.on('click', () => {
        gameAction.endTurn()
        this.turnOverBtn.hide()
      })

    }else{

      this.readyBtn.show()
      this.startGameBtn.show()

      /**
       * 绑定准备和未准备事件
       */
      this.readyBtn.on('click', () => {
        roomAction.readyCheck()
      })

      /**
       * 绑定开始游戏事件
       */
      this.startGameBtn.on('click', () => {
        gameAction.startGame()
      })
    }
  }

  componentDidMount(){
    this.readyBtn = $('#readyBtn')
    this.startGameBtn = $('#startGameBtn')
    this.turnOverBtn = $('#turnOverBtn')
    this.refresh()
  }

  /**
   * 修改准备按钮的字,变成取消准备
   */
  ready(){
    this.readyBtn.text("取消准备")
  }

  /**
   * 修改准备按钮的字,变成准备好了
   */
  unready(){
    this.readyBtn.text("准备好了")
  }

  showEndTurnBtn(){
    this.turnOverBtn.show()
  }

  render(){
    return `<div class="control">
            <button id="readyBtn">准备好了</button><button id="startGameBtn">开始游戏</button>
            <button id="turnOverBtn">结束回合</button>
            </div>`
  }

}