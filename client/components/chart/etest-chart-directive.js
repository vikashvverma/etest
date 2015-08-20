angular.module("etestApp").directive('etestChart', function (ChartService,$window) {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      type: '=',
      title:"@"
    },
    link: function (scope, element, attrs) {
      scope.$watch('type', function (newType, oldType) {
        if(!scope.data) return;
        if (newType == 'pie') {
          $(element).css({width:'98%',height:'auto',margin:'0 auto'});
          $(element).highcharts(ChartService.getPie(scope.data));
        } else {
          $(element).highcharts(ChartService.getChart(scope.title, scope.type, scope.data));
        }

        $(element).find('text') .last() .html('Programming Geek') .click(function (event) {
          event.preventDefault();
          $window.location = 'http://www.programminggeek.in';
        });
        $('html, body').animate({
          scrollTop: $(element).offset().top
        }, 2000);
      });
      scope.$watch('data', function (data,old) {
        if(!data) return;
        $(element).css({width:'98%',height:'auto',margin:'0 auto'});
        if (scope.type == 'pie') {
          $(element).highcharts(ChartService.getPie(data));
        } else {
          $(element).highcharts(ChartService.getChart(scope.title, scope.type, data));
        }

        $(element).find('text') .last() .html('Programming Geek') .click(function (event) {
          event.preventDefault();
          $window.location = 'http://www.programminggeek.in';
        });
      });

    }
  };
});
