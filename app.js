var express=require('express');
var etest=require('./server/routes/etest');

var app=function(){
  self=this;

  self.setupVariables=function(){
    self.ipaddress=process.env.IP_ADDRESS || '127.0.0.1';
    self.port=process.env.PORT || '3000';
  };

  self.initailizeServer=function(){
    self.app=express();
    self.app.use(express.static(__dirname+"/public"));
    self.app.use(express.cookieParser());
    self.app.use(express.session({secret:"http://www.programminggeek.in/"}))
    new etest(self.app);
  };

  self.initialize=function(){
    self.setupVariables();
    self.initailizeServer();
  };

  self.start=function(){
    self.app.listen(self.port,self.ipaddress,function(){
      console.log("Node Server Started on %s:%d",self.ipaddress,self.port);
    });
  };
};

var application=new app();
application.initialize();
application.start();
