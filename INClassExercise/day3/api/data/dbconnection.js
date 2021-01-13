const mongoClient=require("mongodb").MongoClient;
const dbname="meanGames";
const dburl="mongodb://localhost:27017/"+dbname;
var _connection=null;

var open=function(){

    mongoClient.connect(dburl,{useUnifiedTopology:true},function(err,client){
        if(err){
            console.log("DB connection fail", err);
            return;
        }

        _connection=client.db(dbname);

        console.log("Db Connection open "+_connection);

    });

}
var get=function(){
    return _connection
}
module.exports={
    openConnection:open,
    get:get
}
