/**
 * Created by yuanxiang on 6/15/17.
 */
'use strict'
const currentOwnerUserId = window.localStorage.getItem("sgm_userId")
//console.log("currentOwnerUserId",currentOwnerUserId)
if (!currentOwnerUserId) {
    alert("获取不到用户ID,请重新登入")
}
export {currentOwnerUserId}