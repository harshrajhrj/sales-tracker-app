const express = require('express');
const passport = require('passport');
const app = express.Router();
require('dotenv').config()

app.get('/success', async (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

app.get('/', passport.authenticate('google'));
app.get('/redirect', passport.authenticate('google', {
    failureRedirect: '/forbidden',
    successRedirect: process.env.CLIENT_URL
}));

app.get('/forbidden', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
})

app.get('/logout', (req, res, next) => {
    if (req.user) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect(process.env.CLIENT_URL);
        })
    } else
        res.redirect(process.env.CLIENT_URL);
})

module.exports = app;