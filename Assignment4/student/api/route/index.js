const router=require("express").Router();

const studentController=require("../controller/studentController");

router.route("/students").get(studentController.getStudents);

router.route("/students/:studentId").get(studentController.getAStudent);

router.route("/students/:studentId/addresses").get(studentController.getAStudentAddresses);

router.route("/students/:studentId/addresses/:addressId").get(studentController.getAnAddressOfaStudent);

module.exports=router;
