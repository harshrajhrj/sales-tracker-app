const express = require('express');
const passport = require('passport');
const app = express.Router();

app.get('/auth', passport.authenticate('google'));
app.get('/auth/redirect', passport.authenticate('google', {
    failureRedirect: '/auth/forbidden',
    successRedirect: '/'
}));

app.get('/auth/forbidden', (req, res) => {
    res.send('Sorry, unable to authenticate!');
})

app.get('/auth/logout', (req, res, next) => {
    if (req.user) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        })
    } else
        res.redirect('/');
})

module.exports = app;