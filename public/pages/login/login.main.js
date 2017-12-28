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

function isValid(name) {
    if(!name){
        setErrorInfo('昵称不能为空！', 'loginNickname');
        return false;
    }
    return true;
}

async function login() {
    console.log("开始登入");
    clearForm();
    let loginNickname = $('#loginNickname').val();
    if(isValid(loginNickname)){
        try{
            const result = await userLogin(loginNickname)
            console.log('success!',result.data.userId);
            saveUserInfo(result.data.userId);
            open(pages.rooms);
        }catch(err) {
            console.log(err.response.data);
            setErrorInfo(err.response.data, 'loginNickname');
        }
    }
}
/**
 * 保存用户id到本地,用来传参
 * @param userId
 */
function saveUserInfo(userId){
    let ls = window.localStorage;
    ls.removeItem("sgm_userId");
    ls.setItem("sgm_userId",userId);
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