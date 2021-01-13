const express=require("express");
const path=require("path");
const app=express();
app.set("port",3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
    
const server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listing to port "+port);
});

app.use( express.static(path.join(__dirname,"public")));
    

app.get("/",function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});








