const ObjectId = require("mongodb").ObjectId;

const Game=require("mongoose").model("Game");

module.exports.getAPublisherOfAGame=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Game.findById(req.params.gameId).select("publisher").exec(function(err,publisher){
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

module.exports.addAPublisherOfAGame=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.gameId).exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"Game id not found");
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

module.exports.updateAPublisherOfAGame=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.gameId).exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"Game id not found");
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

module.exports.deleteAPublisherOfAGame=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Game.findById(req.params.gameId).exec(function(err,pub){

        if(err){
            __res(500,err);
            return;           
        }

        if(!pub){
            __res(400,"Game id not found");
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




