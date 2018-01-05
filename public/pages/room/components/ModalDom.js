/**
 * Created by yuanxiang on 1/2/18.
 */
'use strict'
 import $ from 'jquery'

export default class ModalDom {
  /**
   *
   * @param message 显示的消息
   * @param options 按钮名称列表
   * options {
   *   id : id
   *   name:"操作名称"
   *   cb:回调函数
   * }
   */
  constructor({message, options}) {
    this.state = {
      message, options
    }
    if(message){
      this.init()
    }
  }

  /**
   * 开启modal
   */
  open() {
    $('.cd-popup').addClass('is-visible')
  }

  close() {
    $('.cd-popup').removeClass('is-visible')
  }

  /**
   * 初始化Modal
   */
  init() {
    this.messageDom = $('#messageDom')
    this.optionsDom = $('#optionsDom')

    this.messageDom.text(this.state.message)
    this.optionsDom.html(this.createOptions())

    /**
     * 定义关闭事件
     * 已注释,关闭应该不由用户控制
     */
    /*
    $('.cd-popup').on('click', function (event) {
      if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
        event.preventDefault()
        $(this).removeClass('is-visible')
      }
    })
    */

    /**
     * 绑定按钮事件
     */
    this.state.options.forEach(option => {
      $(`#${option.id}`).on('click', () => {
        option.cb()
      })
    })

  }

  createOptions() {
    return this.state.options.reduce((dom, option) => {
      return `${dom}<li><a href="#" id="${option.id}">${option.name}</a></li>`
    }, "")
  }

}