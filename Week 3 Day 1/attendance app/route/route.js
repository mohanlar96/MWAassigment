const router=require("express").Router();
const path=require("path");

router.route("/").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","index.html"));
});
router.route("/student/qr").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","student-qr.html"));
});
router.route("/student/profile").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","student-profile.html"));
});
router.route("/faculty/login").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","faculty-login.html"));
});
router.route("/faculty/manage/student").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","manage-std.html"));
});
router.route("/faculty/create/qr").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","create-qr.html"));
});
router.route("/faculty/take/attendance").get(function(req,res){    
    res.status(200).sendFile(path.join(__dirname,"..","public","faculty-take-attendance.html"));
});


module.exports=router;