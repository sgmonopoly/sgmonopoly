export default class PlayerDom {
    constructor({id, name = 'anonymous', color='#6ecfff', img = 'http://img.25pp.com/uploadfile/app/icon/20161025/1477405420543256.jpg', heroCount = 0, troops = 0, money = 0, cities = []}){
        this.id = id
        this.name = name
        this.color = color
        this.img = img
        this.heroCount = heroCount
        this.troops = troops
        this.money = money
        this.cities = cities
    }

    getCitiesDom(){
        //todo city名字
        return this.cities.reduce((dom, city) => `${dom}&nbsp;&nbsp;${city}`, '&nbsp;&nbsp;&nbsp;')
    }

    render(){
        return `<div class="player">
                    <div class="left">
                        <div style="background-image:url(${this.img})" class="player-pic"></div>
                        <div class="name" style="background-color:${this.color}">${this.name}</div>
                    </div><div class="right">
                        <div class="text">武将数: ${this.heroCount}</div>
                        <div class="text">银两: ${this.money}</div>
                        <div class="text">兵力: ${this.troops}</div>
                        <div class="text">城池列表: </div>
                        <div class="outer-city">
                            ${this.getCitiesDom()}
                        </div>  
                    </div>
                </div>`
    }
}
