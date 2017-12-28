/**
 * Created by yuanxiang on 6/15/17.
 */
const myUserId = window.localStorage.getItem("sgm_userId");
console.log("myUserId",myUserId);
if (!myUserId) {
    alert("获取不到用户ID,请重新登入");
}
export default myUserId