'use strict';
var _ = require('lodash');
var Test = require('./verbal.model');
var debug = require('debug')('tcs.verbal.controller');
// Get list of things
exports.index = function (req, res) {
  Test.find({}, function (err, tests) {
    if (err) {
      return handleError(res, err);
    }
    //console.log(tests);
    tests = tests.sort(function (a, b) {
      return a.id > b.id?1:-1;
    });
    console.log(JSON.stringify(tests,null,4));
    var data = [];
    var set = {tests: []};
    for (var i = 0; i < tests.length; i++) {
      var obj = {};
      obj.id = tests[i].id;
      obj.names=tests[i].names;
      obj.title = tests[i].title;
      obj.question = tests[i].question;
      obj.count = tests[i].statistics.length;
      if (tests[i].statistics.length) {
        var user = tests[i].statistics.reduce(function (prev, cur) {
          return prev.score > cur.score ? prev : cur;
        });
        obj.highest_score = user.score;
        obj.highest_scorer = user.name;
        user = tests[i].statistics.reduce(function (prev, cur) {
          return prev.date > cur.date ? prev : cur;
        });
        obj.last_attempt_by = user.name;
        obj.last_attempt_on = user.attempted_on;
        console.log(JSON.stringify(user,null,4));
      }

      obj.date = tests[i].created_on;
      set.tests.push(obj);
      if (set.tests.length == 3 || i == tests.length - 1) {
        data.push(set);
        set = {tests: []};
      }
    }
    return res.json(200, data);
  });
};

exports.fetch = function (req, res) {
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    console.log(data);
    return res.json(data);
  });
};
exports.update = function (req, res) {
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    data.statistics.push(req.body);
    data.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data.statistics.pop());
    });
  });
};
exports.patch = function (req, res) {
  Test.findOne({id: req.params.testId}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var length=data.statistics.length,index=-1;
    for(var i=0;i<length;i++){
      if(data.statistics[i]._id==req.params.id){
        index=i;
        break;
      }
    }
    if(i>=0){
      data.statistics.splice(i,1);
    }
    data.statistics.push(req.body);
    data.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data.statistics[data.statistics.length-1]);
    });
  });
};
exports.getRankStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var out = {};
    data.statistics.map(function (obj) {
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
    // var stats = [];
    // for (var key in out) {
    //   if (req.query.userId == key) {
    //     stats.push({
    //       y: out[key].avg,
    //       marker: {
    //         symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
    //       }
    //     })
    //   } else {
    //     stats.push(out[key].avg);
    //   }
    // }
    var stats = [];
    var temp={};
    for(var key in out){
      temp[out[key].avg]=temp[out[key].avg]?1+temp[out[key].avg]:1;
    }
    for(var key in temp) {
      if(out[req.query.userId].avg==Number(key)){
        stats.push({
        y: Number(key),
        marker: {
          symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
        }
      });
      }else{
        stats.push(Number(key));
      }
    }
    console.log(JSON.stringify(stats,4,null));
    stats=stats.sort(function(prev,next){
      if(prev.constructor==Object){
        return next-Number(prev.y);
      }
      if(next.constructor==Object){
        return Number(next.y)-prev;
      }
      return next-prev;
    });
    if(stats.length&& stats[stats.length-1])
    stats.push(0);
    return res.json([{name: 'Rank', data: stats}]);
  });
};

exports.getAllStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.find({}, function (err, data) {
    console.log('aaaa', err, data);
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    data = data.sort(function (a, b) {
      return a.id > b.id?-1:1;
    });

    var out = [];
    for (var i = data.length - 1; i >= 0; i--) {
      var temp = [];
      for (var j = data[i].statistics.length - 1; j >= 0; j--) {
        if (data[i].statistics[j].userId == req.query.userId)
          temp.push(data[i].statistics[j].score);
      }
      out.push({id: data[i].id, name: 'Set ' + data[i].id, data: temp});
    }
    return res.json(out);
  });
};
exports.getStatistics = function (req, res) {
  //console.log(1,req.query.userId);
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var result = data.statistics.filter(function (obj) {
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
