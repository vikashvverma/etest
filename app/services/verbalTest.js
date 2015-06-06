angular.module('etest') .service('VerbalTest', [
    '$rootScope',
    '$http',
    function ($rootScope, $http) {
        var TCSSetId = 1;
        return {
            getTCSSetId: function () {
                return this.TCSSetId;
            },
            setTCSSetId: function (id) {
                this.TCSSetId = id;
            },
            spellCheck: function (answer, $scope) {
                $http({
                    method: 'POST',
                    url: $rootScope.urlPrefix + 'spell/index.php',
                    params: {
                        str: answer
                    }
                }) .then(function (data) {
                    var errors = data.data.split('programming') [0];
                    errors = errors.split('geek');
                    //$scope.mistakes.push("  ");
                    for (var i = 0; i < errors.length; i++)
                        $scope.errors.push('    ' + errors[i]);
                    //$scope.mistakes.push("");
                    $scope.errors.push('You made ' + data.data.split('programming') [1] + ' spelling mistakes.');
                    if (parseInt(data.data.split('programming') [1]) == 0) {
                        //Update user data
                        $scope.userTestData[$scope.getUserTestData.length - 1].s = $scope.userTestData[$scope.getUserTestData.length - 1].s + 10;
                        $http({
                            method: 'POST',
                            url: $rootScope.urlPrefix + 'etest/updateVerbal.php',
                            params: {
                                username: $rootScope.user.username,
                                id: $scope.verbalID,
                                str: $scope.score + 10
                            }
                        }) .then(function (data) {
                            console.log(data.data);
                        }) .catch (function (err) {
                            console.log(err.message);
                        }) .finally (function (data) {
                        });
                    }
                    //this.saveVerbalResult(info);

                }) .catch (function (err) {
                    // Called when an error has occurred
                    console.log(err.data + 'failure!');
                }) .finally (function (data) {
                    // Called always, regardless of the output result
                });
            },
            saveVerbalResult: function (data, $scope) {
                $http({
                    method: 'POST',
                    url: $rootScope.urlPrefix + 'etest/saveVerbal.php',
                    params: {
                        username: data.username,
                        score: data.score,
                        test: data.test,
                        words: data.words,
                        phrases: data.phrases,
                        salutation: data.salutation,
                        leave: data.leave,
                        caperror: data.caperror
                    }
                }) .then(function (data) {
                    $scope.verbalID = parseInt(data.data.split(';') [1].trim());
                    console.log('Verbal Test Data Saved! ' + data.data.split(';') [1].trim());
                }) .catch (function (err) {
                    // Called when an error has occurred
                    console.log('Verbal Test Data not saved');
                }) .finally (function (data) {
                    // Called always, regardless of the output result
                });
            },
            getVerbalData: function (info, $scope) {
                $http({
                    method: 'POST',
                    url: $rootScope.urlPrefix + 'etest/getVerbal.php',
                    params: {
                        username: info.username,
                        test: info.test
                    }
                }) .then(function (data) {
                    //console.log("Got Verbal Test Data "+data.data);
                    var verbalData = data.data;
                    $scope.userTestData = verbalData[0];
                    $scope.userAllData = verbalData[1];
                    $scope.allUserData = verbalData[2];
                }) .catch (function (err) {
                    // Called when an error has occurred
                    console.log('Failed to Load Verbal Data');
                }) .finally (function (data) {
                    // Called always, regardless of the output result
                });
            }
        };
    }
]);
