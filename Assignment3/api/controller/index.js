
const connection=require("../data");
connection.connect();

module.exports.displayGames=function(req,res){
    
     var count= 3;
    if (req.query && req.query.count) { 
        count= parseInt(req.query.count, 10);
        count=(count>7)?7:count;     
        
    }    
    const gamesCollection=connection.get().collection("games");

    gamesCollection.find().limit(count).toArray(function(err,docs){
        res.status(200).json(docs);
    }) ;
    
}