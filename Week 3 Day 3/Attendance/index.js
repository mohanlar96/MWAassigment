require("./api/data/db.js");

var bodyParser = require('body-parser');
var express = require("express");
var path = require("path");
var routes = require("./api/route");


const app = express();
app.set("port", 3000);

app.use("/api",function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.use(express.static(path.join(__dirname, "public")));

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.urlencoded({extended: false}));



app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port "+server.address().port);
})