const Profile=require("mongoose").model("Profile");

module.exports.getProfiles=function(req,res){

       
    var offset= 0;
    var count= 5;
    var maxCount= 10;

    __res=(status,msg)=>res.status(status).send({message:msg});
    
    if (req.query && req.query.offset) {
         offset= parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
         count= parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        __res(400,"QueryString Offset and Count should be numbers");
        return;
    }   

    if (count > maxCount) {
        __res(400,"Cannot exceed count of "+ maxCount); 
        console.log("running");    
        return;
    }

    Profile.find().skip(offset).limit(count).exec(function(err,profiles){
        if (err) {
            __res(500,err);            
            console.log("Error finding profiles");           
         }else if(!profiles){
            __res(404,"Profiles not found!");            
        } else {
            console.log("Found profiles", profiles.length);
            res.status(200).send(profiles);
        }
    });    
}

module.exports.getAProfile=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Profile.findById(req.params.profileId).exec(function(err,profile){
        if (err) {
            __res(500,err);            
            console.log("Error finding a profile");           
        }else if(!profile){
            __res(404,"Profiles not found!"); 
            console.log("Profile not found ");         
        } else {
            console.log("Found a profile");
            res.status(200).json(profile);
        }
    });
   
}

module.exports.addAProfile=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.email && req.body.password){
        newProfile=req.body;
        Profile.create({
            email:req.body.email,
            profile:{url:req.body.url},
            distanceTakenCourse:req.body.distanceTakenCourse.split(","),
            password:req.body.password,
            campusTakenCourse:req.body.campusTakenCourse.split(","),
            aboutYourself:req.body.aboutYourself,
            courseType:req.body.courseType.split(","),
            gender:req.body.gender           

        },function(err,profile){
            if(err){
                __res(201,err)
                return;
            }else{

                res.status(201).json(profile);
                console.log("successfully addeded a profile ", profile);

            }
        });
    }
}

module.exports.updateAProfile=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Profile.findById(req.params.profileId).select("-reviews -publisher").exec(function(err,profile){

        if(err){
            __res(500,err);
            return;           
        }

        if(!profile){
            __res(400,"Profile id not found");
            return;
        }

        profile.email=req.body.email;
        profile.profile={url:req.body.url};
        profile.password=req.body.password;
        profile.distanceTakenCourse=req.body.distanceTakenCourse.split(",");
        profile.campusTakenCourse=req.body.campusTakenCourse.split(",");
        profile.aboutYourself=req.body.aboutYourself;
        profile.courseType=req.body.courseType.split(",");
        profile.gender=req.body.gender;  

        profile.save(function(err,updateProfile){
           
            if(err){
                __res(500,err);
                return;
            }
            res.status(204).json(updateProfile);
        });        

    });
}

module.exports.deleteAProfile=function(req,res){

    console.log("running delete profile");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Profile.findByIdAndRemove(req.params.profileId).exec(function(err,deleteProfile){

        if(err){
            __res(500,err);
            return;
        }

        if(!deleteProfile){
            __res(400,"Profile id not found");
            return;
        }
       
    res.status(204).json(deleteProfile);
         

    });

}




