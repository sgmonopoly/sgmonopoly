import $ from 'jquery'
export default class ChatDom {
    constructor(){
        this.messages = []
        this.isScrollToBottom = true
        this.chatContainer = $('#chat-container')
    }

    getChatDom(){
        return this.messages.reduce((dom,message) => {
            return `${dom}<div class="message">${message}</div>`
        }, "")
    }

    addMessage(content = ""){
        if(content){
            this.messages.push(content)
            this.chatContainer.html(this.getChatDom())
            if(this.isScrollToBottom){
                this.chatContainer[0].scrollTop = this.chatContainer[0].scrollHeight
            }
        }
    }

    clearMessage(){
        this.messages = []
    }

    setIsScrollToBottom(isStb = true){
        this.isScrollToBottom = !!isStb
    }

    render(){
        return `<div class="chat">
                    <div class="title">聊天记录</div>
                    <div id="chat-container" class="chat-container">
                        ${this.getChatDom()}
                    </div>
                    <div class="chat-box">
                        <input type="text" /><button>发送</button>
                    </div>
                </div>`
    }
}
