'use strict'
import JqueryComponent from '../../../common/myreact/JqueryComponent'

export default class LeftContainerDom extends JqueryComponent {

  constructor(id) {
    super(id)
    this.state = {}
    this.subComponent = {
      players: []
    }
  }

  mergePlayer(playerDom) {
    //校验id是否重复
    const player = this.subComponent.players.find(p => p.id === playerDom.id)
    if (!!player) {
      //修改用户
      player.setValue(playerDom)
    } else {
      this.subComponent.players.push(playerDom)
    }
    super.refresh()
  }

  removePlayer(...ids) {
    ids.forEach(id => this.subComponent.players = this.subComponent.players.filter(p => p.id !== id))
    super.refresh()
  }

  removeAllPlayer() {
    this.subComponent.players = []
    super.refresh()
  }

  setPlayerValueById(vObj, id) {
    this.subComponent.players = this.subComponent.players.map(p => {
      if (p.id === id) {
        p.setValue(vObj)
      }
      return p
    })
    super.refresh()
  }

  getPlayersDom() {
    return this.subComponent.players.reduce((dom, p) => dom + p.render(), "")
  }

  getPlayer(id) {
    return this.subComponent.players.find(p => p.id === id)
  }

  getAllPlayerIds() {
    return this.subComponent.players.map(p => p.id)
  }

  componentDidMount() {
    this.subComponent.players.forEach(playerDom => playerDom.componentDidMount())
  }

  render() {
    return `<div class="left-container-dom">${this.getPlayersDom()}</div>`
  }
}
