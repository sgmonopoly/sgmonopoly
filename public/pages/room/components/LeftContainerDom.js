import JqueryComponent from '../../../common/myreact/JqueryComponent'

export default class LeftContainerDom extends JqueryComponent{

    constructor(id){
        super(id)
        this.state = {
            players: []
        }
    }

    addPlayer(playerDom){
        //校验id是否重复
        if(!!this.state.players.find(p => p.id === playerDom.id)){
            throw `添加失败，含有重复id的player！id：${playerDom.id}`
        }
        //校验玩家个数
        if(this.state.players.length >= 3){
            throw `player的个数达到上限！总玩家不能超过4个！`
        }
        this.state.players.push(playerDom)
        super.refresh()
    }

    removePlayer(id){
        this.state.players = this.state.players.filter(p => p.id !== id)
        super.refresh()
    }

    setPlayerValueById(vObj, id){
        this.state.players = this.state.players.map(p => {
            if(p.id === id){
                p.setValue(vObj)
            }
            return p
        })
        super.refresh()
    }

    _getPlayersDom(){
        return this.state.players.reduce((dom, p) => dom + p.render(), "")
    }

    render(){
        return `<div class="left-container-dom">${this._getPlayersDom()}</div>`
    }
}
