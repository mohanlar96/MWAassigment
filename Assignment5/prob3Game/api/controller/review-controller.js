const ObjectId = require("mongodb").ObjectId;

const Game=require("mongoose").model("Game");

module.exports.getReviews=function(req,res){

       
     __res=(status,msg)=>res.status(status).send({message:msg});
    
    
    Game.findById(req.params.gameId).select("reviews").exec(function(err,rev){
        if (err) {
            __res(500,err);            
            console.log("Error finding reviews");           
         }else if(!rev){
            __res(404,"reviews not found!");            
        } else {
            console.log("Found reviews", rev);
            res.status(200).json(rev);
        }
    });    
}
module.exports.getAReview=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Game.findById(req.params.gameId).select("reviews").exec(function(err,game){
        const revi=game.reviews.id(req.params.reviewId);
        if (err) {
            __res(500,err);            
            console.log("Error finding a review");    
            return;      
        }else if(!revi){
            __res(404,"Review not found!"); 
            console.log("review not found "); 
            return;        
        } else {
            console.log("Found a review" + revi);
            res.status(200).json(revi);
        }
    });
   
}

module.exports.addAReview=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.gameId).select("reviews").exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"game id not found");
            return;
        }
        console.log(req.body.review);
        console.log(pub);

        if(!Array.isArray(pub.reviews)){
            pub.reviews=[];
        }
        pub.reviews.push({comment:req.body.review});  
        // pub.reviews=undefined;       

        pub.save(function(err,rev){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully added", rev);
            res.status(204).json(rev);
        });        

    });
}

module.exports.updateAReview=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.updateOne({"_id":req.params.gameId,"reviews._id":req.params.reviewId},
        {$set:{"reviews.$.comment":req.body.review}},
        function(err,game){
            
            if(err){
                __res(500,err);
                return;           
            }

            res.status(204).json(game);
        }  
    );    

    
    
}

module.exports.deleteAReview=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.gameId).select("reviews").exec(function(err,game){
        
        game.reviews.id(req.params.reviewId).remove();

        if(err){
            __res(500,err);
            return;           
        }

        if(!game){
            __res(400,"Review id not found");
            return;
        }   
        
        game.save(function(err,rev){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully deleted", rev);
            res.status(204).json(rev);
        });        

    
    });  
   
         

   

}




