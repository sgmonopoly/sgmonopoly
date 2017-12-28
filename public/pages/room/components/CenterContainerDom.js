import JqueryComponent from '../../../common/myreact/JqueryComponent'
import GameContainerDom from './game/GameContainerDom'
import $ from 'jquery'
export default class CenterContainerDom extends JqueryComponent{

    constructor(id){
        super(id)
        this.state = {
            //单位是秒
            gameTime: 0,
            leftHeroes: 0,
            gameDom: new GameContainerDom()
        }
    }

    _getShowedGameTime(){
        let gt = this.state.gameTime
        let _hours = parseInt(gt/3600)
        let _mins = parseInt((gt - _hours*3600)/60)
        let _sec = parseInt((gt - _hours*3600 - _mins*60))
        return `${_hours}时${_mins}分${_sec}秒`
    }

    setGameTime(gt){
        this.state.gameTime = gt
        $('#gameTime').html(this._getShowedGameTime())
    }

    setLeftHeroes(count){
        this.state.leftHeroes = count
        $('#leftHeroes').html(this.state.leftHeroes)
    }

    componentDidMount(){
        this.state.gameDom.componentDidMount()
    }

    render(){
        return `<div class="center-container-dom">
                    <div class="top">
                        <div class="block"><span class="left">游戏时长: <span id="gameTime" class="right">${this._getShowedGameTime()}</span></span><span></span>
                        </div><div class="block"><span class="left">剩余武将: <span id="leftHeroes" class="right">${this.state.leftHeroes}</span></span><span></span></div>
                    </div>
                    <div class="bottom" id="gameDiv">
                        ${this.state.gameDom.render()}
                    </div>
                </div>`
    }
}