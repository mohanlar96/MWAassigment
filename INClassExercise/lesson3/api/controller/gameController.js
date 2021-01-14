const ObjectId = require("mongodb").ObjectId;

const game=require("mongoose").model("Game");


getGames=function(req,res){
    
     var count= 10;
     var offset=0;
    if (req.query && req.query.count) { 
        count= parseInt(req.query.count);
      
        
    } 
    if (req.query && req.query.offset) { 
        offset= parseInt(req.query.offset);         
    }     

    game.find().skip(offset).limit(count).exec(function(err,docs){
        res.status(200).json(docs);
    });
    
}

getAGame=function(req,res){   
       game.findOnd({_id:ObjectId(req.params.gameId)}).exec(function(err,docs){
       res.status(200).json(docs);
   });
   
}


updateGame=function(req,res){
    
    var count= 3;
   if (req.query && req.query.count) { 
       count= parseInt(req.query.count, 10);
       count=(count>7)?7:count;     
       
   }    

   game.find().exec(function(err,docs){
       res.status(200).json(docs);
   });
   
}

insertGame=function(req,res){
    
    var count= 3;
   if (req.query && req.query.count) { 
       count= parseInt(req.query.count, 10);
       count=(count>7)?7:count;     
       
   }    

   game.find().exec(function(err,docs){
       res.status(200).json(docs);
   });
   
}

deleteGame=function(req,res){
    
    var count= 3;
   if (req.query && req.query.count) { 
       count= parseInt(req.query.count, 10);
       count=(count>7)?7:count;     
       
   }    

   game.find().exec(function(err,docs){
       res.status(200).json(docs);
   });
   
}

module.exports={
    getGames,getAGame,insertGame,updateGame,deleteGame
}

