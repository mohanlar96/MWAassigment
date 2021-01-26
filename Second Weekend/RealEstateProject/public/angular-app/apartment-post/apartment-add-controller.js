angular.module("meanRealEstate").controller("PostApartmentController", PostApartmentController);

function _getStarRating(rate) {
    return new Array(rate);
}


function PostApartmentController(ApartmentDataFactory){ 
    var vm = this;
  
    
    vm.postApartment = function(){
        const apartment={
            title :vm.title,
            bedrooms :vm.bedrooms,
            floors :vm.floors,
            description :vm.description,
            price :vm.price,
            address :{
                    city :vm.city,
                    state :vm.state,
                    country :vm.country,
                    zip :vm.zip,
                    street :vm.street,
            },
            bathroom :vm.bathroom,
            yearBuild :vm.yearBuild,
            posted :new Date(),
            acres :vm.acres,
            rentOrSell :vm.rentOrSell,
            squareFeet :vm.squareFeet            
        }
        ApartmentDataFactory.postAnApartment(apartment).then(function(response){            
            vm.status = response;
            alert("post apartment successfully");
            window.location="/";
        });
    } 
}