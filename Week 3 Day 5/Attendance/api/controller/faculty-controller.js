const ObjectId = require("mongodb").ObjectId;

const Faculty=require("mongoose").model("Faculty");

module.exports.getFaculties=function(req,res){

       
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

    Faculty.find().skip(offset).limit(count).exec(function(err,Faculties){
        if (err) {
            __res(500,err);            
            console.log("Error finding Faculties");           
         }else if(!Faculties){
            __res(404,"Faculties not found!");            
        } else {
            console.log("Found Faculties", Faculties.length);
            res.status(200).send(Faculties);
        }
    });    
}

module.exports.getAFaculty=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Faculty.findById(req.params.facultyId).exec(function(err,faculty){
        if (err) {
            __res(500,err);            
            console.log("Error finding a faculty");           
        }else if(!faculty){
            __res(404,"Faculties not found!"); 
            console.log("Faculty not found ");         
        } else {
            console.log("Found a faculty");
            res.status(200).json(faculty);
        }
    });
   
}

module.exports.addAFaculty=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.email && req.body.price){
        newFaculty=req.body;
        Faculty.create({
            email:req.body.email,
            password:req.body.password,
            keyWords:req.body.keyWords,
            distanceTeachingCourse:[
                req.body.distanceTeachingCourse.split(",")

            ],
            campusTeachingCourse:[
                req.body.campusTeachingCourse.split(",")

            ]
                    

        },function(err,faculty){
            if(err){
                __res(201,err)
                return;
            }else{

                res.status(201).json(faculty);
                console.log("successfully addeded a faculty ", faculty);

            }
        });
    }
}

module.exports.updateAFaculty=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Faculty.findById(req.params.facultyId).select("-reviews -publisher").exec(function(err,faculty){

        if(err){
            __res(500,err);
            return;           
        }

        if(!faculty){
            __res(400,"Faculty id not found");
            return;
        }        faculty.email=req.body.email;
        faculty.password=req.body.password;
        faculty.keyWords=req.body.keyWords;
        faculty.distanceTeachingCourse=[
            req.body.distanceTeachingCourse.split(",")

        ];
        faculty.campusTeachingCourse=[
            req.body.campusTeachingCourse.split(",")

        ];
        

        faculty.save(function(err,updateFaculty){
           
            if(err){
                __res(500,err);
                return;
            }
            res.status(204).json(updateFaculty);
        });        

    });
}

module.exports.deleteAFaculty=function(req,res){

    console.log("running delete faculty");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Faculty.findByIdAndRemove(req.params.facultyId).exec(function(err,deleteFaculty){

        if(err){
            __res(500,err);
            return;
        }

        if(!deleteFaculty){
            __res(400,"Faculty id not found");
            return;
        }
       
    res.status(204).json(deleteFaculty);
         

    });

}




