var app=angular.module("myApp",["ngRoute"]);


app.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"joke/joke.html",
        controller:"JokeController",
        controllerAs:"jokeCtrl"
    });
});
