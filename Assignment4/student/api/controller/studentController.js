const ObjectId = require("mongodb").ObjectId;

const Student=require("mongoose").model("Student");


getStudents=function(req,res){
    
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
        return;
    }

    Student.find().skip(offset).limit(count).exec(function(err,students){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding students");           
         }else if(!students){
            _feedbackResponse(404,"students not found!");            
        } else {
            console.log("Found students", students.length);
            res.status(200).send(students);
        }
    });    
}

getAStudent=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});

    
     
    Student.findById(req.params.studentId).exec(function(err,student){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding a student");           
        }else if(!student){
            _feedbackResponse(404,"get a student not found!"); 
            console.log("Get a student not found ");         
        } else {
            console.log("Found a student", student.length);
            res.status(200).send(student);
        }
    });
   
}

getAStudentAddresses=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});

         
    Student.findById(req.params.studentId).select("address").exec(function(err,student){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding a student addresses");           
        }else if(!student.address){
            _feedbackResponse(404,"student addresses not found!"); 
            console.log("a student addresses not found ");         
        } else {
            console.log("Found a student addresses", student.address.length);
            res.status(200).send(student.address);
        }
    });
   
}

getAnAddressOfaStudent=function(req,res){ 

    _feedbackResponse=(status,msg)=>res.status(status).send({message:msg});  
     
     
    Student.findById(req.params.studentId).select("address").exec(function(err,student){
        if (err) {
            _feedbackResponse(500,err);            
            console.log("Error finding an address of a student");           
        }else if(!student.address.id(req.params.addressId)){
            _feedbackResponse(404,"an address of a student not found!"); 
            console.log("an address of a student not found ");         
        } else {
            console.log("Found an address of a student");
            res.status(200).send(student.address.id(req.params.addressId));
        }
    });
   
}

module.exports={
    getStudents,
    getAStudent,
    getAStudentAddresses,
    getAnAddressOfaStudent
}


