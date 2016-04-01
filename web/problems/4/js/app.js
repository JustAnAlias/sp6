var app = angular.module('MyApp', [])
        .controller("MyCtrl", function($scope,$http){
            $scope.members = {};
            $scope.populate = function(){
                $http({
                    method: "GET",
                    url: "/SP6/api/members",
                    contentType: "application/json"
                })
                        .success(function(data){
                            $scope.members = data;
                        })
                        .error(function(){
                            alert("Sth went wrong.");
                        });
            };
        });