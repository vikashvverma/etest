/**
 * Created by Vikash on 28/9/15.
 */
var Test=require('./tcs/aptitude.model.js');
var fs=require('fs');


module.exports=function(){
  fs.readFile('./aptitude.json',function(err,data){
    if(err){
      return console.log(err);
    }
    var models=JSON.parse(data.toString());
    //console.log(JSON.stringify(models,null,4));
    for(var i=0;i<models.length;i++){
      var model=new Test(models[i]);
      model.option=[{
        option1:models[i].option1,
        option2:models[i].option2,
        option3:models[i].option3,
        option4:models[i].option4
      }];
      model.set=models[i].qset;

      //console.log(model);
      model.save(function(err,model){
        console.log(err);
        if(err)console.log(err);
        console.log("Saved : ",JSON.stringify(model,null,4));
      });
    }
  });
};
