angular.module('etest') .controller('TCSAptitudeTestController', [
    '$scope',
    '$rootScope',
    '$http',
    '$timeout',
    'aptitudeTest',
    '$location',
    '$stateParams',
    'login',
    'header',
    function ($scope, $rootScope, $http, $timeout, aptitudeTest, $location, $stateParams, login, header) {
        header.setTitle('e-test: Online TCS Analytical Ability Test for Free');
        $scope.apt=true;
        $scope.exam = 'TCS';
        $scope.examStatus=true;
        $scope.set = $stateParams.setId;
        if ($scope.set <= 0 || $scope.set > 3 || !$scope.set) {
            $location.path('/error');
        }
        $scope.first = true;
        $scope.last = false;
        $scope.fetchingAptQuestions = true;
        $scope.time = 4800;
        $scope.minutes = 80;
        $scope.seconds = '00';
        $scope.mark = 1;
        $scope.starMark = 2;
        $scope.factor = 3;
        $scope.showInstructions = true;
        $scope.showReport = false;
        $scope.score = 0;
        $scope.donutData = [
        ];
        $scope.questions = [
        ];
        $scope.individualGraphType = 'spline';
        $scope.userTestData = [
        ];
        $scope.allUserData = [
        ];
        $scope.wasLogged = !$rootScope.user ? false : true;
        aptitudeTest.getTCSAptitudeQuestions({
            company: $scope.exam,
            section: '',
            set: $scope.set,
            lod: ''
        }, $scope);
        if (!$rootScope.user) {
            alertify.error('You are not <b>logged</b> in, Please login first!');
        } else {
            aptitudeTest.getTCSAptitudeData({
                username: $rootScope.user.username,
                exam: $scope.exam,
                set: $scope.set
            }, $scope);
        }
        $scope.logme = function () {
            login.login();
        };
        $scope.previous = function () {
            $scope.getQuestion($scope.currentQuestion.id - 1);
        };
        $scope.next = function () {
            $scope.getQuestion($scope.currentQuestion.id + 1);
        };
        $scope.getQuestion = function (id) {
            if (id - 1 == $scope.questions.length) {
                id = 1;
            }
            $scope.currentQuestion = {
                id: $scope.questions[id - 1].id,
                question: $scope.questions[id - 1].question,
                option1: $scope.questions[id - 1].option1,
                option2: $scope.questions[id - 1].option2,
                option3: $scope.questions[id - 1].option3,
                option4: $scope.questions[id - 1].option4,
                ans: $scope.questions[id - 1].ans,
                mr: $scope.questions[id - 1].mr
            };
            if ($scope.currentQuestion.id == $scope.questions.length)
                $scope.last = true;
            else
                $scope.last = false;
            if ($scope.currentQuestion.id == 1)
                $scope.first = true;
            else
                $scope.first = false;
            $scope.selected = $scope.currentQuestion.ans;
        };
        $scope.change = function (id) {
            //alertify.success($scope.selected);
            console.log(id + '  id');
            $scope.currentQuestion.ans = id;
        };
        $scope.markForReview = function () {
            if ($scope.currentQuestion.mr)
                alertify.success('Question ' + $scope.currentQuestion.id + ' marked for review!');
            //$scope.currentQuestion.mr=$scope.review;
        };
        $scope.submitAnswer = function () {
            //alertify.success($scope.selected);
            var id = $scope.currentQuestion.id;
            id--;
            $scope.questions[id].ans = $scope.currentQuestion.ans;
            $scope.questions[id].mr = $scope.currentQuestion.mr;
            console.log($scope.questions[id].ans);
            $scope.next();
        };
        $scope.reset = function () {
            var id = $scope.currentQuestion.id;
            id--;
            $scope.questions[id].ans = 0;
            $scope.questions[id].mr = false;
            $scope.getQuestion(id + 1);
            $scope.selected = 0;
            //$scope.review=false;
        };
        $scope.skip = function () {
            //var id=$scope.currentQuestion.id;
            //id--;
            //questions[id].selected=0;
            //questions[id].mr=false;
            $scope.next();
        };
        $scope.setQuestion = function (id) {
        };
        $scope.startTest = function () {
        };
        $scope.endTest = function () {
            alertify.set({
                labels: {
                    ok: 'Yes',
                    cancel: 'No'
                }
            });
            alertify.set({
                buttonReverse: true
            });
            alertify.set({
                buttonFocus: 'cancel'
            });
            var msg = '<div class=\'offer offer-success\'><div class=\'shape\'><div class=\'shape-text\'>Summary </div></div><div class=\'offer-content\'>	<h3 class=\'lead text-center\'>	Summary</h3>	<p class=\'text-justify\'>Answered : ' + $scope.getAnswered() + '<br/> Answered &amp; Marked for Review : ' + $scope.getAnsweredMarked() + '<br/> Unanswered :' + $scope.getUnAnswered() + '</p><p><span class=\'text-center text-primary\'>Are you sure, you want to exit the test?</span></p>			</div></div>';
            // confirm dialog
            alertify.confirm(msg, function (e) {
                if (e) {
                    $scope.time = - 1;
                    $scope.evaluate();
                } else {
                }
            });
        };
        $scope.startTime = function () {
            if ($scope.time % 60 < 10) {
                $scope.minutes = parseInt($scope.time / 60);
                $scope.seconds = '0' + $scope.time % 60;
                //alert($scope.minutes);
            } else {
                $scope.minutes = parseInt($scope.time / 60);
                $scope.seconds = $scope.time % 60;
            }
            if ($scope.time <= 0) {
                if ($scope.time == 0)
                    $scope.evaluate();
                return ;
            } else
                $scope.timer = $timeout($scope.startTime.bind(this), 1000);
            $scope.time -= 1;
        };
        $scope.endTime = function () {
            $scope.time = 0;
        };
        $scope.countTime = function () {
        };
        $scope.getAnsweredMarked = function () {
            var count = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].ans > 0 && $scope.questions[i].mr)
                    count++;
            }
            return count;
        };
        $scope.getAnswered = function () {
            var count = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].ans > 0 && !$scope.questions[i].mr)
                    count++;
            }
            return count;
        };
        $scope.getUnAnswered = function () {
            var count = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].ans == 0)
                    count++;
            }
            return count;
        };
        $scope.getCorrect = function () {
            var count = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].ans == $scope.questions[i].answer)
                    count++;
            }
            return count;
        };
        $scope.getInCorrect = function () {
            var count = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].ans > 0 && $scope.questions[i].ans != $scope.questions[i].answer)
                    count++;
            }
            return count;
        };
        $scope.evaluate = function () {
            $scope.examStatus=false;
            var marks = 0;
            for (var i = 0; i < $scope.questions.length; i++) {
                if ($scope.questions[i].ans == 0)
                    continue;
                else
                    if ($scope.questions[i].ans == $scope.questions[i].answer) {
                        marks += $scope.questions[i].star ? $scope.starMark : $scope.mark;
                    } else
                        marks -= (($scope.questions[i].star ? $scope.starMark : $scope.mark) / $scope.factor);
                        marks=Math.round(marks*100)/100;
            }
            $scope.showReport = true;
            $timeout(function () {
                $scope.visualize();
            }, 200);
            $timeout(function () {
                $scope.draw('spline');
                $scope.drawRankGraph('line');
                $scope.visualize();
                window.scrollTo(0, 0);
            }, 200);
            $scope.score = marks;
            $scope.getDonutData();
            var avgScore=(marks*100)/((30-$scope.countStarred())*1+(2*$scope.countStarred()));
            avgScore=Math.round(avgScore*100)/100;
            aptitudeTest.saveTCSAptitudeResult({
                username: $rootScope.user.username,
                score:avgScore,
                exam: $scope.exam,
                set: $scope.set
            }, $scope);
            $scope.userTestData.push({
                s: avgScore
            });
            return marks;
        };
        $scope.hideInstructions = function () {
            if (!$rootScope.user) {
                alertify.set({
                    labels: {
                        ok: '<div class=\'primary\'><i class=\'fa fa-facebook\'></i>Login with Facebook</div>',
                        cancel: 'Cancel'
                    }
                });
                alertify.set({
                    buttonReverse: true
                });
                alertify.set({
                    buttonFocus: 'ok'
                });
                var msg = '<div class=\'alert alert-danger\' role=\'alert\'><b>Oh snap!</b> You are not logged in, login and try again.</div>';
                // confirm dialog
                alertify.confirm(msg, function (e) {
                    if (e) {
                        $scope.logme();
                    } else {
                        alertify.error('You are not <b>logged</b> in, Please login first!');
                    }
                });
                return ;
            }
            if (!$scope.fetchingAptQuestions) {
                $scope.showInstructions = false;
                $scope.getQuestion(1);
                $scope.startTime();
                if (!$scope.wasLogged) {
                    aptitudeTest.getTCSAptitudeData({
                        username: $rootScope.user.username,
                        exam: $scope.exam,
                        set: $scope.set
                    }, $scope);
                }
            } else {
                alertify.error('Questions are being loaded, please wait a while!');
            }
        };
        $scope.visualize = function () {
            $('#aptitudeReport') .highcharts({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Performance Analysis'
                },
                subtitle: {
                    text: 'Analytical Test'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [
                    {
                        name: 'Count',
                        data: $scope.donutData
                    }
                ]
            });
            $('#aptitudeReport text') .last() .html('Programming Geek') .click(function (event) {
                event.preventDefault();
                window.location = 'http://www.programminggeek.in';
            });
        };
        $scope.draw = function (type) {
            var title = 'Performance Analysis';
            var subtitle = $scope.exam;
            var series = [
                {
                    name: $scope.exam + '(' + $scope.set + ')',
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
                $scope.cummulativeRanking(chart, 'individualRanking', series, title, subtitle, 'Time (Test Taken)', 'Score');
            } else {
                $scope.cummulativeRanking({
                    type: type
                }, 'individualRanking', series, title, subtitle, 'Time (Test Taken)', 'Score');
            }
            $(window) .scrollTop($('#individualRanking') .offset() .top);
        };
        $scope.drawRankGraph = function (type) {
            var title = 'Rank Analysis';
            var subtitle = $scope.exam;
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
                $scope.cummulativeRanking(chart, 'overallRanking', $scope.getRankSeries($scope.allUserData), title, subtitle, 'Rank', 'Score');
            } else {
                $scope.cummulativeRanking({
                    type: type
                }, 'overallRanking', $scope.getRankSeries($scope.allUserData), title, subtitle, 'Rank', 'Score');
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
                        text: yTitle + ' (in %)'
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
        $scope.formatData = function (data) {
            var ret = [
            ];
            for (var i = 0; i < data.length; i++) {
                ret.push(parseInt(data[i].s));
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
                } else {
                    ret.push(parseFloat(data[i].s));
                }
                console.log(data[i].u + '  ' + data[i].s + '  ' + $scope.user.username);
            }
            var series = [
                {
                    name: 'Rank Graph (' + $scope.exam + ')',
                    data: ret
                }
            ];
            return series;
        };
        $scope.getDonutData = function () {
            if ($scope.getCorrect())
                $scope.donutData.push(['Correct Answer ',
                                       $scope.getCorrect()]);
            if ($scope.getInCorrect())
                $scope.donutData.push(['Incorrect Answer ',
                                       $scope.getInCorrect()]);
            if ($scope.getUnAnswered())
                $scope.donutData.push(['Unanswered ',
                                       $scope.getUnAnswered()]);
        };
        $scope.countStarred=function(){
            var count=0;
            for(var i=0;i<$scope.questions.length;i++){
                if($scope.questions[i].star)
                    count++;
            }
            return count;
        };
        $scope.$on('$destroy', function (event) {
            $timeout.cancel($scope.timer);
        }
                  );
    }
]);
