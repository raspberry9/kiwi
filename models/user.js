/*!
 * kiwi server user model
 * Copyright(c) 2015 Jaseung Koo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , jwt = require('jwt-simple');
  
/**
 * Constant variables.
 */

var TOKEN_SECRET = 'some_secret'
  , TOKEN_EXPIRE = 3600 * 24 // seconds

/**
 * Variables.
 */

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , newObjectId = function () { return new mongoose.Types.ObjectId() }

/**
 * User schema definition.
 */

var userSchema = new Schema({
  _id        : { type: ObjectId, default: newObjectId },
  username   : { type: String, required: true, unique: true },
  password   : { type: String, required: true },
  friends    : [{ _id: ObjectId }],
  profile    : {
    nickname: String,
    message: String,
    image: String,
  },
  created_at : { type: Date, default: Date.now },
  updated_at : { type: Date, default: Date.now }
})

/**
 * Create a mongoose model.
 */
var User = mongoose.model('User', userSchema);

/**
 * Add utility functions to User mongoose model.
 */

User.isValidUsername = function (username) {
  return /^[a-zA-Z0-9_]{2,20}$/.test(username);
};

User.isValidPassword = function (password) {
  // for 32 bytes MD5 Hash
  return /^[a-f0-9]{32}$/.test(password);
};

User.generateToken = function (username) {
  var now = new Date()
    , expires = now.setSeconds(now.getSeconds() + TOKEN_EXPIRE)
    , token = jwt.encode({
        exp: expires,
        username: username
      }, TOKEN_SECRET);

  return token;
};

/**
 * Module exports.
 */

module.exports = User;
