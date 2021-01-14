const ObjectId = require("mongodb").ObjectId;

const Game=require("mongoose").model("Game");


getGames=function(req,res){
    
    var offset= 0;
    var count= 5;
    var maxCount= 10;

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});
    
    
    if (req.query && req.query.offset) {
         offset= parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
         count= parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        _feedbackResponse(400,"QueryString Offset and Count should be numbers");
        return;
    }   

    if (count > maxCount) {
        _feedbackResponse(400,"Cannot exceed count of "+ maxCount);     
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(err,games){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding games");           
         }else if(!games){
            _feedbackResponse(404,"Games not found!");            
        } else {
            console.log("Found games", games.length);
            res.status(200).send(games);
        }
    });    
}

getAGame=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});

    
     
    Game.findById(req.params.gameId).exec(function(err,game){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding a game");           
        }else if(!game){
            _feedbackResponse(404,"Games not found!"); 
            console.log("Game not found ");         
        } else {
            console.log("Found a game", game.length);
            res.status(200).send(game);
        }
    });
   
}



module.exports={
    getGames,
    getAGame
}


