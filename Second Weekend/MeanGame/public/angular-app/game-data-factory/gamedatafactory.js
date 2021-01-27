angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http){
    return{
        getAllGames:getAllGames,
        getOneGame: getOneGame,
        postGame:PostGame,
        deleteGame:deleteGame,
        register:register,
        login:login
    };
function getAllGames(){

    return $http.get("/api/games").then(complete).catch(failed);
}
function PostGame(game){

    return $http.post("/api/games",game).then(complete).catch(failed);
}
function getOneGame(id){
    return $http.get("/api/games/"+id).then(complete).catch(failed);
}
function deleteGame(id){
    return $http.delete("/api/games/"+id).then(complete).catch(failed);
}
function register(post){
    return $http.post("/api/user/register",post).then(complete).catch(failed);
}
function login(post){
    return $http.post("/api/user/login",post).then(complete).catch(failed);
}
function complete(response){
    console.log("Hello"+response.data)
    return response.data;
}
function failed(error){
    return error.status.statusText;
}

}
