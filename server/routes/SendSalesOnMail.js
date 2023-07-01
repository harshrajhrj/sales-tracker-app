const { Mail } = require('../communicate/mail');
const app = require('express').Router();

app.get('/mail', async (req, res) => {
    const feedback = await Mail();
    res.send(feedback);
})

module.exports = app;