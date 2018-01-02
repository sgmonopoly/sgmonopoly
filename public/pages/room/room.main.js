import LeftContainerDom from './components/LeftContainerDom'
import CenterContainerDom from './components/CenterContainerDom'
import RightContainerDom from './components/RightContainerDom'
import GameComponents from '../../api/domain/GameComponents'
import {initNetwork} from '../../api/network'
import {getQueryString} from '../../common/utils/router'
import PlayerDom from "./components/PlayerDom"

(() => {
  const lcd = new LeftContainerDom('lcd')
  const ccd = new CenterContainerDom('ccd')
  const rcd = new RightContainerDom('rcd')
  lcd.addToDom()
  ccd.addToDom()
  rcd.addToDom()

  //测试用
  //lcd.addPlayer(new PlayerDom({id: 'id1', name: '小黄鸡', heroCount: 3, money: 2000, troops: 1000}))

  /*lcd.addPlayer(new PlayerDom({id: 'id1', name: '小黄鸡', heroCount: 3, money: 2000, troops: 1000}))
   lcd.addPlayer(new PlayerDom({id: 'id2', img: 'http://img1.3lian.com/2015/w3/98/d/1.jpg', name: '小黄鸭', color: 'red', heroCount: 3, money: 2000, troops: 1000}))
   lcd.addPlayer(new PlayerDom({id: 'id3', img: 'http://www.gexing.me/uploads/150119/6-150119205301358.jpg', name: '小黄人', color: 'pink',heroCount: 6, money: 2222, troops: 19000}))
   setTimeout(() => {
   lcd.setPlayerValueById({color: 'black', money: 200000, name: '小黑鸭'}, 'id2')
   lcd.removePlayer('id3')
   ccd.setGameTime(10000)
   rcd.clearLog()
   rcd.isScrollToBottomForLog(false)
   }, 5000)

   setInterval(() => {
   rcd.addLog('啦啦啦啦啦')
   }, 1000)*/

  const gameComponents = new GameComponents(lcd, ccd, ccd.getSubComponent("controlDom"),
    rcd.getSubComponent("gameLogDom"), rcd.getSubComponent("chatDom"), ccd.getSubComponent("gameDom"))

  //初始化网络
  const roomNo = getQueryString("roomNo");
  initNetwork(roomNo, gameComponents);
})();