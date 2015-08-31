'use strict';

angular.module('etestApp')
  .controller('MainCtrl', function ($scope, $location,$mdSidenav,$timeout, Auth) {
    var vm = this;
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

    vm.blogs=[{
      heading:'Popular Tests',
      items:[{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Verbal Test',
        content:'Take online TCS verbal ability test and analyze your performance'
      },{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Verbal Test Chrome App',
        content:'Download our Chrome App from and take TCS Verbal ability test offline.'
      },{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Analytical Ability Test',
        content:'Take TCS Analytical Ability Test, analyze and improve your performance.'
      }]
    },{
      heading:'Popular Blogs',
      items:[{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Verbal Test',
        content:'Take online TCS verbal ability test and analyze your performance'
      },{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Verbal Test Chrome App',
        content:'Download our Chrome App from and take TCS Verbal ability test offline.'
      },{
        image:'http://4.bp.blogspot.com/-ib-jTmEsx4E/Urk9CplFXrI/AAAAAAAAAhQ/aTVfjHAuQa8/s400/tcs1.jpg',
        title:'TCS Analytical Ability Test',
        content:'Take TCS Analytical Ability Test, analyze and improve your performance.'
      }]
    }];

    vm.mainMenu = [
      {
        icon: "fa fa-lock fa-2x",
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
      icon: "fa fa-lock fa-2x",
      title: "About",
      tooltip: "About Us",
      url:'main.aboutus'
    },{
      icon: "fa fa-lock fa-2x",
      title: "Contact us",
      tooltip: "Contact Us",
      url:'main.contactus'
    }
    ];

    vm.userMenu = [
      {
        link : '',
        title: 'Dashboard',
        icon: 'fa fa-lock fa-2x'
      },
      {
        link : '',
        title: 'Friends',
        icon: 'fa fa-lock fa-2x'
      },
      {
        link : '',
        title: 'Messages',
        icon: 'fa fa-lock fa-2x'
      }
    ];
    vm.people = [
      { name: 'Janet Perkins', img: 'assets/images/100-0.jpeg', newMessage: true },
      { name: 'Mary Johnson', img: 'assets/images/100-1.jpeg', newMessage: false },
      { name: 'Peter Carlsson', img: 'assets/images/100-2.jpeg', newMessage: false }
    ];


  });
