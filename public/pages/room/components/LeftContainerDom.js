import Component from './Component'

export default class LeftContainerDom extends Component{

    constructor(id){
        super(id)
        this.state = {
            players: []
        }
    }

    addPlayer(playerDom){
        this.state.players.push(playerDom)
        super.refresh()
    }

    getPlayersDom(){
        return this.state.players.reduce((dom, p) => dom + p.render(), "")
    }

    render(){
        return `<div>${this.getPlayersDom()}</div>`
    }
}
