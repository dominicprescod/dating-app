var app = angular.module('datingApp', ["ngRoute"]);
// var array = [];

app.controller("userShow",["$http","$routeParams",function($http, $routeParams){
    var controller = this;
    $http({
      method: "GET",
      url: "users/"+$routeParams.id+"/json"
    }).then(
    function(response){
      controller.current = response.data;
    });
}]);

// rendering likes on the page ---> testing that the data shows up
app.controller('likesController', ['$http', '$routeParams', function($http, $routeParams){

  var controller = this;
  $http({ method: 'GET', url: '/users/likes'}).then(function(response){
    controller.likes = response.data;
  });

  this.addLike = function(category){
    console.log(category)
    $http({ method: 'PUT', url:"users/"+ $routeParams.id, data:{likes: category}}).then(function(response){
      console.log(response.data)
    })
  }

}]);

app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({enabled:true});
  $routeProvider.when('/users/:id',{
    templateUrl: "partials/show.html",
    controller: "userShow",
    controllerAs: "use"
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


// rendering users on the page --> confirming that they show up
app.controller('userController', ["$http",function($http) {
    var controller = this;
    $http({
      method:"GET",
      url: "/users"
    }).then(function(response){
      controller.users = response.data;
    });
}]);
