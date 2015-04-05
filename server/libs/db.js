var mongoose=require('mongoose');
var Schema=mongoose.Schema;

module.exports.mongoose=mongoose;
module.exports.Schema=Schema;


// mongoose.connect('mongodb://localhost/etest');

var db = function(){
  this.username="";
  this.password="";
  this.address="";
};

db.prototype={
  connect:function(){
    var url="mogodb://"+this.username+":"+this.password+this.address;
    mongoose.connect('mongodb://localhost:27017/etest');
  },
  disconnect:function(){
    mongoose.disconnect();
  }
};

new db().connect();
