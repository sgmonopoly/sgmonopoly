import $ from 'jquery'
import sg_constant from "../../../../services/sg_constant"

export default class PlayerDom {
    constructor({id, name = 'anonymous', color='#6ecfff', img = 'http://img.25pp.com/uploadfile/app/icon/20161025/1477405420543256.jpg', heroCount = 0, troop = 0, money = 0, citiesCount = 0}){
        this.id = id
        this.name = name
        this.color = color
        this.img = img
        this.heroCount = heroCount
        this.troop = troop
        this.money = money
        this.citiesCount = citiesCount
        this.readyStatus = sg_constant.user_status.unready
    }

    setValue(valueObj){
        for(let key of Object.keys(valueObj)){
            this[key] = valueObj[key]
        }
        return this
    }

    ready(){
        this.readyDom.removeClass("ready-pic")
    }

    unready(){
        this.readyDom.addClass("ready-pic")
    }

    componentDidMount(){
        this.readyDom = $(`#ready-pic-${this.id}`)
    }

    render(){
        return `<div class="player">
                    <div class="left">
                        <div style="background-image:url(${this.img})" class="player-pic"></div>
                        <div class="name" style="background-color:${this.color}"><i id="ready-pic-${this.id}" class="fa fa-hand-paper-o ready-pic" aria-hidden="true"></i>${this.name}</div>
                    </div><div class="right">
                        <div class="text">武将数: ${this.heroCount}</div>
                        <div class="text">银两: ${this.money}</div>
                        <div class="text">兵力: ${this.troop}</div>
                        <div class="text">城池数: ${this.citiesCount}</div>
                    </div>
                </div>`
    }
}
