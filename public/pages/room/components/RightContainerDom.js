import JqueryComponent from '../../../common/myreact/JqueryComponent'
import GameLogDom from './GameLogDom'
import ChatDom from './ChatDom'

export default class RightContainerDom extends JqueryComponent{

    constructor(id){
        super(id)
        this.state = {
            gameLogDom: new GameLogDom(),
            chatDom: new ChatDom()
        }
    }

    addLog(content = ''){
        this.state.gameLogDom.addLog(content)
    }

    clearLog(){
        this.state.gameLogDom.clearLog()
        super.refresh()
    }

    isScrollToBottomForLog(isStb){
        this.state.gameLogDom.setIsScrollToBottom(isStb)
    }

    render(){
        return `<div>
                    ${this.state.gameLogDom.render()}
                </div><div>
                    ${this.state.chatDom.render()}
                </div>`
    }
}
