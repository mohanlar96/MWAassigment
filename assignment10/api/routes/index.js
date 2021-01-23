const express = require("express");
const jobsController = require("../controllers/jobsController");
const skillsController = require("../controllers/skillsController");
const router = express.Router();


router.route("/jobs")
        .get(jobsController.getAllJobs)
        .post(jobsController.addAJob);
router.route("/jobs/:jobId")
        .get(jobsController.jobsGetOne)
        .put(jobsController.updateAJob)
        .delete(jobsController.deleteAJob);
        
router.route("/jobs/:jobId/skills")
        .get(skillsController.getAllSkills)
        .post(skillsController.addASkill);

router.route("/jobs/:jobId/skills/:skillId")
        .get(skillsController.getOneSkill)     
        .put(skillsController.skillsUpdateOne)
        .delete(skillsController.skillsDeleteOne);
module.exports = router;
