import JqueryComponent from '../../../common/myreact/JqueryComponent'
import GameLogDom from './GameLogDom'
import ChatDom from './ChatDom'

export default class RightContainerDom extends JqueryComponent {

  constructor(id) {
    super(id)
    this.state = {}
    this.subComponent = {
      gameLogDom: new GameLogDom(),
      chatDom: new ChatDom()
    }
  }

  componentDidMount() {
    this.subComponent.gameLogDom.componentDidMount()
    this.subComponent.chatDom.componentDidMount()
  }

  render() {
    return `<div>
                    ${this.subComponent.gameLogDom.render()}
                </div><div>
                    ${this.subComponent.chatDom.render()}
                </div>`
  }
}
