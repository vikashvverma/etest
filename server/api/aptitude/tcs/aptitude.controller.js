'use strict';
var _ = require('lodash');
var Test = require('./aptitude.model');

exports.index = function (req, res) {

};

exports.fetch = function (req, res) {

};
exports.create= function (req,res) {
  var test=new Test(req.body);
  tes.qset=test.id;
  test.save(function(err,data){
    if(err){
      return res.send(500);
    }
    res.json(200,data);
  });
};
exports.getRankStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({qset: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var out = {};
    data.map(function (obj) {
      if (out[obj.userId]) {
        out[obj.userId].score += obj.score;
        out[obj.userId].count += 1;
        out[obj.userId].avg = Number(((out[obj.userId].score) / (out[obj.userId].count)).toFixed(2));
      } else {
        out[obj.userId]={};
        out[obj.userId].score = obj.score;
        out[obj.userId].count = 1;
        out[obj.userId].avg = obj.score;
      }
      return obj.score;
    });
    var stats = [];
    var temp={};
    for(var key in out){
      temp[out[key].avg]=temp[out[key].avg]?1+out[key].avg:1;
    }
    for(var key in temp) {
      stats.push({y:Number(key),name:temp[key]});
    }
    var index=stats.indexOf(out[req.query.userId].avg);
    if(index>=0){
      stats[index]={
        y: out[req.query.userId].avg,
        marker: {
          symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
        }
      };
    }
    stats=stats.sort(function(prev,next){
      if(prev.constructor==Object){
        return prev.y<=next;
      }
      if(next.constructor==Object){
        return prev<=next.y;
      }
      return prev<=next;
    });
    stats.unshift(0);
    return res.json([{name: 'Rank', data: stats}]);
  });
};
exports.getAllStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.find({userId:req.query.userId}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var sets = [];
    data = data.sort(function (a, b) {
      sets.push(a.qset);
      return a.qset > b.qset ? -1 : 1;
    });

    sets = sets.filter(function (val, index, arr) {
      return arr.indexOf(val) == index;
    });

    sets.sort();

    var out = [];
    for (var i = sets.length - 1; i >= 0; i--) {
      out.push({id: sets[i], name: 'Set ' + sets[i], data: []});
    }
    for (var j = data.length - 1; j >= 0; j--) {
        out[data.qset - 1].data.push(data[j].score);
    }
    return res.json(out);
  });
};
exports.getStatistics = function (req, res) {
  //console.log(1,req.query.userId);
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({qset: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var result = data.filter(function (obj) {
      return obj.userId == req.query.userId;
    });
    result = result.map(function (obj) {
      return obj.score;
    });
    //if not used then first element will be hidden
    result.unshift(0);
    return res.json([{name: 'Set ' + req.params.id, data: result}]);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}
