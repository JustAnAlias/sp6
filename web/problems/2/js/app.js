var myApp = angular.module('CarApp',['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "partials/allCars.html",
      controller: "ViewCarController"
    })
    .when("/Edit/:id/", {
      templateUrl: "partials/addEditCar.html",
      controller: "NewCarController"
    })
    .when("/add/", {
      templateUrl: "partials/addEditCar.html",
      controller: "NewCarController"
    })
    .otherwise({
      redirectTo: "/"
    });
});

myApp.controller("StaticDataController", ['$scope', function ($scope) {
    $scope.title = "Problem 2";
}]);

myApp.factory('CarFactory', function() {
    var cars =  [
        {  id: 1, year: 1997,registered: new Date(1999,3,15), make: 'Ford',model: 'E350', description: 'ac, abs, moon', price: 3000 }
        ,{ id: 2, year: 1999,registered: new Date(1996,3,12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900 }
        ,{ id: 3, year: 2000,registered: new Date(199,12,22), make: 'Chevy', model: 'Venture', description: '', price: 5000 }
        ,{ id: 4, year: 1996,registered: new Date(2002,3,15), make: 'Jeep', model: 'Grand Cherokee',description: 'Air, moon roof, loaded',price: 4799 }
    ];
    
    var getCars = function() {
        return cars;
    };

    var addEditCar = function(newCar) {
        console.log(newCar.id);
        if(newCar.id == null) {
            newCar.id = cars.length + 1;
            console.log(newCar.id);
            cars.push(newCar);
        } else {
            for(var i = 0; i < cars.length; i++) {
                if(cars[i].id === newCar.id) {
                    cars[i] = newCar;
                    break;
                }
            }
        }
    };

    var deleteCar = function(id) {
        for(var i = 0; i < cars.length; i++) {
            if(cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };
    
    return {
        getCars: getCars,
        addEditCar: addEditCar,
        deleteCar: deleteCar
    };
}); 

myApp.controller('ViewCarController', ['$scope', 'CarFactory', function ($scope, CarFactory) {
    $scope.cars = CarFactory.getCars();
    $scope.predicate = "id";
    $scope.deleteCar = function (id) {
        CarFactory.deleteCar(id);
    };
}]);

myApp.controller('NewCarController', ['$scope', 'CarFactory', '$routeParams', '$location', function ($scope, CarFactory, $routeParams, $location) {
    $scope.saveCar = function () {
        CarFactory.addEditCar($scope.newcar);
        $scope.newcar = {};
        $location.path('#/');
    };

    var cars = CarFactory.getCars();
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].id == $routeParams.id) {
            $scope.newcar = angular.copy(cars[i]);
        }
    }
}]);
