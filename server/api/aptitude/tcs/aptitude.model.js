'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var TestSchema = new Schema({
  id:{type:Number},
  userId:{type:String,required:true},
  name:{type:String},
  score:{type:Number},
  time:{type:String},
  correct:{type:Number},
  incorrect:{type:Number},
  attempted:{type:Number},
  unattempted:{type:Number},
  exam:{type:String},
  qset:{type:Number},
  attempted_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('TCSAptitude', TestSchema);
