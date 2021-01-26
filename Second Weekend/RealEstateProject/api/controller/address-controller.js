const ObjectId = require("mongodb").ObjectId;

const Apartment=require("mongoose").model("Apartment");

module.exports.getAnAddressOfAnApartment=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Apartment.findById(req.params.apartmentId).select("address").exec(function(err,address){
        if (err) {
            __res(500,err);            
            console.log("Error finding a address");           
        }else if(!address){
            __res(404,"Address not found!"); 
            console.log("Address not found ");         
        } else {
            console.log("Found a address");
            res.status(200).json(address);
        }
    });
   
}

module.exports.addAnAddressOfAnApartment=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Apartment.findById(req.params.apartmentId).exec(function(err,apart){

        if(err){
            __res(500,err);
            return;           
        }

        if(!apart){
            __res(400,"Apartment id not found");
            return;
        }
        
        apart.address={
            zip:req.body.zip,
            street:req.body.street,
            city:req.body.city,
            country:req.body.country,
            state:req.body.state
        };
        

        apart.save(function(err,updateAddress){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully added", updateAddress);
            res.status(204).json(updateAddress);
        });        

    });
}

module.exports.updateAnAddressOfAnApartment=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Apartment.findById(req.params.apartmentId).exec(function(err,apart){

        if(err){
            __res(500,err);
            return;           
        }

        if(!apart){
            __res(400,"Apartment id not found");
            return;
        }
        
        apart.address.zip=req.body.zip;
        apart.address.street=req.body.street;
        apart.address.city=req.body.city;
        apart.address.country=req.body.country;
        apart.address.state=req.body.state;
        

        apart.save(function(err,updateAddress){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully updated", updateAddress);
            res.status(204).json(updateAddress);
        });        

    });
    
}

module.exports.deleteAnAddressOfAnApartment=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});
   
    Apartment.findById(req.params.apartmentId).exec(function(err,apart){

        if(err){
            __res(500,err);
            return;           
        }

        if(!apart){
            __res(400,"Apartment id not found");
            return;
        }
        
        apart.address.remove();
        

        apart.save(function(err,updateAddress){
           
            if(err){
                __res(500,err);
                return;
            }
            console.log("successfully delete", updateAddress);
            res.status(204).json(updateAddress);
        });        

    });  
   
         

   

}




