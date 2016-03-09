var app = angular.module('datingApp', ["ngRoute"]);
// var done;
// var likesArray;
// var userLikesArray;

app.controller("userShow",["$http","$routeParams", "$location", function($http, $routeParams, $location){
    var controller = this;
    // var id;
    // this.myLikes = null;
    $http({
      method: "GET",
      url: "users/"+$routeParams.id+"/json"
    }).then(
    function(response){
      controller.current = response.data;
      // userLikesArray = controller.current;
      $http({
         method: "POST",
         url: "users/"+$routeParams.id+"/bylikes",
         data: response.data.likes
      }).then(function(likesResponse){
        // console.log(likesResponse.data);
        controller.matches = likesResponse.data;
      });
    });

    // this.star = function(){
    //   console.log('test');
    //   console.log(controller.current.likes[0].name);
    // };

}]);

// rendering likes on the page ---> testing that the data shows up
app.controller('likesController', ['$http', '$routeParams', '$location', function($http, $routeParams, $location){

  var controller = this;
  $http({ method: 'GET', url: '/users/likes'}).then(function(response){
    controller.likes = response.data;
    // likesArray = controller.likes;
    // console.log(controller.likes);
  });

  this.addLike = function(category){

    // console.log(category);
    $http({
      method: 'PUT',
      url:"users/"+ $routeParams.id,
      data: category
    }).then(function(response){
      // console.log(response.data);
    });
  };

  this.done = function(){

    $location.path(done);

  };
// =======
// Merge Conflict Tuesday Mar 8th 11:04am changing put/post to add likes
//     console.log(category)
//     $http({ method: 'POST', url:"users/"+ $routeParams.id, data:{likes: category}}).then(function(response){
//       console.log(response.data)
//     })
//   }
//44ea38e2f5aeae5a8607b8287279d02b502b0f25

}]);

app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({enabled:true});
  $routeProvider.when('/',{
    templateUrl: "partials/login.html",
    controller: "bodyController",
    controllerAs: "body"
  });
}]);


app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({enabled:true});
  $routeProvider.when('/users/:id',{
    templateUrl: "partials/show.html",
    controller: "userShow",
    controllerAs: "use"
  });
}]);

app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({enabled:true});
  $routeProvider.when('/users/:id/new',{
    templateUrl: "partials/categories.html",
    controller: "likesController",
    controllerAs: "likesCtrl"
  });
}]);

// app.config(["$routeProvider","$locationProvider", function($routeProvider,$locationProvider){
//   $locationProvider.html5Mode({enabled:true});
//   $routeProvider.when('/users/:id',{
//     templateUrl: "partials/person.html",
//     controller: "userShow",
//     controllerAs: "use"
//   });
// }]);


// testing the login with passport & angular
app.controller('bodyController',["$http", '$location', '$routeParams', function($http, $location, $routeParams){
  var controller = this;
  this.id = null;
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
  // ======================================

    this.login = function(){
        $http({
          method: "POST",
          url: "/users/login",
          data: this.signIn
        }).then(function(response){
          // console.log(response.data);
          id = response.data._id;
          controller.signIn = {};
        }).then(function(){
          // redirects the page to the home page if the user info entered does not exist
          if(!id){
            $location.path("/");
          } else {
              $location.path("users/" + id);
          }

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
        id = response.data._id;
        controller.newUser = {};
      }).then(function(){
        done = "users/" + id;
        if(id === undefined){
          $location.path("/");
        } else {
            $location.path("users/" + id +'/new');
        }


        // $location.path("users/" + id)
      });
    };
}]);


// // rendering users on the page --> confirming that they show up
// app.controller('userController', ["$http",function($http) {
//     var controller = this;
//     $http({
//       method:"GET",
//       url: "/users"
//     }).then(function(response){
//       // angular.forEach(response.data,function(i){
//       //   console.log(i.likes);
//       // });
//       controller.users = response.data;
//     });
// }]);
