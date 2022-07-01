var express = require('express');
var router = express.Router();
const pool = require('./pool');

/* GET users listing. */

router.post('/thankyou',function(req,res){
    var items = req.body
    var userid=req.body.userid
    delete items['userid']
    
    var size = Object.keys(items).length
    var values=Object.values(items)

    var ans=values.toString()
    console.log(ans);
    
  
        pool.query('insert into quiz.performance(userid,optionselected) values(?,?)',[userid,ans],function(error,result){
            if(error)
            {
                console.log(error);
                res.render('quizpage',{msg:'server error'})
            }
            else
            {
                res.render('thankyou',{msg:'quiz submitted successfully'})
            }

        })  
  })


router.get('/quizpage',function(req,res){
  
  pool.query('select * from quiz.quiz where quizid=?',[req.query.qid],function(error,result){
    if(error)
    {
        console.log(error);
        //res.render('quizpage',{msg:'server error',data:[]})
        res.status(500).json([])
      }
    else
    {
        console.log(result);                                                
        //res.render('beginquiz',{data:result,quizname:result[0].quizname})                
        res.status(200).json(result)                                                                                      
      }
  })
})

router.post('/adduser',function(req,res){
    pool.query('insert into quiz.user(username,useremailid) values(?,?)',[req.body.username,req.body.useremailid],function(error,result){

      if(error)
      {
          console.log(error);
          res.render('startquiz',{msg:'server error'})
      }
      else
      {
          res.render('quizpage',{msg:''})
      }
    })
})

router.get('/startquiz',function(req,res){
  res.render('startquiz',{msg:''})
})

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
