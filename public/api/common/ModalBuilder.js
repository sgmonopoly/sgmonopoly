/**
 * Created by yuanxiang on 1/3/18.
 */
'use strict'
import ModalDom from "../../pages/room/components/ModalDom"
import {gameAction} from "../../api/network"
/**
 * 提示框Builder类
 */
export default class ModalBuilder {
  static CLOSE() {
    new ModalDom({}).close()
  }

  static CREATE_DICE() {
    new ModalDom({
      message: "轮到你拉,请掷骰子",
      options: [{
        id: "option1",
        name: "掷骰子",
        processing: "正在投掷",
        cb: ()=> {
          gameAction.throwDiceForWalk()
        }
      }]
    }).open()
  }
}