const express=require("express");
const routes=require("./api/route/index.js");
var bodyParser= require("body-parser");
const path=require("path");
const app=express();
app.set("port",3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use(function(req, res, next) { //middleware
    console.log(req.method, req.url);
    next();
});
    
const server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listing to port "+port);
});
app.use("/",routes);

// app.get('/sum/:num1',function(req,res){
//     var sum=parseInt(req.params.num1)+parseInt(req.query.num2);
//     console.log(sum);
//     res.send("The sum result is "+sum);
// });











