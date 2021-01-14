const ObjectId = require("mongodb").ObjectId;

const game=require("mongoose").model("Game");


getGames=function(req,response){
    
    var offset= 0;
    var count= 5;
    var maxCount= 10;
    var res= {
        status: "",
        message: ""
    };
    
    if (req.query && req.query.offset) {
         offset= parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
         count= parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status=400;
        res.message="QueryString Offset and Count should be numbers";
        return;
    }

    if (count > maxCount) {
        res.status=400;
        res.message="Cannot exceed count of "+ maxCount;       
        return;
    }       
    

    game.find().skip(offset).limit(count).exec(function(err,docs){
        if (err) {
            res.status=500;
            res.message=err;
            console.log("Error finding games");           
        } else {
            console.log("Found games", games.length);
            res.status=200;
            response.status(res.status).send(docs);
        }
    });    
}

getAGame=function(req,res){   
       game.findById(req.params.gameId).exec(function(err,docs){
       res.status(200).json(docs);
   });
   
}


