const ObjectId = require("mongodb").ObjectId;

const Game=require("mongoose").model("Game");

var runGeoQuery=function(req,res){
    const lng=parseFloat(req.query.lng);
    const lat=parseFloat(req.query.lat);
    // geoJSON  Point
    const point= {
        type:"Point",
        coordinates:[lng,lat]
    };

    Game.aggregate([
        {
            $geoNear: {
                near: point,
                spherical: true,
                distanceField: "distance",
                maxDistance:7500000
            }
       }
    ],function(err,results){

        console.log("Geo Result",results);
        console.log("Geo error ",err);
        res.status(200).send(results);

    });

}
getGames=function(req,res){

    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req,res);
        return;
    }
    
    
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
// addGame=function(req,res){

//     __res=(status,msg)=>res.status(status).send({message:msg});



//     if(req.body && req.body.title && req.body.price){
//         newGame=req.body;
//         Game.create({
//             title:req.body.title,
//             year:req.body.year,
//             rate:req.body.rate,
//             price:req.body.price,
//             minPlayers:req.body.minPlayers,
//             maxPlayers:req.body.maxPlayers,
//             publisher:"",
//             reviews:"" ,
//             minAge:req.body.minAge,
//             designers:req.body.designers           

//         },function(error,game){
//             if(err){
//                 _res(201,err)

//             }else{
//                 res.status(200,game);
//                 console.log("successfully addeded a game ", game);

//             }
//         });
//     }
// }

// updateGame=function(req,res){
    
//     __res=(status,msg)=>{res.status(status).send({message:msg});
    
//     Game.findById(req.params.gameId).select("-reviews -publisher").exec(function(err,game){

//         if(err){
//             __res(500,err);
//             console.log("running.....")
           
//         }

//         if(!game){
//             __res(400,"Game id not found");
//         }

//         game.title=req.body.title;
//         game.year=parseInt(req.body.year);
//         game.price=req.body.price;
//         game.rate=parseInt(req.body.rate);
//         game.minPlayers=req.body.minPlayers;
//         game.maxPlayers=req.body.maxPlayers;
//         game.minAge=parseInt(req.body.minAge);
//         game.designers=req.body.designers;  

//         game.save(function(err,updateGame){
           
//             if(err){
//                 __res(500,err);
//             }
//             res.status(204).json(updateGame);
//         });        

//     });
// }




// deleteAGame==function(req,res){
    
//     __res=(status,msg)=>res.status(status).send({message:msg});
    
//     Game.findByIdAndRemove(req.params.gameId).exec(function(err,deleteGame){

//         if(err){
//             __res(500,err);
//         }

//         if(!game){
//             __res(400,"Game id not found");
//         }
       
//     res.status(204).json(deleteGame);
         

//     });

// }

module.exports={
    getGames,
    getAGame
    // addGame,
    // updateGame,
    // deleteAGame
}


