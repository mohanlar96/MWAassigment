var express=require("express");
var path=require("path");
const app=express();
var routes=require("./routes");
app.set("port",3000);

// app.use(express.static(path.join(__dirname,"public")));
//Routing
// app.get('/',function(req,res){
//     console.log("GET home");
//     res.status(200);
//     res.status(200).sendFile(path.join(__dirname,"public","index.html"));

// });

app.use(function (req,res,next){
    console.log(req.method,req.url);
    next();
});
//adding subset
// app.use('/css',function (req,res,next){
//     console.log(req.method,req.url);
//     next();
// });

app.use('/api',routes);




app.use(express.static(path.join(__dirname,"public")));




var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("listing to port"+port);
});






