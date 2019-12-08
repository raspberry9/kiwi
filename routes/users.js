/*!
 * kiwi server router(users handler)
 * Copyright(c) 2015 Jaseung Koo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var User = require('../models/user')

/**
 * JWT를 발급한다.
 *
 * 로그인, 세션발급 대신 Json Web Token을 이용한다.
 *
 * @private
 */

module.exports.token = function (req, res, next) {

  var username = req.body.username
    , password = req.body.password;

  if (!User.isValidUsername(username)) {
    res.status(401).json({ code: -1010, message: 'invalid username format' });
    return;
  }

  if (!User.isValidPassword(password)) {
    res.status(401).json({ code: -1020, message: 'invalid password format' });
    return;
  }

  User.findOne({ username: username })
  .where({ password: password })
  .select('_id username created_at updated_at')
  .exec(function (err, user) {
    if (err) {
      res.status(500).json({ code: -1030, message: 'user load failed' });
      return;
    }

    if (!user) {
      res.status(401).json({ code: -1040, message: 'indvlid id or password' });
      return;
    }

    res.json({
      code: 0, message: 'OK',
      token: User.generateToken(user.username)
    });
  });
};

/**
 * 새로운 사용자를 생성한다.
 *
 * @private
 */

module.exports.create = function (req, res, next) {

  var username = req.body.username
    , password = req.body.password;

  if (!User.isValidUsername(username)) {
    res.status(401).json({ code: -1110, message: 'invalid username format' });
    return;
  }

  if (!User.isValidPassword(password)) {
    res.status(401).json({ code: -1120, message: 'invalid password format' });
    return;
  }

  var user = new User({ username: username, password: password });
  user.save(function (err, user) {
    if (err || !user) {
      if (err.code === 11000) {
        // 11000 is a mongodb error. it means that duplicated.
        res.status(403).json({ code: -1130, message: 'user duplicated' });
        return;
      }
      
      res.status(500).json({ code: -1140, message: 'user save failed' });
      return;
    }
    
    res.json({ code: 0, message: 'OK' });
  });
};

/**
 * 요청한 사용자의 정보를 찾아준다.
 *
 * @private
 */

module.exports.read = function (req, res, next) {
  
  var username = req.body.username;

  if (!User.isValidUsername(username)) {
    res.status(401).json({ code: -1210, message: 'invalid username format' });
    return;
  }

  User.findOne({ username: username })
  .select('_id username created_at updated_at')
  .exec(function (err, user) {
    if (err || !user) {
      res.status(404).json({ code: -1220, message: 'user not found' });
      return;
    }
    res.json({ code: 0, message: 'OK', user: user });
  });
};

/**
 * 요청한 사용자의 정보를 갱신한다.
 *
 * @private
 */

module.exports.update = function (req, res, next) {
  
  var password = req.body.password;
  
  res.json({ code: -1310, message: 'Not Implemented' });
};

/**
 * 요청한 사용자를 삭제한다.
 *
 * @private
 */

module.exports.delete = function (req, res, next) {
  
  res.json({ code: -1410, message: 'Not Implemented' });
};
