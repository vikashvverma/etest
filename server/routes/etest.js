var User=require('./../models/user');

var etest=function(exp){
  this.app=exp;

  // this.app.get('/',function(req,res){
  //   res.end('Hello, Vikash!');
  // });

  this.app.post('/login',function(req,res){
    var model=req.query;
    console.log(req.session.username);
    console.log(req.query);
    var user=new User();
    user.login(model,function(err,instance){
      if(err){
        res.send(500,err);
      }else{
        req.session.username=instance.username;
        res.send(200,instance);
      }
    });
  });
  this.app.get('/checkUser',function(req,res){
    var model=req.query;
    var user=new User();
    user.getUser(model,function(err,instance){

    });
  });
  this.app.post('/addUser',function(req,res){
        console.log(req.body);
        var user=new User();
        user.addUser(req.body,function(err,instance){
          if(err){
            res.send(500,err);
          }else{
            res.send(200,instance);
          }
        });
  });
  this.app.post('/updateVerbal',function(req,res){

  });

  this.app.post('/updateAptitude',function(){

  });

  this.app.get('/getAptitudeQuestions',function(req,res){

  });

  this.app.get('/getVerbalQuestions',function(req,res){

  });

};

module.exports=etest;
