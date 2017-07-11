import LeftContainerDom from './components/LeftContainerDom'
import PlayerDom from './components/PlayerDom'

function initPage() {
    let lcd = new LeftContainerDom('lcd')
    lcd.addToDom()
    lcd.addPlayer(new PlayerDom({id: 'id1', name: '小黄鸭', heroCount: 3, money: 2000, troops: 1000, cities: ['上海', '北京']}))
    lcd.addPlayer(new PlayerDom({id: 'id2', img: 'http://img1.3lian.com/2015/w3/98/d/1.jpg', name: '小黄鸡', color: 'red', heroCount: 3, money: 2000, troops: 1000, cities: ['上海', '北京']}))
    lcd.addPlayer(new PlayerDom({id: 'id3', img: 'http://www.gexing.me/uploads/150119/6-150119205301358.jpg', name: '小黄人', color: 'pink',heroCount: 6, money: 2222, troops: 19000, cities: ['上海', '北京','上海', '北京','上海', '北京','上海', '北京','上海', '北京', '上海', '北京','上海', '北京','上海', '北京','上海', '北京','上海', '北京']}))
}

initPage()