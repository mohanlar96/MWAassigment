angular.module("meanRealEstate").controller("SingleApartmentController", SingleApartmentController);

function _getStarRating(rate) {
    return new Array(rate);
}


function SingleApartmentController($routeParams, ApartmentDataFactory){ 
    var vm = this;
    vm.title = "MEAN GAMES APP";
    var id = $routeParams.id;
    ApartmentDataFactory.getOneApartment(id).then(function(response){
        vm.apartments = response;
        vm.rating=_getStarRating(response.rate);
        var publishers = "";
        var pubs = response.publisher;        
        for (let i=0; i<pubs.length; i++) {
            publishers += pubs[i].name;
            if (i!=pubs.length-1) {
                publishers +=", ";
            }            
        }
        vm.publishers = publishers;
    });   
    vm.deleteApartment = function(id){
        console.log("delete apartment with id: ", id);
        ApartmentDataFactory.deleteOneApartment(id).then(function(response){            
            vm.status = response;
            alert("Delete apartment with id:"+id);
            window.location="/";
        });
    } 
}