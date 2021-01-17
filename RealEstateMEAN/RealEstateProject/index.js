const express=require("express");

const db= require("./api/data/db.js");

const routes= require("./api/route");

const bodyParser=require("body-parser");

const app=express();

app.set("port",3000);

app.use(bodyParser.urlencoded({entended:false}))

const server=app.listen(app.get("port"),function(){
   
    var port=server.address().port;
    
    console.log("Listen to port "+port);

});

app.use("/api",routes);





