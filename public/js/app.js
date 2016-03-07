var app = angular.module('datingApp', []);

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
    $http({
      method:"GET",
      url: "/users"
    }).
    then(function(response){
      controller.users = response.data;
      // console.log(response.data);
    });
}]);
