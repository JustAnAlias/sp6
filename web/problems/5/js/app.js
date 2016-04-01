var app = angular.module('UserApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/allpersons.html',
            controller: 'AllUsersController',
            controllerAs: 'ctrl'
        });
        $routeProvider.when('/user/:fname', {
            templateUrl: 'partials/singleperson.html',
            controller: 'SingleUserController',
            controllerAs: 'ctrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }]);

app.controller('AllUsersController', ['$http', function ($http) {
        var self = this;
        $http.get('/SP6/problems/5/data/data.json').then(function (res) {
            self.users = res.data.users;
            var users = self.users;
            console.log(users);
        });
    }]);

app.controller('SingleUserController', ['$http', '$routeParams', function ($http, $routeParams) {
        var self = this;
        $http.get('/SP6/problems/5/data/data.json').then(function (res) {
            for (var i = 0; i < res.data.users.length; i++) {
                if (res.data.users[i].first == $routeParams.fname) {
                    self.currentUser = res.data.users[i];
                    var currentUser = self.currentUser;
                    console.log(currentUser);
                }
            }
        });
    }]);