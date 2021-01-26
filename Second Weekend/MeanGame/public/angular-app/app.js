angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {    
    $routeProvider
        .when("/", {
             templateUrl: "angular-app/welcome/welcome.html"
        })
        .when("/games", {
            templateUrl: "angular-app/game-list/games.html",
            controller: GamesController,
            controllerAs: "vm"
        })       
        .when ("/game/:id", {
            templateUrl: "angular-app/game-display/game.html",
            controller : "SingleGameController",
            controllerAs : "SingleGameCtrl"
        })
        .when("/register", {
            templateUrl: "angular-app/register/register.html",
            controller: "RegisterController",
            controllerAs: "vm"
            })
            .otherwise({redirectTo: "/"});;
}