var app = angular.module('datingApp', []);

app.controller('likesController', ['$http', function($http){
  var controller = this;
  $http({ method: 'GET', url: '/users/likes'}).then(function(response){
    controller.likes = response.data;
  });

}]);
