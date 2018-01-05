'use strict'
function _addParams(url = '', params = {}) {
    let keys = Object.keys(params)
    return keys.reduce((url, key, index) => {
        if(index === 0){
           return `${url}?${key}=${params[key]}`
        }else {
           return `${url}&${key}=${params[key]}`
        }
    }, url)
}

export function open(url, params) {
    window.location.href = _addParams(url, params)
}

/**
 * 拿浏览器地址参数
 * @param name
 * @returns {null}
 */
export function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if(r!=null){
        return unescape(r[2])
    } 
    return null
}