angular.module("myApp").filter("order",function(){
        
    return function(number){
        if(number && !isNaN(number)){
            var digit=number%10;
            var sufix="";
            switch(digit){

                case 1:
                     sufix="st";
                     break;
                case 2:
                    sufix="nd";
                    break;    
                    
                    case 3:
                        sufix="rd";
                        break;  
                        default:
                    sufix="th";
                    break; 

            }

            return number+sufix;
        }
        return number;
    }
});