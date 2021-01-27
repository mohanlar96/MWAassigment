var mongoose = require("mongoose");
var Game=mongoose.model("Game");

module.exports.gamesGetAll=function(req,res){

    Game.find().exec(function(err,games){
        var response={
            status:200,
            message:games
        };
         if(err){
            console.log("Error finding student");
            response.status=500,
            response.message= err
         }
             res.status(response.status).json(response.message);
    })
}
module.exports.gamesGetOne=function(req,res){
    var gameid=req.params.gameid;
    Game.findById(gameid).exec(function(err,game){
        var response={
            status:200,
            message:game
        };
         if(err){
            console.log("Error finding student");
            response.status=500,
            response.message= err
         }else if(!gameid){
             response.status=404,
             response.message={"Message" : "student Id not found"}
         }
             res.status(response.status).json(response.message);
    });
};

module.exports.gamesAddOne=function(req,res){
    console.log("updating games");
    console.log(req.body);
    if(req.body && req.body.title){
        Game.create({
            title:req.body.title,
            year:parseInt(req.body.year),
            rate:parseInt(req.body.rate),
            price:parseFloat(req.body.price),
            minplayers:parseInt(req.body.minplayers),
            maxPlayers:parseInt(req.body.maxPlayers),
            designer:req.body.designer,
            function(err,games) {
                 var response= {
                     status:200,
                     message:games
                 };
                 if(err){
                    response.status=500,
                    response.message=err
                }else{
                    console.log("Product updated");
                    response.message="product Updated"
                } 
                res.status(response.status).json(response.message);
            }
         });
    }else{
        console.log("does have the necessary document to add game");
    } 
};

module.exports.gamesUpdateOne=function(req,res){
    var gameid=req.params.gameid;
    Game.findById(gameid).exec(function(err,game){
        console.log(game);
        var response={
            status:204,
            message:game
        };
         if(err){
            console.log("Error finding student");
            response.status=500,
            response.message= err
         }else if(!gameid){
             response.status=404,
             response.message={"Message" : "student Id not found"};
         }
         if(response.status !== 204){
            res.statues(response.status).json(response.message);
         }
         else{
            game.title=req.body.title,
            game.year=parseInt(req.body.year),
            game.rate=parseInt(req.body.rate),
            game.price=parseFloat(req.body.price),
            game.minplayers=parseInt(req.body.minplayers),
            game.maxPlayers=parseInt(req.body.maxPlayers),
            game.minAge=parseInt(req.body.minAge),
            game.designer=req.body.designer,
            game.save(function(err,updatedGame){
                response.message=updatedGame
                if(err){
                    response.status=500,
                    response.message=err;
                }
                res.status(response.status).json(response.message);
            });
         }
    });
};

module.exports.gamesDeleteOne=function(req,res){
    console.log("deleting");
    var gameid=req.params.gameid;
    console.log("This is game id "+gameid);
    Game.findByIdAndDelete(gameid).exec(function(err,deletedGame){
        var response={
            status:200,
            message:deletedGame
        }
        if(err){
            response.status=500,
            response.message=err
        }else if(!gameid){
            response.status=404,
            response.message="Game id is not Found"
        }
        res.status(response.status).json(response.message);
    });
}

