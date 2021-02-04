const ObjectId = require("mongodb").ObjectId;

const Attendance=require("mongoose").model("Attendance");

module.exports.getAttendances=function(req,res){

       
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

    Attendance.find().skip(offset).limit(count).exec(function(err,attendances){
        if (err) {
            __res(500,err);            
            console.log("Error finding attendances");           
         }else if(!attendances){
            __res(404,"Attendances not found!");            
        } else {
            console.log("Found attendances", attendances.length);
            res.status(200).send(attendances);
        }
    });    
}

module.exports.getAnAttendance=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Attendance.findById(req.params.attendanceId).exec(function(err,attendance){
        if (err) {
            __res(500,err);            
            console.log("Error finding a attendance");           
        }else if(!attendance){
            __res(404,"Attendances not found!"); 
            console.log("Attendance not found ");         
        } else {
            console.log("Found a attendance");
            res.status(200).json(attendance);
        }
    });
   
}

module.exports.addAnAttendance=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.studentId && req.body.date){
        newAttendance=req.body;
        Attendance.create({
            studentId:req.body.studentId,
            session:req.body.session,
            course:req.body.course,
            date:req.body.date,                 

        },function(err,attendance){
            if(err){
                __res(201,err)
                return;
            }else{

                res.status(201).json(attendance);
                console.log("successfully addeded a attendance ", attendance);

            }
        });
    }
}

module.exports.updateAnAttendance=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Attendance.findById(req.params.attendanceId).select("-reviews -publisher").exec(function(err,attendance){

        if(err){
            __res(500,err);
            return;           
        }

        if(!attendance){
            __res(400,"Attendance id not found");
            return;
        }

        attendance.studentId=req.body.studentId;
        attendance.session=parseInt(req.body.session);
        attendance.date=req.body.date;
        attendance.course=req.body.course;
       

        attendance.save(function(err,updateAttendance){
           
            if(err){
                __res(500,err);
                return;
            }
            res.status(204).json(updateAttendance);
        });        

    });
}

module.exports.deleteAnAttendance=function(req,res){

    console.log("running delete attendance");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Attendance.findByIdAndRemove(req.params.attendanceId).exec(function(err,deleteAttendance){

        if(err){
            __res(500,err);
            return;
        }

        if(!deleteAttendance){
            __res(400,"Attendance id not found");
            return;
        }
       
    res.status(204).json(deleteAttendance);
         

    });

}




