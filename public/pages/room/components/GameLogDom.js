import $ from 'jquery'
import Component from '../../../common/myreact/Component'
export default class GameLogDom extends Component {
  constructor() {
    super()
    this.state = {
      logs: [],
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

  getLogDom() {
    return this.state.logs.reduce((dom, log) => {
      return `${dom}<div class="log">${log}</div>`
    }, "")
  }

  addLog(content = "") {
    if (content) {
      this.state.logs.push(content)
      this.setState()
    }
  }

  clearLog() {
    const logs = []
    this.setState({logs})
  }

  setIsScrollToBottom(isStb = true) {
    this.state.isScrollToBottom = !!isStb
  }

  componentDidMount() {
    //渲染之后,获取DOM
    this.logContainer = $('#log-container')
  }

  render() {
    return `<div class="game-log">
                    <div class="title">游戏日志</div>
                    <div id="log-container" class="log-container">
                        ${this.getLogDom()}
                    </div>
                </div>`
  }

  refresh() {
    this.logContainer.html(this.getChatDom())
    if (this.state.isScrollToBottom) {
      this.logContainer[0].scrollTop = this.logContainer[0].scrollHeight
    }
  }
}
