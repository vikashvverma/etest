angular.module('etest') .controller('verbalController', [
    '$scope',
    '$rootScope',
    '$http',
    '$mdDialog',
    'VerbalTest',
    '$location',
    'header',
    function ($scope, $rootScope, $http, $mdDialog, VerbalTest, $location, header) {
        header.setTitle('e-test: Free Online Verbal Test for TCS, IBM, Infosys');
        $rootScope.page = 'verbal';
        $scope.verbals = [
            {
                id: 1,
                name: 'IBM Verbal Test',
                company: 'IBM',
                heading: 'IBM Verbal Test'
            },
            {
                id: 2,
                name: 'CAT Verbal Test',
                company: 'CAT',
                heading: 'Verbal Test for CAT'
            }
        ];
        $scope.selectTCSVerbalTestSet = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/views/tcs_verbal_select.html',
                targetEvent: ev,
            }) .then(function (id) {
                alertify.success('Selected Set : ' + id);
                $location.path('Verbal/TCS/Set/' + id);
            }, function () {
                //alertify.error('You cancelled the dialog.');
            });
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
            $scope.proceed = function () {
                $mdDialog.hide(VerbalTest.getTCSSetId());
            };
        };
    }
]);
