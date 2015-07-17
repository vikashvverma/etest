angular.module("etestApp").directive('etestHeader', function() {
  function link(scope, element, attrs) {
    var $element = $(element);
    $element.click(function() {
      /* $("html, body").animate({ scrollTop: 0 }, "slow");
       return false;*/
    });
    scope.$on('top', function() {
      //alert();
      $element.removeClass('md-whiteframe-z3');
    });
    scope.$on('scrolling', function() {
      //alert();
      $element.addClass('md-whiteframe-z3');
    });
  }

  return {
    link: link
  };
});
