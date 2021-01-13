const dbconnection = require("../data/dbconnection");

const db=require("../data/dbconnection").get();


module.exports.sum=function(req,res){
    var sum=parseInt(req.params.num1)+parseInt(req.query.num2);

       const collections=db.collection("games");
       collections.find().skip(fo)
   
        res.send("The sum result is "+sum);
}