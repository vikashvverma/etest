angular.module('etest') .service('header', [
    '$rootScope',
    '$http',
    '$facebook',
    'localStorageService',
    function ($rootScope, $http, $facebook, localStorageService) {
        //var description_home="Welcome to e-test! Take online verbal and aptitude test, analyze your skills using our beautiful visualizations and enhance your skills. Here at e-test, we prepare you to crack verbal and aptitude as these two are now part of any competitive examinations. Take Online verbal and aptitude tests for TCS, IBM, Mu Sigma etc. Try out TCS Verbal Test Simulator chrome app and take test in offline mode. Also visit our website www.programminggeek.in for placement preparation.";
        var description="";
        var keywords_home="";



        $rootScope.title = 'e-test: Free Online Verbal and Aptitude Test for TCS, IBM, Infosys';
        // $rootScope.description=description_home;
        // $rootScope.keywords=keywords_home;


        this.getTitle = function () {
            return $rootScope.title;
        };
        this.setTitle = function (title) {
            $rootScope.title = title;
        };
        this.getDescription=function(){
            return $rootScope.description;
        };
        this.setDescription=function(descritpion){
            $rootScope.description=descritpion;
        };
        this.getKeywords=function(){
            return $rootScope.keywords;
        };
        this.setKeywords=function(keywords){
            $rootScope.keywords=keywords;
        };

    }
]);
