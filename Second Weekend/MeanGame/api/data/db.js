var mongoose = require("mongoose");
require("./games-model.js");
require("./user-model.js");
var dburl = "mongodb://localhost:27017/meanGames";

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("Connected",function(){
    console.log("Mongoose connected to "+dburl);
});
mongoose.connection.off("Disconneted",function(){
    console.log("Mongoose disconnected ");
});
mongoose.connection.on("error",function(err){
    console.log("Mongoose connected to "+err);
});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
       console.log("Mongoose Disconneted");
       process.exit(0);
    });
});
process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
       console.log("Mongoose Disconneted by app termination");
       process.exit(0);
    });
});
process.once("SIGUSR2",function(){
    mongoose.connection.close(function(){
       console.log("Mongoose Disconneted by app termination");
       process.kill(process.pid,"SIGUSR2");
    });
});




