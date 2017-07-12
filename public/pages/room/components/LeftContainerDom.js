import Component from './Component'

export default class LeftContainerDom extends Component{

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
        return `<div>${this._getPlayersDom()}</div>`
    }
}
