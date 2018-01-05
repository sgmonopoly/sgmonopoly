/**
 * Created by yuanxiang on 3/10/17.
 */
'use strict'
const Session = require('express-session')
const SessionStore = require('session-file-store')(Session)
module.exports = Session({
    store: new SessionStore({path: __dirname+'/tmp/sessions'}),
    secret: 'sgm',
    name: 'sgm',
    //cookie: {maxAge: 800000},
    resave: true,
    saveUninitialized: true,
})