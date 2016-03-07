var app = angular.module('datingApp', []);

// testing the login with passport & angular
app.controller('bodyController',["$http",function($http){
  var controller = this;
  this.newUser = {};
  this.signIn = {};
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
