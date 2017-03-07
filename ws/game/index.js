'use strict';

const sg_constant = require("../../services/sg_constant");
let room_io;

exports.init = (_socket,_io) => {
    room_io = _io;

};