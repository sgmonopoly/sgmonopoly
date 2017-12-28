import $ from 'jquery'
export default class GameLogDom {
    constructor(){
        this.logs = [

        ]
        this.isScrollToBottom = true
    }

    _getLogDom(){
        return this.logs.reduce((dom,log) => {
            return `${dom}<div class="log">${log}</div>`
        }, "")
    }

    addLog(content = ""){
        const logContainer = $('#log-container')
        if(content){
            this.logs.push(content)
            logContainer.html(this._getLogDom())
            if(this.isScrollToBottom){
                logContainer[0].scrollTop = logContainer[0].scrollHeight
            }
        }
    }

    clearLog(){
        this.logs = []
    }

    setIsScrollToBottom(isStb = true){
        this.isScrollToBottom = !!isStb
    }

    render(){
        return `<div class="game-log">
                    <div class="title">游戏日志</div>
                    <div id="log-container" class="log-container">
                        ${this._getLogDom()}
                    </div>
                </div>`
    }
}
