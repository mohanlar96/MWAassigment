angular.module("myApp").factory("jokeFactory",function($http){
    return {
        getTenJokes:function(){

            return $http.get("https://official-joke-api.appspot.com/jokes/ten")
            .then(function(response){

                return response.data;

            }).catch(function(err){

                return err;
            });

        },
        getOneJoke:function(jokeType){

            return $http.get("https://official-joke-api.appspot.com/jokes/"+jokeType+"/random")
            .then(function(response){

                return response.data;

            }).catch(function(err){

                return err;


            });

        }
    }
})