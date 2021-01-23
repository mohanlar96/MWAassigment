angular.module("jobApp").factory("JobSkillDataFactory", JobSkillDataFactory);

function JobSkillDataFactory($http){
    return {
        getAllSkills : getAllSkills,
        deleteAJobSkill : deleteAJobSkill,
        getAJobSkill : getAJobSkill,
        addAJobSkill : addAJobSkill,
        updateAJobSkill : updateAJobSkill
    };

    function updateAJobSkill(jobId, id, skill) {
        return $http.put("/api/jobs/"+jobId+"/skills/"+id, skill)
            .then(complete).catch(failed);
    }

    function addAJobSkill(jobId, skill){
        return $http.post("/api/jobs/"+jobId+"/skills", skill)
            .then(complete).catch(failed);
    }

    function getAllSkills(jobId){
        console.log("get all jobs skills list");
        return $http.get("/api/jobs"+jobId)
            .then(complete).catch(failed);
    }

    function getAJobSkill(jobId, id){
        console.log("get single skill");
        return $http.get("/api/jobs/"+jobId+"/skills/"+id)
            .then(complete).catch(failed);
    }

    function deleteAJobSkill(jobId, id){
        console.log("delete job");
        return $http.delete("/api/jobs/"+jobId+"/skills/"+id)
            .then(complete).catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    
    function failed() {
        return status.statusText;
    }
}