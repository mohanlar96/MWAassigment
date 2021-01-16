const ObjectId = require("mongodb").ObjectId;

const Review=require("mongoose").model("Game");

module.exports.getReviews=function(req,res){

       
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
module.exports.getAReview=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Game.findById(req.params.reviewId).select("publisher").exec(function(err,publisher){
        if (err) {
            __res(500,err);            
            console.log("Error finding a publisher");           
        }else if(!publisher){
            __res(404,"Publishers not found!"); 
            console.log("Publisher not found ");         
        } else {
            console.log("Found a publisher");
            res.status(200).json(publisher);
        }
    });
   
}

module.exports.addAReview=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.reviewId).exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"Review id not found");
            return;
        }
        
        pub.publisher={name:req.body.publisher};
        

        pub.save(function(err,updatePublisher){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully added", updatePublisher);
            res.status(204).json(updatePublisher);
        });        

    });
}

module.exports.updateAReview=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.reviewId).exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"Review id not found");
            return;
        }
        
        pub.publisher={name:req.body.publisher};
        

        pub.save(function(err,updatePublisher){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully updated", updatePublisher);
            res.status(204).json(updatePublisher);
        });        

    });
    
}

module.exports.deleteAReview=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.reviewId).exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"Review id not found");
            return;
        }
        
        pub.publisher=undefined;
        

        pub.save(function(err,updatePublisher){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully delete", updatePublisher);
            res.status(204).json(updatePublisher);
        });        

    });  
   
         

   

}




