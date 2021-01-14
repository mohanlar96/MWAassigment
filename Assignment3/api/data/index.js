const MongoClient=require("mongodb").MongoClient;
const dbName="meanGames";
const dburl="mongodb://localhost:27017/"+dbName;
_connection=null;

var connect=function(){

    MongoClient.connect(dburl,{useUnifiedTopology:true},function(err,client){
       
        if(err){ 
            console.log("DB Connection Failed");
            return;
        }

        _connection=client.db(dbName);

        console.log("DB connection open Successfully");
    });    

}

module.exports={
    connect:connect,
    get:function(){
        return _connection
    }
}
