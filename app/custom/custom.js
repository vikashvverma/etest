define([],function(){
  var a={
    panel:function() {

          var passes = document.getElementById('passes');
        var lis = passes.querySelectorAll('li');
        for(var i = 0; i < lis.length; i++){
          lis[i].addEventListener('click', function(e){
            var current = passes.querySelector('.current');
              if(current){
                current.classList.remove('current');
              }
              else{
                e.target.classList.add('current');
              }

              positionPasses();
          });
        }
        },

  positionPasses:function(){
          var currentPassed = false;
          var hasCurrent = passes.querySelector('.current') ? true : false;
          for(var i = 0; i < lis.length; i++){
            var order = i;
            if(lis[i].classList.contains('current')) currentPassed = true;
            
            if(!currentPassed) order += 1;
            
            var offset = (order-1) * 100;
            if(hasCurrent) offset = 260 + (order+1)*40;
            console.log(hasCurrent, i, order, offset);
            //lis[i].innerHTML = offset + '/' + i + '/' + hasCurrent;
            lis[i].style.webkitTransform = 'translate3d(0, {offset}px, 0)'.replace('{offset}', offset);
          } 
        }

  };
  return a;
});
