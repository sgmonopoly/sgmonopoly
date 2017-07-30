import LeftContainerDom from './components/LeftContainerDom'
import CenterContainerDom from './components/CenterContainerDom'
import RightContainerDom from './components/RightContainerDom'
import PlayerDom from './components/PlayerDom'

function initPage() {
    let lcd = new LeftContainerDom('lcd')
    let ccd = new CenterContainerDom('ccd')
    let rcd = new RightContainerDom('rcd')
    lcd.addToDom()
    ccd.addToDom()
    rcd.addToDom()
    lcd.addPlayer(new PlayerDom({id: 'id1', name: '小黄鸡', heroCount: 3, money: 2000, troops: 1000}))
    lcd.addPlayer(new PlayerDom({id: 'id2', img: 'http://img1.3lian.com/2015/w3/98/d/1.jpg', name: '小黄鸭', color: 'red', heroCount: 3, money: 2000, troops: 1000}))
    lcd.addPlayer(new PlayerDom({id: 'id3', img: 'http://www.gexing.me/uploads/150119/6-150119205301358.jpg', name: '小黄人', color: 'pink',heroCount: 6, money: 2222, troops: 19000}))
    setTimeout(() => {
        lcd.setPlayerValueById({color: 'black', money: 200000, name: '小黑鸭'}, 'id2')
        lcd.removePlayer('id3')
        ccd.setGameTime(12323543512)
        rcd.clearLog()
        rcd.isScrollToBottomForLog(false)
    }, 5000)

    setInterval(() => {
        rcd.addLog('啦啦啦啦啦')
    }, 200)
}

initPage()