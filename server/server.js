const mongoose = require('mongoose');

/**
 * Connect to database
 */
const connection = require('./database/connect');
connection();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GStrategy = require('./authentication/GPassport');
const MongoStorage = require('connect-mongo');
const path = require('path');
const flash = require('connect-flash');
const cors = require('cors');
const app = express();

require('dotenv').config();

/**
 * middlewares for incoming javascript objects
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

/**
 * Session storage
 */
app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'sales-session',
    resave: false,
    store: MongoStorage.create({
        mongoUrl: process.env.DB_URL,
        autoRemove: 'interval',
        autoRemoveInterval: 10
    })
}));

// storing flash in sessions
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./authentication/AuthRoutes'));
app.use('/', require('./routes/SendSalesOnMail'));

app.listen(8080, () => console.log('Server started on port 8080!'));