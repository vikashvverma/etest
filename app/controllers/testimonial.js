angular.module('etest') .controller('testimonialController', [
    '$scope',
    '$rootScope',
    '$http',
    '$mdDialog',
    'header',
    function ($scope, $rootScope, $http, $mdDialog, header)
    {
        header.setTitle('e-test : Testimonial');
        $rootScope.page = 'testimonial';
        $rootScope.panelClass = 'panel-danger';
        $rootScope.flag = true;
        $scope.testimonials = [
        ];
        $scope.templates = [
            {
                name: 'testimonialform.html',
                url: './app/views/testimonialform.html'
            }
        ];
        $scope.testimonialForm = $scope.templates[0];
        $http({
            method: 'POST',
            url: $rootScope.urlPrefix + 'etest/testimonials.php',
            params: {
                max: 10
            }
        }) .then(function (data) {
            $scope.testimonials = data.data;
            console.log(data);
        }) .catch (function (err) {
            console.log(err.message);
        }) .finally (function (data) {
        });
        $scope.submit = function (ev) {
            $mdDialog.show({
                controller: dialogController,
                templateUrl: './app/views/testimonial_form.html',
                targetEvent: ev,
            }) .then(function (id) {
                //alertify.success("Set ID : "+id);
                //$location.path('Aptitude/TCS/Set/'+id);
            }, function () {
                //alertify.error('You cancelled the dialog.');
            });
        };
        function dialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.proceed = function () {
                $mdDialog.hide(' ');
            };
            $scope.signup = function () {
                console.log($scope.name + ' ' + $scope.email + ' ' + $scope.college + ' ' + $scope.message);
                if (!$scope.name || !$scope.college || !$scope.email || !$scope.message)
                    alertify.error('Name, College, eMail and message are mandatory!');
                else {
                    $scope.time=new Date().toDateString();
                    $scope.submitTestimonial();                    
                }
            };
            $scope.submitTestimonial = function () {
                $http({
                    method: 'POST',
                    url: $rootScope.urlPrefix + 'etest/testimonialinsert.php',
                    params: {
                        name: $scope.name,
                        college: $scope.college,
                        email: $scope.email,
                        facebook: $scope.facebook,
                        google: $scope.google,
                        twitter: $scope.twitter,
                        message: $scope.message,
                        time: $scope.time
                    }
                }) .then(function (data) {
                    console.log(data);
                    alertify.success('Testimonial submitted for approval!');
                    $mdDialog.hide(' ');
                }) .catch (function (err) {
                    console.log(err.message);
                    alertify.error('Sorry unable to submit your Testimonial!\nPlease try again later! \nor\n Drop a mail at admin@programminggeek.in');
                }) .finally (function (data) {
                    $scope.name = '';
                    $scope.college = '';
                    $scope.message = '';
                    $scope.email = '';
                    $scope.facebook = '';
                    $scope.google = '';
                    $scope.twitter = '';
                    $scope.time = '';
                });
                return false;
            };
        };
    }
]);
