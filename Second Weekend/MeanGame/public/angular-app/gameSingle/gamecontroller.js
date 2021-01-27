angular.module("meanGames").controller("GetSingleGame",GetSingleGame);

function GetSingleGame(GameDataFactory,$routeParams){
     var vm= this;
     var id=$routeParams.id;
     GameDataFactory.getOneGame(id).then(function(response){
         vm.game=response;
     });
     vm.DeleteGame=function(){
        var id_game=vm.game._id;
        console.log(id_game);

     GameDataFactory.deleteGame(id_game).get("api/games").then(function(response){
         vm.game=response;
     });
    }
}