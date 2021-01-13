const dbconnection = require("../data/dbconnection");

const connnection=require("../data/dbconnection").get();


module.exports.sum=function(req,res){
    var sum=parseInt(req.params.num1)+parseInt(req.query.num2);

        console.log("connection  ",connnection);
   
        res.send("The sum result is "+sum);
}