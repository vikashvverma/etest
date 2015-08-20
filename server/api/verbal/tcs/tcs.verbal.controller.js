'use strict';
var _=require('lodash');
var Test=require('./verbal.model');
var debug = require('debug')('tcs.verbal.controller');
// Get list of things
exports.index = function(req, res) {
  Test.find({},function (err, tests) {
    if(err) { return handleError(res, err); }
    //console.log(tests);
    tests=tests.sort(function(a,b){
      return a.id> b.id;
    });
    var data=[];
    var set={tests:[]};
    for(var i=0;i<tests.length;i++){
      var obj={};
      obj.id=tests[i].id;
      obj.title=tests[i].title;
      obj.question=tests[i].question;
      obj.count=tests[i].statistics.length;
      if(tests[i].statistics.length){
        var user=tests[i].statistics.reduce(function(prev,cur){return prev.marks>cur.marks?prev:cur;});
        obj.highest_score=user.marks;
        obj.highest_scorer=user.userId;
        user=tests[i].statistics.reduce(function(prev,cur){return prev.date>cur.marks?prev:cur;});
        obj.last_attempt_by=user.name;
        obj.last_attempt_on=user.attempted_on;
      }

      obj.date=tests[i].created_on;
      set.tests.push(obj);
      if(set.tests.length==3 || i==tests.length-1){
        data.push(set);
        set={tests:[]};
      }
    }
    return res.json(200, data);
  });
};

exports.fetch=function(req,res){
  Test.findOne({id:req.params.id},function(err,data){
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }
    console.log(data);
    return res.json(data);
  });
};
exports.update=function(req,res){
  Test.findOne({id:req.params.id},function(err,data){
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }
    console.log(JSON.stringify(data,null,4));
    data.statistics.push(req.body);
    data.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, data);
    });
  });
};
exports.getRankStatistics=function(req,res){
  if(!req.query.userId){ return res.send(404); }
  Test.find({id:req.params.id},function(err,data){
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }

    var out=[];
    for(var i=data.length-1;i>=0;i--){
      var temp=[];
      for(var j=data[i].statistics.length-1;j>=0;j--){
        if(data[i].statistics[j].userId==req.query.userId)
          temp.push(data[i].statistics[j].score);
      }
      out.push({id:data[i].id,name:'Set '+data[i].id,data:temp});
    }
    return res.json(out);
  });
};

exports.getAllStatistics=function(req,res){
  console.log('aaaaaaaaaaaaaaaaaa',req.query.userId);
  if(!req.query.userId){ return res.send(404); }
  Test.find({},function(err,data){
    console.log('aaaa',err,data);
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }

    var out=[];
    for(var i=data.length-1;i>=0;i--){
      var temp=[];
      for(var j=data[i].statistics.length-1;j>=0;j--){
        if(data[i].statistics[j].userId==req.query.userId)
        temp.push(data[i].statistics[j].score);
      }
      out.push({id:data[i].id,name:'Set '+data[i].id,data:temp});
    }
    return res.json(out);
  });
};
exports.getStatistics=function(req,res){
  //console.log(1,req.query.userId);
  if(!req.query.userId){ return res.send(404); }
  Test.findOne({id:req.params.id},function(err,data){
    //console.log(2,err);
    //console.log(3,data);
    if(err) { return handleError(res, err); }
    if(!data) { return res.send(404); }
   // console.log(4,data);
    var result=data.statistics.filter(function(obj){
      return obj.userId==req.query.userId;
    });
    //console.log(result);
    result=result.map(function(obj){
      return obj.score;
    });
    //console.log(result);
    return res.json([{name:'Set '+ req.params.id,data:result}]);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}