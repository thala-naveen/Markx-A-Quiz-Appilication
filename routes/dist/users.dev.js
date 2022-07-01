"use strict";

var express = require('express');

var router = express.Router();

var pool = require('./pool');
/* GET users listing. */


router.post('/checkquizid', function (req, res) {
  var id = req.body.quizid;
  pool.query('select quesname,optionone,optiontwo,optionthree,optionfour from quiz.quiz where quizid=?', [req.body.quizid], function (error, result) {
    if (error) {
      console.log(error);
      res.render('quizpage', {
        msg: 'server error',
        data: []
      });
    } else {
      console.log(result);
      res.render('beginquiz', {
        data: result
      });
    }
  });
});
router.post('/adduser', function (req, res) {
  pool.query('insert into quiz.user(username,useremailid) values(?,?)', [req.body.username, req.body.useremailid], function (error, result) {
    if (error) {
      console.log(error);
      res.render('startquiz', {
        msg: 'server error'
      });
    } else {
      res.render('quizpage', {
        msg: ''
      });
    }
  });
});
router.get('/startquiz', function (req, res) {
  res.render('startquiz', {
    msg: ''
  });
});
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;