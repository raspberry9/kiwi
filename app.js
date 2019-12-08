/*!
 * kiwi server
 * Copyright(c) 2015 Jaseung Koo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('./config')
  , prototypes = require('./prototypes')
  , express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

/**
 * Create a main application.
 */

var app = routes.app;  
mongoose.connect(config.databases.auth);
config.server.instance = Number(process.argv[2]) || 0;
config.server.port = config.server.port + config.server.instance;

/**
 * Start server loop.
 */

var server = app.listen(config.server.port, config.server.host, function () {
  console.log('{description} server {version} listening at {host}:{port}({instance})...'
              .format(config.server));
});