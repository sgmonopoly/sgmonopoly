'use strict'
import $ from 'jquery'
import Component from '../../../common/myreact/Component'
import {roomAction} from "../../../../public/api/network"
export default class ChatDom extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      isScrollToBottom: true
    }
  }

  setState(obj = {}) {
    //状态可以直接修改,这里
    if (obj !== {}) {
      super.setState(obj)
    }
    this.refresh()
  }

  getChatDom() {
    return this.state.messages.reduce((dom, message) => {
      return `${dom}<div class="message">${message}</div>`
    }, "")
  }

  addMessage(content = "") {
    if (content) {
      this.state.messages.push(content)
      this.setState()
    }
  }

  clearMessage() {
    const messages = []
    this.setState({messages})
  }

  setIsScrollToBottom(isStb = true) {
    this.state.isScrollToBottom = !!isStb
  }

  componentDidMount() {
    //渲染之后,获取DOM
    this.chatContainer = $('#chat-container')

    const sendBtn = $('#chat-btn-sendmessage')
    const sendContent = $('#chat-sendmessage')

    /**
     * 绑定发送聊天事件
     */
    sendBtn.on('click', () => {
      const message = sendContent.val()
      if (message) {
        roomAction.addChatMessage(message)
      }
      sendContent.val("")
    })
    //回车事件
    sendContent.on('keydown', event => {
      if(event.keyCode == "13") sendBtn.click()
    })
  }

  render() {
    return `<div class="chat">
                    <div class="title">聊天记录</div>
                    <div id="chat-container" class="chat-container">
                        ${this.getChatDom()}
                    </div>
                    <div class="chat-box">
                        <input type="text" id="chat-sendmessage"/><button id="chat-btn-sendmessage">发送</button>
                    </div>
                </div>`
  }

  refresh() {
    this.chatContainer.html(this.getChatDom())
    if (this.state.isScrollToBottom) {
      this.chatContainer[0].scrollTop = this.chatContainer[0].scrollHeight
    }
  }
}
