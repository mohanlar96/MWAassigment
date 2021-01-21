angular.module("meanRealEstate").factory("ApartmentDataFactory", ApartmentDataFactory);

function ApartmentDataFactory($http){
    return {
        getAllApartments: getAllApartments,
        getOneApartment: getOneApartment
    };

    function getAllApartments() {
        return $http.get("/api/apartments").then(complete).catch(failed);
    }

    function getOneApartment(id) {
        return $http.get("/api/apartments/"+id).then(complete).catch(failed);
    }

    function complete(response){        
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}