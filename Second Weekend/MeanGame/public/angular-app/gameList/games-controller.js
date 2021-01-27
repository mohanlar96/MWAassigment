angular.module("meanGames").controller("GamesList",GamesList);

console.log("xxxzz");
function GamesList(GameDataFactory){
    var vm = this;
    vm.title="This is mean games";
    GameDataFactory.getAllGames().then(function(response){
        vm.games=response;
    });

    vm.addGame = function() {
        var postData = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            rating: vm.newGameRating,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner
        };
        if (vm.gameForm.$valid) {
            GameDataFactory.postGame(postData).then(function(response) {
                console.log("Game saved")
            }).catch(function(error) {
                console.log(error)
            })
        } else {
            vm.isSubmitted = true;
        }
    }
}