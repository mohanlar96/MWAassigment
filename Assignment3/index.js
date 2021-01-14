const express=require("express");
const routes= require("./api/route");
const app=express();
app.set("port",3000);



const server=app.listen(app.get("port"),function(){
   
    var port=server.address().port;
    
    console.log("Listen to port "+port);

});

app.use("/",routes);





