/*!
 * kiwi server router
 * Copyright(c) 2015 Jaseung Koo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('../config')
  , fs = require('fs')
  , express = require('express')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , users = require('./users');

/**
 * Create an express application with log.
 */

var app = express()
  , accessLogStream = fs.createWriteStream(__dirname + '/../access.log', { flags: 'a' })
  , logMode = config.server.mode === 'development' ? 'dev' : 'combined';

/**
 * Express plugins.
 */

app.use(morgan(logMode, {stream: accessLogStream}));
app.use(bodyParser.json({ type: 'application/json' }));

/**
 * Express handlers.
 */

app.get('/users', users.read);
app.post('/users', users.create);
app.get('/users/:id', users.read);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.delete);
app.post('/users/token', users.token);

/**
 * Module exports.
 */

module.exports.app = app;