const router=require("express").Router();
const attendanceController=require("../controller/attendance-controller");
const profileController=require("../controller/profile-controller");
const facultyController=require("../controller/faculty-controller");

router.route("/profiles")
      .get(profileController.getProfiles)
      .post(profileController.addAProfile);

router.route("/profiles/:profileId")
      .get(profileController.getAProfile)
      .put(profileController.updateAProfile)
      .delete(profileController.deleteAProfile);

router.route("/faculties")
      .get(facultyController.getFaculties)
      .post(facultyController.addAFaculty);

router.route("/faculties/:facultyId")
      .get(facultyController.getAFaculty)
      .put(facultyController.updateAFaculty)
      .delete(facultyController.deleteAFaculty);

router.route("/attendances")
      .get(attendanceController.getAttendances)
      .post(attendanceController.addAnAttendance);

router.route("/attendances/:attendanceId")
      .get(attendanceController.getAnAttendance)
      .put(attendanceController.updateAnAttendance)
      .delete(attendanceController.deleteAnAttendance);



module.exports=router;
