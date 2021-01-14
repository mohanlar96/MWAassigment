const ObjectId = require("mongodb").ObjectId;
const game=require("mongoose").model("Game");

module.exports.publisherGetOne=(req,res)=>{
    var gameId=req.param.gameId;
    Gamepad.findById(gameId).select('publisher').exec(function(game){
        var publisher=game.publisher;
        res.status(200).json(publisher);

    });



}