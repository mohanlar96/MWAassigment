angular.module("Customer").filter("filterPrice",filter);

function filter(){
    return function(price){

       if(price > 150){
           return "costy";
       }
       else if(price > 100 && price < 150){
           return "Good";
       }
       else if (price < 100){
           return "favorable"
       }
       return price;
    }
}