import {getRooms} from '../../restful/rooms'
import $ from 'jquery'

function initAnimation(){
    $('.room-block').addClass('init-block')
    setTimeout(() => {
        $('.room-block').removeClass('init-block')
    }, 800)


}

function init() {
    getRooms();
    initAnimation();
}

init();