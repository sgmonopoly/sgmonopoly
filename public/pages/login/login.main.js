import $ from 'jquery'
import {pages} from '../../config/pages'
import {userLogin} from '../../api/rest/user'
import {open} from '../../common/utils/router'

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

function isValid(name,password) {
    if(!name){
        setErrorInfo('姓名不能为空！', 'loginNickname');
        return false;
    }
    if(!password){
        setErrorInfo('密码不能为空！', 'loginPassword');
        return false;
    }
    return true;
}

function login() {
    clearForm();
    let loginNickname = $('#loginNickname').val();
    let loginPassword = $('#loginPassword').val();
    if(isValid(loginNickname,loginPassword)){
        userLogin(loginNickname,loginPassword)
            .then(() => {
                console.log('success!');
                open(pages.rooms);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorInfo(err.response.data, 'loginNickname');
            });
    }
}

function initPage() {

    let obj = $('.input-container');

    obj.mouseenter(() => {
        onInputFocus();
    });

    obj.mouseleave(() => {
        onInputBlur();
    });

    $('#start-game').on('click', () => {
        login();
    });
}

initPage();