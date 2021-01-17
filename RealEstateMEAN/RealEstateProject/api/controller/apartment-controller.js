const ObjectId = require("mongodb").ObjectId;

const Apartment=require("mongoose").model("Apartment");

module.exports.getApartments=function(req,res){

       
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

    Apartment.find().skip(offset).limit(count).exec(function(err,apartments){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding apartments");           
         }else if(!apartments){
            _feedbackResponse(404,"Apartments not found!");            
        } else {
            console.log("Found apartments", apartments.length);
            res.status(200).send(apartments);
        }
    });    
}

module.exports.getAnApartment=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});
     
    Apartment.findById(req.params.apartmentId).exec(function(err,apartment){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding a apartment");           
        }else if(!apartment){
            _feedbackResponse(404,"Apartments not found!"); 
            console.log("Apartment not found ");         
        } else {
            console.log("Found a apartment");
            res.status(200).json(apartment);
        }
    });
   
}

module.exports.addAnApartment=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.title && req.body.price){
        newApartment=req.body;
        Apartment.create({
            title:req.body.title,
            bedrooms:req.body.bedrooms,
            floors:req.body.floors,
            description:req.body.description, 
            price:req.body.price,
            bathroom:req.body.bathroom,
            yearBuild:req.body.yearBuild,
            acres:req.body.acres,
            squareFeet:req.body.squareFeet,

        },function(err,apartment){
            if(err){
                __res(201,err)
                return;
            }else{

                res.status(201).json(apartment);
                console.log("successfully addeded a apartment ", apartment);

            }
        });
    }
}

module.exports.updateAnApartment=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Apartment.findById(req.params.apartmentId).select("-images -address").exec(function(err,apartment){

        if(err){
            __res(500,err);
            return;           
        }

        if(!apartment){
            __res(400,"Apartment id not found");
            return;
        }

        apartment.title=req.body.title;
        apartment.bedrooms=req.body.bedrooms;
        apartment.floors=req.body.floors;
        apartment.description=req.body.description; 
        apartment.price=req.body.price;
        apartment.bathroom=req.body.bathroom;
        apartment.yearBuild=req.body.yearBuild;
        apartment.acres=req.body.acres;
        apartment.squareFeet=req.body.squareFeet;  

        apartment.save(function(err,updateApartment){
           
            if(err){
                __res(500,err);
                return;
            }
            res.status(204).json(updateApartment);
        });        

    });
}

module.exports.deleteAnApartment=function(req,res){

    console.log("running delete apartment");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Apartment.findByIdAndRemove(req.params.apartmentId).exec(function(err,deleteApartment){

        if(err){
            __res(500,err);
            return;
        }

        if(!deleteApartment){
            __res(400,"Apartment id not found");
            return;
        }
       
    res.status(204).json(deleteApartment);
         

    });

}




