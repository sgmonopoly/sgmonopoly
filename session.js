/**
 * Created by yuanxiang on 3/10/17.
 */
const Session = require('express-session');
const SessionStore = require('session-file-store')(Session);
session = Session({
    store: new SessionStore({path: __dirname+'/tmp/sessions'}),
    secret: 'sgm',
    name: 'sgm',
    cookie: {maxAge: 80000},
    resave: true,
    saveUninitialized: true,
});
module.exports = session;