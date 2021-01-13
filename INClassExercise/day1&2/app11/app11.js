var express=require("express");
var path=require("path");
var app=express();
app.set("port",3000);
//Routing
app.get('/',function(req,res){
    console.log("GET received");
    res.status(200);
    res.send("App11 recived your request :)");

});
app.get("/json",function(req,res){
    console.log("JSON request0");
    res.status(200).json({"JsonData":true});

});
app.get("/file",function(req,res){
    console.log("file request");
    console.log("__dirname "+__dirname);
    res.status(200).sendFile(path.join(__dirname,"app11.js"));
});


var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("listing ons port"+port);
});






