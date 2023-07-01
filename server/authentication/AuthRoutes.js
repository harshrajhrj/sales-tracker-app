const app = require('express').Router();

// function isAuthorized(req, res, next) {
//     if (req.user) {
//         res.redirect('/');
//     } else {
//         next();
//     }
// }

app.use('/auth', require('./GAuth'));

module.exports = app;