import JqueryComponent from '../../../common/myreact/JqueryComponent'

export default class LeftContainerDom extends JqueryComponent {

  constructor(id) {
    super(id)
    this.state = {
      players: []
    }
  }

  mergePlayer(playerDom) {
    //校验id是否重复
    const player = this.state.players.find(p => p.id === playerDom.id)
    if (!!player) {
      //修改用户
      player.setValue(playerDom)
    } else {
      this.state.players.push(playerDom)
    }
    super.refresh()
  }

  removePlayer(...ids) {
    ids.forEach(id => this.state.players = this.state.players.filter(p => p.id !== id))
    super.refresh()
  }

  removeAllPlayer() {
    this.state.players = []
    super.refresh()
  }

  setPlayerValueById(vObj, id) {
    this.state.players = this.state.players.map(p => {
      if (p.id === id) {
        p.setValue(vObj)
      }
      return p
    })
    super.refresh()
  }

  getPlayersDom() {
    return this.state.players.reduce((dom, p) => dom + p.render(), "")
  }

  getPlayer(id) {
    return this.state.players.find(p => p.id === id);
  }

  getAllPlayerIds() {
    return this.state.players.map(p => p.id)
  }

  componentDidMount() {
    this.state.players.forEach(playerDom => playerDom.componentDidMount())
  }

  render() {
    return `<div class="left-container-dom">${this.getPlayersDom()}</div>`
  }
}
