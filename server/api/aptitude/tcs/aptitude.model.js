'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var TestSchema = new Schema({
  userId:{type:String,required:true},
  name:{type:String},
  score:{type:Number},
  time:{type:String},
  correct:{type:Number},
  incorrect:{type:Number},
  attempted:{type:Number},
  unattempted:{type:Number},
  id:{type:Number,unique:true,required:true},
  question:{type:String,required:true},
  option:[{
    option1:{type:String, required:true},
    option2:{type:String,required:true},
    option3:{type:String,required:true},
    option4:{type:String,required:true}
  }],
  lod:{type:Number},
  exam:{type:String},
  answer:{type:String},
  section:{type:String},
  year:{type:String},
  qset:{type:Number},
  statistics:[{
    userId:{type:String,required:true},
    name:String,
    score:Number,
    error:Number,
    warnings:Number,
    attempted_on:{type:Date,default:new Date()}
  }],
  created_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('TCSAptitude', TestSchema);
