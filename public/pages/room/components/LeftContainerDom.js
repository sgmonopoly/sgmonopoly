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
        if(this.state.players.length >= 4){
            throw `玩家的个数达到上限！总玩家不能超过4个！`
        }
        this.state.players.push(playerDom)
        super.refresh()
    }

    removePlayer(id){
        this.state.players = this.state.players.filter(p => p.id !== id)
        super.refresh()
    }

    removeAllPlayer(){
        this.state.players = []
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

    getPlayersDom(){
        return this.state.players.reduce((dom, p) => dom + p.render(), "")
    }

    getPlayer(id){
        return this.state.players.find(p => p.id === id);
    }

    componentDidMount(){
        this.state.players.forEach(playerDom => playerDom.componentDidMount())
    }

    render(){
        return `<div class="left-container-dom">${this.getPlayersDom()}</div>`
    }
}
