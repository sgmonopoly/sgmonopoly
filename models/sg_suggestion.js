/**
 * Created by yuanxiang on 3/2/17.
 * 锦囊妙计
 */
'use strict';
class SG_Suggestion extends require("./SG_Situation") {
    constructor(_id, _name, _des, _isReserve, cb) {
        super(_id, _name, _des, cb);
        this.isReserve = _isReserve;
    }
}
module.exports = SG_Suggestion;