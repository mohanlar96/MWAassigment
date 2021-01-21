angular.module("meanRealEstate", ["ngRoute"]).config(config);

function config($routeProvider) {    
    $routeProvider
        .when("/", {
            templateUrl : "angular-app/apartment-list/apartments.html",
            controller : "ApartmentsController",
            controllerAs : "apartmentCtrl" 
        })
        .when ("/apartment/:id", {
            templateUrl: "angular-app/apartment-display/apartment.html",
            controller : "SingleApartmentController",
            controllerAs : "AnApartCtrl"
        })
}