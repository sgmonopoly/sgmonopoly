import $ from 'jquery'

import {userLogin} from '../../restful/user'


function onInputFocus() {
    $('.background-container').addClass('background-focus');
    $('.input-container').addClass('input-container-focus');
}

function onInputBlur() {
    $('.background-container').removeClass('background-focus');
    $('.input-container').removeClass('input-container-focus');
}

function clearForm() {
    $('#err-content').html('');
    $('.form-value').removeClass('err-box');
}

function setErrorInfo(msg, domId) {
    $(`#${domId}`).addClass('err-box');
    $('#err-content').html(msg);
}

function isValid(name) {
    if(!name){
        setErrorInfo('姓名不能为空！', 'name');
        return false;
    }
    return true;
}

function login() {
    clearForm();
    let name = $('#name').val();
    if(isValid(name)){
        userLogin(name)
            .then(() => {
                console.log('success!')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

function initPage() {

    $('.input-container').mouseenter(() => {
        onInputFocus();
    });

    $('.input-container').mouseleave(() => {
        onInputBlur();
    });

    $('#start-game').on('click', () => {
        login();
    })
}

initPage();