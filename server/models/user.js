var db=require('./../libs/db');
var VerbalSchema=new db.Schema({
  id:Number,
  exam:String,
  eset:Number,
  score:Number,
  words:Number,
  phrases:Number,
  salutation:Number,
  leave:Number,
  caperror:Number
});
var AptitudeSchema=new db.Schema({
  id:Number,
  exam:String,
  eset:Number,
});
var UserSchema=new db.Schema({
  username:{type:String,unique:true},
  password:{type:String},
  name:{type:String},
  college:{type:String},
  email:{type:String},
  facebook_id:{type:String},
  verbal_test:[VerbalSchema],
  aptitude_test:[AptitudeSchema],

});
var user=db.mongoose.model("user",UserSchema);

var User=function(){
};

User.prototype={
  login:function(model,callback){
    user.findOne(model,function(err,instance){
      if(err){
        callback(err);
      }else{
        callback(null,instance);
      }
    });
  },
  addUser:function(model,callback){
    var instance = new user(model);
    instance.save(function(err){
      if(err){
        callback(err);
      }else{
        callback(null,instance);
      }
    });
  },
  getUser:function(){

  },
  updateVerbalTest:function(){

  },
  updateAptitudeTest:function(){

  }
};

module.exports=User;
