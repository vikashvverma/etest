angular.module('etest') .controller('TCSVerbalTestController', [
    '$scope',
    '$rootScope',
    '$mdToast',
    '$stateParams',
    'login',
    '$http',
    '$timeout',
    'localStorageService',
    'VerbalTest',
    '$location',
    'header',
    function ($scope, $rootScope, $mdToast, $stateParams, login, $http, $timeout, localStorageService, VerbalTest, $location, header) {
        header.setTitle('e-test: Online TCS Verbal Ability Test for Free');
        $scope.id = $stateParams.id;
        if ($scope.id <= 0 || $scope.id > 16 || !$scope.id) {
          $location.path('/error');
        }
        $scope.loading = false;
        $rootScope.logged = login.isLogged();
        $scope.userTestData = [
        ];
        $scope.userAllData = [
        ];
        $scope.allUserData = [
        ];
        $scope.cummulativeGraphType = 'spline';
        $scope.individualGraphType = '3d column';
        $scope.logme = function () {
            login.login();
        };
        if ($rootScope.user == null) {
            // $rootScope.user = {
            //     username: '+VikashVerma',
            //     first_name: 'Vikash',
            //     email: 'vikash@programminggeek.in'
            // };
            // localStorageService.set('user', $rootScope.user);
        }
        $scope.loadQuestion = function () {
            $http({
                method: 'GET',
                url: './app/questions/question' + $scope.id + '.json',
                params: {
                }
            }) .then(function (data) {
                console.log(data.data.question + '\n' + data.data.phrases);
                //this.question=data.data;
                $scope.done = true;
                $scope.question = data.data.question;
                $scope.phrase = data.data.phrases;
                $scope.time = 600;
                $scope.minutes = 10;
                $scope.seconds = '00';
                $scope.title = 'Online TCS Verbal Ability Test';
                $scope.test = true;
                $scope.loading = true;
                console.log($scope.loading);
                if ($rootScope.user) {
                    //$scope.startTime();
                    $rootScope.logged = true;
                    alertify.success('Loaded TCS Verbal Test' + $stateParams.id + '!');
                    var info = {
                      username: $rootScope.user.username,
                      test: $scope.id
                    };
                    VerbalTest.getVerbalData(info, $scope);
                } else {
                    $rootScope.logged = false;
                    alertify.error('You are not logged in!');
                }
                $scope.startTime();
            }) .catch (function (err) {
                // Called when an error has occurred
            }) .finally (function (data) {
                // Called always, regardless of the output result
            });

        };
        $scope.loadQuestion();
        $scope.startTime = function () {
            if ($scope.time % 60 < 10) {
                $scope.minutes = parseInt($scope.time / 60);
                $scope.seconds = '0' + $scope.time % 60;
                ;
            } else {
                $scope.minutes = parseInt($scope.time / 60);
                $scope.seconds = $scope.time % 60;
            }
            if ($scope.time > 0) {
                $scope.timer = $timeout($scope.startTime.bind(this), 1000);
            } else
                $scope.endTest();
            $scope.time -= 1;
        };
        $scope.endTime = function () {
            $scope.time = 0;
        };
        $scope.endTest = function () {
            if (!$scope.answer) {
                $scope.answer = '';
            }
            if (!$scope.count) {
                $scope.count = 0;
            }
            $scope.check();
            $scope.visualize();
        };
        $scope.check = function () {
            var content = $scope.answer;
            var score = 50;
            var count = $scope.wordCount(content);
            var capError = $scope.capitalizationError(content);
            $scope.vleavetaking = 100;
            $scope.vcaperror = 0;
            $scope.vsalutation = 100;
            $scope.mistakes = [
            ];
            $scope.errors = [
            ];
            // this.model.set("vcaperror",(capError*100)/count);
            // this.model.set("vleavetaking",(this.leaveTakingError(content)?0:100));
            // this.model.set("vsalutation",100);
            // this.model.set('answer',content);
            // this.model.set('vcount',count);
            // this.model.set('count',count);
            if ($scope.salutationError(content)) {
                //this.model.set("vsalutation",0);
                $scope.vsalutation = 0;
                score -= 10;
                $scope.mistakes.push('You have not provided a proper salutation. Include a proper salutation e.g. \'Dear\' ');
            }
            if (capError > 0) {
                $scope.vcaperror = capError;
                score -= 10;
                $scope.mistakes.push('Please capitalize words as and when required. Number of capitalization errors : ' + capError);
            }
            if ($scope.unmatchedPhrases($scope.phrase, content) > 0) {
                score -= 20;
                $scope.mistakes.push('You have not included all the phrases in the email. Include all the phrases.');
            }
            if ($scope.leaveTakingError(content)) {
                $scope.vleavetaking = 0;
                score -= 10;
                $scope.mistakes.push('You have not used a correct form of leave taking.');
                $scope.mistakes.push('     Recommended : ');
                $scope.mistakes.push('        Regards');
                $scope.mistakes.push('        Thanks');
                $scope.mistakes.push('        Thanks and regards');
            }
            //this.model.set("vaccuracy",score);

            if ($scope.wordCount(content) < 70) {
                score += 30;
            } else
                if ($scope.wordCount(content) <= 90) {
                    score += 40
                } else {
                    score += 35;
                }
            if ($scope.wordCount(content) < 50) {
                score = 0;
                //this.model.set('score',score);
                $scope.score = score;
                $scope.scoreRemark = $scope.scoreSuggestion(score);
            } else {
                //this.model.set("vaccuracy",score);
                //this.model.set('score',score+"<br/>"+this.scoreSuggestion(score));
                $scope.score = score;
                $scope.scoreRemark = $scope.scoreSuggestion(score);
            }
            $scope.countRemark = $scope.wordCountSuggestion($scope.wordCount(content));
            //this.model.set("vscore",score);
            $scope.done = true;
            $scope.test = false;
            $scope.report = true;
            $rootScope.title = 'Online TCS Verbal Ability Test : Perfomance Analysis';
            var data = {
                username: $rootScope.user.username,
                score: $scope.score,
                test: $scope.id,
                words: $scope.count,
                phrases: $scope.phrasesPercent,
                salutation: $scope.vsalutation,
                leave: $scope.vleavetaking,
                caperror: $scope.vcaperror
            };
            $scope.spellingMistakes($scope.answer);
            VerbalTest.saveVerbalResult(data, $scope);
            //            $scope.allUserData.push({
            //                s: $scope.score,
            //                t: $scope.id
            //            });
            $scope.userAllData.push({
                s: $scope.score,
                t: $scope.id
            });
            $scope.userTestData.push({
                s: $scope.score
            });
        };
        $scope.wordCount = function (content) {
            if (content.length == 0)
                return content.length;
            var seperatePlusText = content.replace(/\s/g, '+');
            var m = seperatePlusText.replace(/^\s/g, '+');
            var str1 = m.replace(/\+*$/gi, '');
            var str2 = str1.replace(/\++/g, ' ');
            //alert(str2);
            return str2.split(' ') .length;
        };
        $scope.setCount = function () {
            //alert($scope.content);
            if ($scope.time) {
                $scope.count = $scope.wordCount($scope.answer);
            } else {
                $scope.endTest();
            }
        };
        $scope.capitalizationError = function (content) {
            if (content)
                return 0;
            var count = 0;
            count += (content.length - content.replace(' i ', '  ') .length);
            content = content.replace('Mr.', '');
            content = content.replace('Ms.', '');
            var sentences = content.trim() .split('.');
            for (var i = 0; i < sentences.length; i++) {
                sentences[i] = sentences[i].trim();
                if ((sentences[i].charAt(0) + '') == (sentences[i].charAt(0) + '') .toUpperCase())
                    continue;
                else
                    count++;
            }
            return count;
        };
        $scope.salutationError = function (content) {
            return content.indexOf('Dear') < 0;
        };
        $scope.leaveTakingError = function (content) {
            return content.indexOf('Thanks') < 0 && content.indexOf('Thanks and regards') < 0 && content.indexOf('Regards') < 0;
        };
        $scope.wordCountSuggestion = function (count) {
            if (count < 50)
                return 'Bad! You email should contain at least 50 words.';
            if (count <= 70)
                return 'Good! You can add a few more words.';
            if (count <= 80)
                return 'Excellent! Your email is of precise length.';
            return 'Bad! Your email is too lengthy. Avoid making it too long.';
        };
        $scope.unmatchedPhrases = function (phrases, content) {
            phrases = phrases.trim() .toUpperCase() .split('-');
            content = content.toUpperCase();
            var count = 0;
            for (var i = 0; i < phrases.length; i++) {
                //alert(phrases[i]);
                if (content.indexOf(phrases[i].trim()) < 0) {
                    //alert(phrases[i]);
                    count++;
                }
            }
            $scope.phrasesPercent = ((phrases.length - count) * 100) / phrases.length;
            return count;
        };
        $scope.scoreSuggestion = function (score) {
            if (score < 50)
                return 'Bad! Improve your score.';
            if (score < 80)
                return 'Good! Missed something? Here are a few tips to remember : http://goo.gl/AouxeV';
            if (score < 90)
                return 'Very Good! Your chance of geeting seleceted is high. Improve your score.';
            return 'Excellent! You will qualify Verbal Ability Test. Avoid any spelling or grammatical error.';
        };
        $scope.retakeTest = function () {
            //window.location="/TCSTest./app";
            $location.path('Verbal');
            $timeout(function () {
                $location.path('Verbal/TCS/Set/' + $scope.id);
            }, 100);
        };
        $scope.printReport = function () {
            window.print();
        };
        $scope.spellingMistakes = function (content) {
            if (content == null || content.trim() .length == 0) {
                $scope.mistakes.push('You made 0 spelling mistakes.');
                return ;
            }
            content = content.replace(/(^\s*)|(\s*$)/gi, '');
            //exclude  start and end white-space
            content = content.replace(/[ ]{2,}/gi, ' ');
            //2 or more space to 1
            content = content.replace(/\n /, ' ');
            // exclude newline with a start spacing
            VerbalTest.spellCheck(content, $scope);
        };
        $scope.visualize = function () {
            $('ul li') .codexgraph({
                knobcolor: '#14b9d5',
                fillcolor: '#fff',
                textcolor: '#000',
            });
            $('#visualization ul li:first') .trigger('click');
            $timeout(function () {
                $scope.draw('3d column');
                $scope.drawAll('spline');
                $scope.drawRankGraph('line');
                window.scrollTo(0, 0);
            }, 100);
            $scope.$watch('allUserData',function(newdData){
                    $scope.draw('3d column');
                $scope.drawAll('spline');
                $scope.drawRankGraph('line');
                window.scrollTo(0, 0);

            });
        };
        $rootScope.saveAnswer = function () {
            if ($scope.count < 50) {
                alertify.error('To save, your answer must contain at least 50 word!');
                return ;
            }
            $http({
                method: 'POST',
                url: $rootScope.urlPrefix + 'etest/setjson.php',
                params: {
                    username: $scope.user.username,
                    answer: $scope.answer,
                    score: $scope.score,
                    test: $scope.id
                }
            }) .then(function (data) {
                console.log(data.data + ' data saved!');
                alertify.success('Answer Saved');
            }) .catch (function (err) {
                console.log(err.message);
            }) .finally (function (data) {
            });
        };
        $scope.draw = function (type) {
            var title = 'Performance Analysis';
            var subtitle = 'TCS Verbal Test Set' + $scope.id;
            var xTitle = 'Time ( Test Taken)';
            var yTitle = ' Performance (%)';
            var series = [
                {
                    name: 'TCS Verbal Test Set' + $scope.id,
                    data: $scope.formatData($scope.userTestData)
                }
            ];
            if (type == '3d column') {
                var chart = {
                    renderTo: 'container',
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                };
                $scope.cummulativeRanking(chart, 'individualRanking', series, title, subtitle, xTitle, yTitle);
            } else {
                $scope.cummulativeRanking({
                    type: type
                }, 'individualRanking', series, title, subtitle, xTitle, yTitle);
            }
            $(window) .scrollTop($('#individualRanking') .offset() .top);
        };
        $scope.drawAll = function (type) {
            var title = 'Performance Analysis';
            var subtitle = 'all TCS verbal test';
            var xTitle = 'Time ( Test Taken)';
            var yTitle = ' Performance (%)';
            if (type == '3d column') {
                var chart = {
                    renderTo: 'container',
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                };
                $scope.cummulativeRanking(chart, 'cummulativeRanking', $scope.getUserAllSeries($scope.userAllData), title, subtitle, xTitle, yTitle);
            } else {
                $scope.cummulativeRanking({
                    type: type
                }, 'cummulativeRanking', $scope.getUserAllSeries($scope.userAllData), title, subtitle, xTitle, yTitle);
            }
            $(window) .scrollTop($('#cummulativeRanking') .offset() .top);
        };
        $scope.drawRankGraph = function (type) {
            var title = 'Rank Analysis';
            var subtitle = '';
            var xTitle = 'Rank';
            var yTitle = ' Average Score (%)';
            if (type == '3d column') {
                var chart = {
                    renderTo: 'container',
                    type: 'column',
                    zoomType: 'x',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                };
                $scope.cummulativeRanking(chart, 'overallRanking', $scope.getRankSeries($scope.allUserData), title, subtitle, xTitle, yTitle);
            } else {
                $scope.cummulativeRanking({
                    type: type,
                    zoomType: 'x'
                }, 'overallRanking', $scope.getRankSeries($scope.allUserData), title, subtitle, xTitle, yTitle);
            }
            $(window) .scrollTop($('#overallRanking') .offset() .top);
        };
        $scope.cummulativeRanking = function (type, id, series, title, subtitle, xTitle, yTitle) {
            $('#' + id) .highcharts({
                chart: type,
                title: {
                    text: title
                },
                subtitle: {
                    text: subtitle
                },
                xAxis: {
                    categories: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30
                    ],
                    title: {
                        text: xTitle
                    }
                },
                yAxis: {
                    title: {
                        text: yTitle
                    },
                    min: 0,
                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,
                    plotBands: [
                        {
                            // Light air
                            from: 0,
                            to: 50,
                            color: '#f2dede',
                            label: {
                                text: 'Poor',
                                style: {
                                    color: '#606060'
                                }
                            }
                        },
                        {
                            // Light breeze
                            from: 50,
                            to: 70,
                            color: '#dff0d8',
                            label: {
                                text: 'Good',
                                style: {
                                    color: '#606060'
                                }
                            }
                        },
                        {
                            // Gentle breeze
                            from: 70,
                            to: 80,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: 'Very Good',
                                style: {
                                    color: '#606060'
                                }
                            }
                        },
                        {
                            // Moderate breeze
                            from: 80,
                            to: 100,
                            color: '#d9edf7',
                            label: {
                                text: 'Excellent',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }
                    ]
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: false
                    }
                },
                series: series
            });
            $('#' + id + ' text') .last() .html('Programming Geek') .click(function (event) {
                event.preventDefault();
                window.location = 'http://www.programminggeek.in';
            });
        };
        $scope.AllTestGraph = function (data) {
            $scope.cummulativeRanking(data, 'cummulativeRanking');
        };
        $scope.testGraph = function (data) {
            $scope.cummulativeRanking(data, 'individualRanking');
        };
        $scope.formatData = function (data) {
            var ret = [
            ];
            for (var i = 0; i < data.length; i++) {
                ret.push(parseInt(data[i].s));
            }
            return ret;
        };
        $scope.getAllUserData = function () {
        };
        $scope.getUserAllSeries = function (data) {
            var ret = [
            ];
            for (var i = 0; i < 14; i++) {
                var info = [
                ];
                for (j = 0; j < data.length; j++) {
                    if (parseInt(data[j].t) == i + 1) {
                        info.push(parseInt(data[j].s));
                        //console.log();
                    }
                }
                var series = {
                    name: 'Set' + (i + 1),
                    data: info
                };
                ret.push(series);
            }
            return ret;
        };
        $scope.getRankSeries = function (data) {
            var ret = [
            ];
            for (var i = 0; i < data.length; i++) {
                if (data[i].u == $scope.user.username) {
                    var user = {
                        y: parseInt(data[i].s),
                        marker: {
                          symbol: 'url(./assets/images/sun.png)'
                        }
                    }
                    ret.push(user);
                    console.log(data[i].u + '  ' + data[i].s + '  ' + $scope.user.username);
                } else {
                    ret.push(parseInt(data[i].s));
                }

            }
            var series = [
                {
                    name: 'Rank Graph (Set' + $scope.id + ')',
                    data: ret
                }
            ];
            return series;
        };
        $scope.maximum = function () {
            var max = [
            ];
        };
        $scope.updateData = function () {
        };
        $scope.$on('$destroy', function (event) {
            $timeout.cancel($scope.timer);

        }
                  );
    }
]);
