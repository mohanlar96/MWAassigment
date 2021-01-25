const express=require("express");
const path=require("path");
const app=express();
app.set("port",3000);
const route=require("./route.js");

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
    
const server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listing to port "+port);
});

app.use( express.static(path.join(__dirname,"public")));
    
app.use(route);








