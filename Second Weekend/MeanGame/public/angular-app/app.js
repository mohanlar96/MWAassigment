angular.module("meanGames",["ngRoute","angular-jwt"]).config(config).run(run);

console.log("hdfdfd");
function config($httpProvider,$routeProvider,$locationProvider){
    // $httpProvider.interceptors.push("AuthInterceptor");
    $locationProvider.hashPrefix("");
    $routeProvider
    .when("/",{
        templateUrl:"angular-app/welcome/welcome.html",
        access:{restricted:false}
        // controller:"GamesList",
        // controllerAs:"vm"
    })
    .when("/games/",{
        templateUrl:"angular-app/gameList/gameslist.html",
        controller:"GamesList",
        controllerAs:"vm",
        access:{restricted:false}
        
    })
    .when("/games/:id",{
        templateUrl:"angular-app/gameSingle/game.html",
        controller:"GetSingleGame",
        controllerAs:"vm",
        access:{restricted:false}
    })
    .when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs:"vm",
        access:{restricted:false}
    })
    .when("/profile",{
        templateUrl:"angular-app/profile/profile.html",
        controller:"LoginController",
        controllerAs:"vm",
        access:{restricted:false}
    })
}
function run($rootScope,$location,$window,AuthFactory){
    $rootScope.$on("$routeChangeStart",function(event,nextRoute,currentRoute){
        if(nextRoute.access  !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.isLoggedIn){
                event.preventDefault(); // Do not go to that path
                $location.path("/"); 

            }
    })
}