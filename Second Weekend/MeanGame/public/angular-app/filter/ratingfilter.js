angular.module("meanGames").filter("rate",rate);

function rate(){
    return function(rating){
        var best=" => 'The best' ";
        var good=" =>  'Good; )";
        var worest=" => 'The worest' ";
        if( rating > 4 ){
            return rating+best;
        }
        else if(rating==4 || rating == 3){
            return rating+good;
        }
        else if(rating<3 ){
            return rating+worest;
        }
        return rating;
    }
}