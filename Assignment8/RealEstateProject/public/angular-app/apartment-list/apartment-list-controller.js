angular.module("meanRealEstate").controller("ApartmentsController", ApartmentsController);

function ApartmentsController(ApartmentDataFactory){ 
    var vm = this;
    ApartmentDataFactory.getAllApartments().then(function(response){
        vm.apartments = response;
    });    
}