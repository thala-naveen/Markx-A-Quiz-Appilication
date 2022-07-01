var express = require('express');
const pool = require('./pool');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage
var localstorage = new LocalStorage('./scratch');

router.get('/displayreport',function(req,res){
    pool.query('select * from quiz.performance',function(error,result){
      if(error)
      {
          console.log(error);
          
      }
      else
      {   
          
          res.render('displayreport',{data:result})
      }
    })
})

router.post('/changepass',function(req,res){
    console.log(req.body);
    pool.query('update quiz.admin set adminpassword=? where adminid=? and adminpassword=?',[req.body.newpassword,req.body.adminid,req.body.currentpassword],function(error,result){

      if(error)
      {
          console.log(error);
          res.render('viewadminpassword',{msg:'server error'})
      }
      else
      {
          res.render('viewadminpassword',{msg:'Password changed'})
      }
    })
})

router.get('/changepassword',function(req,res){
    res.render('viewadminpassword',{msg:''})
})

router.post('/editquiz',function(req,res){
      console.log(req.body);
    if(req.body.btn=="Edit")
    {
        pool.query('update quiz.quiz set adminid=?,quizname=?,quizdifficulty=?,quesname=?,optionone=?,optiontwo=?,optionthree=?,optionfour=?,correctoptionnumber=?,correctoptionvalue=? where quizid=?',[

          
          req.body.adminid,
          req.body.quizname,
          req.body.quizdifficulty,
          req.body.quesname,
          req.body.optionone,
          req.body.optiontwo,
          req.body.optionthree,
          req.body.optionfour,
          req.body.correctoptionnumber,
          req.body.correctoptionvalue,
          req.body.quizid

        ],function(error,result){

          if(error)
          {
              console.log(error);
              res.redirect('/quiz/displayques')
          }
          else
          {
              res.redirect('/quiz/displayques')
          }
        })
    }
    else if(req.body.btn=="Delete")
    {
        pool.query('delete from quiz.quiz where quizid=?',[req.body.quizid],function(error,result){

          if(error)
          {
              console.log(error);
              res.redirect('/quiz/displayques')
          }
          else
          {
              res.redirect('/quiz/displayques')
          }
        })
    }
})


router.get('/displayquizbyid',function(req,res){
      pool.query('select * from quiz.quiz where quizid=?',[req.query.quizid],function(error,result){
          if(error){
            console.log(error);
            res.render('displaybyid',{data:[]})
          }
          else
          {
              console.log(result);
              res.render('displaybyid',{msg:'',data:result[0]})
          }
      })
})

router.get('/logout',function(req,res){
    localstorage.clear
    res.render('index',{msg:''})
})

router.post('/checklogin',function(req,res){
    
  
    pool.query('select * from quiz.admin where adminid=? and adminpassword=?',[req.body.adminid,req.body.adminpassword],function(error,result){

        if(error)
        {
            console.log(error);
            res.render('index',{msg:'server error'})
        }
        else
        {
          
            if(result.length==1)
            {
                console.log(result);
                localstorage.setItem('admin',JSON.stringify({emailid:result[0].adminid}))
                res.render('dashboard',{adminid:result[0].adminid,adminname:result[0].adminname})
            }
            else
            {
                res.render('index',{msg:'wrong credentials'})
            }
        }
    })
})
  
router.post('/adminsignup',function(req,res){
  var adminid=req.body.adminid
  var adminname=req.body.adminname
  var adminpassword=req.body.adminpassword
  pool.query('insert into quiz.admin(adminid,adminname,adminpassword) values(?,?,?)',[
    req.body.adminid,
    req.body.adminname,
    req.body.adminpassword
  ],function(error,result){

    if(error)
    {
      console.log(error);
      res.render('signup',{msg:'admin already exist'})
    }
    else
    {
        
            res.render('dashboard',{adminid:adminid,adminname:adminname})
    }
       
    
  })
  
})

router.get('/signup',function(req,res){
  res.render('signup')
})


router.get('/displayques',function(req,res){
  pool.query('select * from quiz',function(error,result){

    if(error)
    {
        console.log(error);
        res.render('display',{data:[]})
    }
    else
    {
      console.log(result);
       res.render('display',{data:result})
       
    }
  })
})

router.post('/addquizdetails',function(req,res){
  console.log(req.body);
  var adminid=req.body.adminid
  pool.query('insert into quiz(quizid,adminid,quizname,quizdifficulty,quesname,optionone,optiontwo,optionthree,optionfour,correctoptionnumber,correctoptionvalue) values(?,?,?,?,?,?,?,?,?,?,?)',[
    
    
    req.body.quizid,
    req.body.adminid,
    req.body.quizname,
    req.body.difficulty,
    req.body.quesname,
    req.body.optionone,
    req.body.optiontwo,
    req.body.optionthree,
    req.body.optionfour,
    req.body.correctoptionnumber,
    req.body.correctoptionvalue
    ],function(error,result){

      if(error)
      {
          console.log(error);
          res.render('addquizques',{msg:'server error'})
      }
      else
      {
        console.log(result);
          res.render('addquizques',{msg:'Question added',adminid:adminid})
      }

    })


})

router.get('/addquizques', function(req, res, next) {
  res.render('addquizques',{msg:''});
});

module.exports = router;
