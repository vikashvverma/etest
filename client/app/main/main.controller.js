'use strict';

angular.module('etestApp')
  .controller('MainCtrl', function ($rootScope,$scope, $location,$mdSidenav,$timeout,$window,$sce, Auth) {
    var vm = this;

    vm.commentbox={
      url:$location.absUrl(),
      width:$window.innerWidth-40,
      height:300,
      show:$location.path()=='/'?false:true
    };
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if(next.url=='/'){
        vm.commentbox.show=false;
      }else{
        vm.commentbox.show=true;
      }
    });
    try{$timeout(function(){FB.XFBML.parse($('#commentbox')[0]);},0);}catch(msg){}
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.years=[];
    vm.branches=[];

    vm.logout = function () {
      Auth.logout();
      $location.path('/login');
    };
    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    $rootScope.share=function(site,post){
      var sharing={
        'facebook':function(post){
          $window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(post.url) + '&p[images][0]=' + encodeURIComponent(post.url) + '&p[title]=' + encodeURIComponent(post.name) + '&p[summary]=' + encodeURIComponent('Sharing using ProgrammingGeek... :)'), 'Facebook', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        'twitter':function(post){
          $window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(post.url) + '&text=' + encodeURIComponent('via ProgrammingGeek... :)') + '%20' + encodeURIComponent(post.url), 'Twitter', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        'google':function(post){
          $window.open('//plus.google.com/share?url=' + encodeURIComponent(post.url), 'GooglePlus', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        }
      };
      sharing[site](post);
    };
    vm.blogs=[{
      heading:'Popular Tests',
      items:[{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Verbal Test',
        content:'Take online TCS verbal ability test and analyze your performance',
        url:"http://etest.programminggeek.in/#!/Verbal",
        sref:'main.tcsverbal'
      },{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Verbal Test Chrome App',
        content:'Download our Chrome App from and take TCS Verbal ability test offline.',
        url:"https://chrome.google.com/webstore/detail/tcs-verbal-test-simulator/mldfkmkaobhdebanldjiiaancjmflpcc"
      },{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Analytical Ability Test',
        content:'Take TCS Analytical Ability Test, analyze and improve your performance.',
        url:"http://etest.programminggeek.in/#!/Aptitude"
      }]
    }];

    vm.mainMenu = [
      {
        icon: "fa fa-unlock fa-2x",
        title: "Verbal",
        tooltip: "Verbal Test",
        url: 'main.verbal'
      },
      {
        icon: "fa fa-lock fa-2x",
        title: "Aptitude",
        tooltip: "Aptitude Test",
        url: 'main.aptitude'
      },
      {
        icon: "fa fa-lock fa-2x",
        title: "Leaderboard",
        tooltip: "Leader Board",
        url: 'main.leaderboard'
      },
      {
        icon: "fa fa-lock fa-2x",
        title: "Placement",
        tooltip: "Placement",
        url: 'main.placement'
      },
      {
        icon: "fa fa-lock fa-2x",
        title: "Testimonial",
        tooltip: "Testimonial",
        url: 'main.testimonial'
      }
    ];
    vm.extraMenu=[{
      icon: "fa fa-info-circle ",
      title: "About",
      tooltip: "About Us",
      url:'main.aboutus'
    },{
      icon: "fa fa-envelope ",
      title: "Contact us",
      tooltip: "Contact Us",
      url:'main.contactus'
    }
    ];

    vm.userMenu = [
      //{
      //  link : '',
      //  title: 'Dashboard',
      //  icon: 'fa fa-lock fa-2x'
      //},
      //{
      //  link : '',
      //  title: 'Friends',
      //  icon: 'fa fa-lock fa-2x'
      //},
      //{
      //  link : '',
      //  title: 'Messages',
      //  icon: 'fa fa-lock fa-2x'
      //}
    ];
    vm.people = [
      { name: 'Janet Perkins', img: 'assets/images/100-0.jpeg', newMessage: true },
      { name: 'Mary Johnson', img: 'assets/images/100-1.jpeg', newMessage: false },
      { name: 'Peter Carlsson', img: 'assets/images/100-2.jpeg', newMessage: false }
    ];


  });
