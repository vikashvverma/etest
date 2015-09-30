'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var TestSchema = new Schema({
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
  created_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('Aptitude', TestSchema);
