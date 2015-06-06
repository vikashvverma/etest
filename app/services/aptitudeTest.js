angular.module('etest') .service('aptitudeTest', [
    '$rootScope',
    '$http',
    '$facebook',
    'localStorageService',
    function ($rootScope, $http, $facebook, localStorageService) {
        var TCSSetId = 1;
        this.getTCSSetId = function () {
            return this.TCSSetId;
        };
        this.setTCSSetId = function (id) {
            this.TCSSetId = id;
        };
        this.getTCSAptitudeQuestions = function (info, $scope) {
            $http({
                method: 'POST',
                url: $rootScope.urlPrefix + 'etest/getAptitudeQuestion.php',
                params: {
                    company: info.company,
                    section: info.section,
                    lod: info.lod,
                    set: info.set
                }
            }) .then(function (data) {
                //console.log("Got Aptitude Questions " + data.data);
                for (var i = 0; i < data.data.length; i++) {
                    var q = {
                        id: i + 1,
                        question: data.data[i].q,
                        option1: data.data[i].o1,
                        option2: data.data[i].o2,
                        option3: data.data[i].o3,
                        option4: data.data[i].o4,
                        answer: data.data[i].a,
                        ans: 0,
                        star: data.data[i].l > 2 ? true : false,
                        mr: false
                    };
                    $scope.questions.push(q);
                }
                $scope.fetchingAptQuestions = false;
            }) .catch (function (err) {
                // Called when an error has occurred
                console.log('Failed to Load Aptitude Questions ' + err.message);
            }) .finally (function (data) {
                // Called always, regardless of the output result
            });
        };
        this.getTCSAptitudeData = function (info, $scope) {
            $http({
                method: 'POST',
                url: $rootScope.urlPrefix + 'etest/getAptitude.php',
                params: {
                    username: info.username,
                    exam: info.exam,
                    set: info.set
                }
            }) .then(function (data) {
                //console.log("Got Verbal Test Data "+data.data);
                var aptitudeData = data.data;
                $scope.userTestData = aptitudeData[0];
                $scope.allUserData = aptitudeData[1];
                if(!$scope.examStatus){
                    $scope.draw('spline');
                    $scope.drawRankGraph('line');
                    $scope.visualize();
                }
                
            }) .catch (function (err) {
                // Called when an error has occurred
                console.log('Failed to Load Aptitude Data');
            }) .finally (function (data) {
                // Called always, regardless of the output result
            });
        };
        this.saveTCSAptitudeResult = function (data, $scope) {
            $http({
                method: 'POST',
                url: $rootScope.urlPrefix + 'etest/saveAptitude.php',
                params: {
                    username: data.username,
                    score: data.score,
                    exam: data.exam,
                    set: data.set
                }
            }) .then(function (data) {
                console.log('Aptitude Test Data Saved! ' + data.data);
            }) .catch (function (err) {
                // Called when an error has occurred
                console.log('Verbal Test Data not saved');
            }) .finally (function (data) {
                // Called always, regardless of the output result
            });
        };
    }
]);
