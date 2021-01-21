const mongoose =require("mongoose");


const dburl="mongodb://localhost:27017/RealEstate";

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});


mongoose.connection.on("connected",function(){
    
    console.log("Mongoose connected  "+dburl);

});

mongoose.connection.on("disconnected",function(){
    
    console.log("Mongoose connected  ");

});


mongoose.connection.on("error",function(err){
    
    console.log("Mongoose error  "+err);

});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by application terminated");
        process.exit(0);

    });
});
process.once("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by soggur application terminated");
        process.kill(process.pid,"SIGUSR2");
        
    });
});
process.once("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by soggur application terminated");
        process.kill(process.pid,"SIGUSR2");
        
    });
});

require("./apartments-model");




