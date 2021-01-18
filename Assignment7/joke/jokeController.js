angular.module("myApp").controller("JokeController", function ($http) {
    var $this=this;
    $this.name = "Joke";
    $http.get("https://official-joke-api.appspot.com/jokes/ten").
        then(function (response) {
            $this.jokes = response.data;
        });
    });