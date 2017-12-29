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

    componentDidMount(){
        this.state.gameLogDom.componentDidMount()
        this.state.chatDom.componentDidMount()
    }

    render(){
        return `<div>
                    ${this.state.gameLogDom.render()}
                </div><div>
                    ${this.state.chatDom.render()}
                </div>`
    }
}
