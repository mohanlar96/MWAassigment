const ObjectId = require("mongodb").ObjectId;

const Game=require("mongoose").model("Game");

module.exports.getAPublisherOfAGame=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});
     
    Game.findById(req.params.publisherId).select("publisher").exec(function(err,publisher){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding a publisher");           
        }else if(!publisher){
            _feedbackResponse(404,"Publishers not found!"); 
            console.log("Publisher not found ");         
        } else {
            console.log("Found a publisher");
            res.status(200).json(publisher);
        }
    });
   
}

module.exports.addAPublisherOfAGame=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.publisher){
        newPublisher=req.body;
        Game.updateOne(
            {_id:ObjectId(req.params.gameId)},
            {$set:{
                publisher:req.body.name
                }                  

        },function(err,publisher){
            if(err){
                __res(201,err)
                return;

            }else{
                res.status(200).json(publisher);
                console.log("successfully addeded a publisher ", publisher);

            }
        });
    }
}

module.exports.updateAPublisherOfAGame=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    if(req.body && req.body.publisher){
        newPublisher=req.body;
        Game.updateOne(
            {_id:ObjectId(req.params.gameId)},
            {$set:{
                publisher:req.body.name
                }                  

        },function(err,publisher){
            if(err){
                __res(201,err)
                return;

            }else{
                res.status(204).json(publisher);
                console.log("successfully updatelly a publisher ", publisher);

            }
        });
    }
}

module.exports.deleteAPublisherOfAGame=function(req,res){

    console.log("running delete publisher");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    
        newPublisher=req.body;
        Game.updateOne(
            {_id:ObjectId(req.params.gameId)},
            {$set:{
                publisher:""
                }                  

        },function(err,publisher){
            if(err){
                __res(201,err)
                return;

            }else{
                res.status(204,publisher);
                console.log("successfully remove a publisher ", publisher);

            }
        });   
   
         

   

}




