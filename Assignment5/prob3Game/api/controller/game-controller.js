const ObjectId = require("mongodb").ObjectId;

const Game=require("mongoose").model("Game");

module.exports.getGames=function(req,res){

       
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
        console.log("running");    
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

module.exports.getAGame=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});
     
    Game.findById(req.params.gameId).exec(function(err,game){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding a game");           
        }else if(!game){
            _feedbackResponse(404,"Games not found!"); 
            console.log("Game not found ");         
        } else {
            console.log("Found a game");
            res.status(200).json(game);
        }
    });
   
}

module.exports.addAGame=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.title && req.body.price){
        newGame=req.body;
        Game.create({
            title:req.body.title,
            year:req.body.year,
            rate:req.body.rate,
            price:req.body.price,
            minPlayers:req.body.minPlayers,
            maxPlayers:req.body.maxPlayers,
            minAge:req.body.minAge,
            designers:req.body.designers           

        },function(err,game){
            if(err){
                __res(201,err)
                return;
            }else{

                res.status(201).json(game);
                console.log("successfully addeded a game ", game);

            }
        });
    }
}

module.exports.updateAGame=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Game.findById(req.params.gameId).select("-reviews -publisher").exec(function(err,game){

        if(err){
            __res(500,err);
            return;           
        }

        if(!game){
            __res(400,"Game id not found");
            return;
        }

        game.title=req.body.title;
        game.year=parseInt(req.body.year);
        game.price=req.body.price;
        game.rate=parseInt(req.body.rate);
        game.minPlayers=req.body.minPlayers;
        game.maxPlayers=req.body.maxPlayers;
        game.minAge=parseInt(req.body.minAge);
        game.designers=req.body.designers;  

        game.save(function(err,updateGame){
           
            if(err){
                __res(500,err);
                return;
            }
            res.status(204).json(updateGame);
        });        

    });
}

module.exports.deleteAGame=function(req,res){

    console.log("running delete game");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Game.findByIdAndRemove(req.params.gameId).exec(function(err,deleteGame){

        if(err){
            __res(500,err);
            return;
        }

        if(!deleteGame){
            __res(400,"Game id not found");
            return;
        }
       
    res.status(204).json(deleteGame);
         

    });

}




