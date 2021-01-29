import Feature from "./feature";
function add(num1: any, num2 :number):number{
    return num1+num2;
}

new Feature();

console.log(add("any type  => ",3));

let name:String ="Jack"; //explict type 
let course= "cs572"; // type is any ; // implicit type.
let courses= ["cs544","cs572"]; // good
 courses= "cs454"; // not ok
 courses=5; //not ok 


 let numbers=[100];
 numbers=100; // not ok 
 numbers=[111,222];

 let mohanArray= ["anas",3.9];
 let aArr:any[]=["enan",22];

 enum Color{
     RED,
     GREEN,
     BLUE
 }

 let myColor:Color=Color.BLUE;
 console.log(myColor); // output is 2

 enum Colors{
    RED=101,
    GREEN=100,
    BLUE=11
}

let mmyColor:Colors=Colors.BLUE;
console.log(mmyColor); // output is 11

let designer:String| String[];

designer ="Jack";
designer =["Jack", "Jack"];

let customArray:(String| number)[];

interface Book{
    title:String;
    page:number
}
class Course{
   public title:String;
   private instructor:String;// if you don't declare this will be public .
   


    constructor(    title:String, instructor:String, capacity :Number){
        this.title=title,
        this.instructor=instructor;
    }

    get Capacity(){
        return this.Capacity;
    }

    useBook(book:Book){



    }

  
}

class DECourse extends Course{



 // learn decorator from online ..
}


