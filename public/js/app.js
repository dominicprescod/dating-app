var app = angular.module('datingApp', ["ngRoute"]);

app.controller("userShow",["$http","$routeParams",function($http, $routeParams){
    var controller = this;
    $http({
      method: "GET",
      url: "users/"+$routeParams.id+"/json"
    }).then(function(response){
      // console.log(response.data);
      controller.current = response.data;
    });
}]);



// app.controller("logoutController",["$http",function($http){
//       $http({
//         method: "GET",
//         url:"/users/logout"
//       }).then(function(response){
//         console.log("logged out baby");
//       });
// }]);

app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({enabled:true});
  $routeProvider.when('/users/:id',{
    templateUrl: "partials/show.html",
    controller: "userShow",
    controllerAs: "use"
  }).when("/users/logout",{
    templateUrl: "partials/show.html",
    controller:"logoutController",
    controllerAs:"logout"
  });
}]);



// testing the login with passport & angular
app.controller('bodyController',["$http",function($http){
  var controller = this;
  this.newUser = {};
  this.signIn = {};
// =======================================
this.logout = function(){
  $http({
    method:"GET",
    url: "/users/logout"
  }).then(function(response){
    $location.url('/');
  });
};
  // =======================================
    this.login = function(){
        $http({
          method: "POST",
          url: "/users/login",
          data: this.signIn
        }).then(function(response){
          console.log(response.data);
          controller.signIn = {};
        });
    };

    // =======================================
    this.register = function(){
      $http({
        method: "POST",
        url: "/users/register",
        data: this.newUser
      }).then(function(response){
        console.log(response.data);
        controller.newUser = {};
      });
    };
}]);

// rendering likes on the page ---> testing that the data shows up
app.controller('likesController', ['$http', function($http){
  var controller = this;
  $http({ method: 'GET', url: '/users/likes'}).then(function(response){
    controller.likes = response.data;
  });
}]);

// rendering users on the page --> confirming that they show up
app.controller('userController', ["$http",function($http) {
    var controller = this;
    $http({method:"GET",url: "/users"}).then(function(response){controller.users = response.data;});
}]);
