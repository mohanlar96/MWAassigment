angular.module("myApp").controller("JokeController", function (jokeFactory) {
    var $this=this;
    $this.name = "Joke";
    jokeFactory.getTenJokes().then(function(data){
            $this.jokes=data;
        });
    });