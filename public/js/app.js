var app = angular.module('datingApp', ["ngRoute"]);

// Helps goes to user homepage
var done;
// Function to get user data
var hacking;
//  Variable for usertrue
var signedIn;

app.controller("userShow",["$http","$routeParams", "$location", "$scope", function($http, $routeParams, $location, $scope){
    var controller = this;
    this.user = signedIn;
    $scope.$on('addLike', function(eventObj, data){
      controller.current = data;
    });

    // Script to get updated user info
    hacking = function(){
      $http({
        method: "GET",
        url: "users/"+$routeParams.id+"/json"
      }).then(
        function(response){
          controller.current = response.data;
        }).then(function(){
          $http({
             method: "POST",
             url: "users/"+$routeParams.id+"/bylikes",
             data: controller.current.likes
          }).then(function(likesResponse){
            controller.matches = likesResponse.data;
            // working out the % users match based on interestes and pushing into an array
            controller.sorted =[];
            // looping through the matches received from the server
            controller.matches.forEach(function(i){
              // setting match point to 0 at the start of each iteration
            var match = 0;
            // looping through the current user's likes (at the moment set to work on person viewing the page as opposed to person logged in)
            controller.current.likes.forEach(function(j){
              // looping through each user's likes to check for a match, assigns a point match++ if they do
              i.likes.forEach(function(k){
                if(j.name === k.name) match++; //single line if statement - dont need {}
                });
              });
              // working out the % match points divided by current user's total amount of likes divided by 100/1
              var percentage = (match/controller.current.likes.length)*(100/1).toString();
              // pushing assigned percentage match and user info into a sorted array that can be referenced on the page
              controller.sorted.push({
                                      percentage: percentage,
                                      value: i
                                      });
          });
        });
      });
    };

    // Runs script
    hacking();

    // Deletes like category from user
    this.deleteLike = function(category){
      $http({
        method: 'POST',
        url: 'users/' + $routeParams.id,
        data: category
      }).then(function(response){
        console.log('test');
        console.log(response.data);
        hacking();
      });
    };
// End of usershow controller
}]);

// rendering likes on the page ---> testing that the data shows up
app.controller('likesController', ['$http', '$routeParams', '$location', '$scope', function($http, $routeParams, $location, $scope){

  // Check if user is true. If true, can add/delete
  var controller = this;
  this.user = signedIn;
  this.page = $routeParams.id;
  $http({ method: 'GET', url: '/users/likes'}).then(function(response){
    controller.likes = response.data;
  });

  // Add like category to user
  this.addLike = function(category){
    $http({
      method: 'PUT',
      url:"users/"+ $routeParams.id,
      data: category
    }).then(function(response){
      console.log(response.data);
      controller.current = response.data;
      hacking();
    });
  };

  // Changes to homepage
  this.done = function(){
    $location.path(done);
  };
//End of likes controller
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

// Testing the login with passport & angular
app.controller('bodyController',["$http", '$location', '$routeParams', function($http, $location, $routeParams){
  var controller = this;
  this.id = null;
  this.newUser = {};
  this.signIn = {};

  this.logout = function(){
    $http({
      method:"GET",
      url: "/users/logout"
    }).then(function(response){
      signedIn = {};
    });
  };

  this.login = function(){
      $http({
        method: "POST",
        url: "/users/login",
        data: this.signIn
      }).then(function(response){
        signedIn = response.data;
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

  this.register = function(){
    $http({
      method: "POST",
      url: "/users/register",
      data: this.newUser
    }).then(function(response){
      signedIn = response.data;
      // console.log(response.data);
      id = response.data._id;
      controller.newUser = {};
    }).then(function(){
      done = "users/" + id;
      if(id === undefined){
        $location.path("/");
      } else {
        $location.path("users/" + id +'/new');
      }
    });
  };
//End of body controller
}]);
