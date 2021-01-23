angular.module("jobApp").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http){
    return {
        getAllJobs : getAllJobs,
        deleteAJob : deleteAJob,
        getAJob : getAJob,
        addAJob : addAJob,
        updateAJob : updateAJob
    };

    function updateAJob(job, id) {
        return $http.put("/api/jobs/"+id, job)
            .then(complete).catch(failed);
    }
    function getAJob(id){
        console.log("get single job");
        return $http.get("/api/jobs/"+id)
            .then(complete).catch(failed);
    }
    function addAJob(job){
        return $http.post("/api/jobs", job)
            .then(complete).catch(failed);
    }

    function getAllJobs(){
        console.log("get all jobs list");
        return $http.get("/api/jobs")
            .then(complete).catch(failed);
    }

    function deleteAJob(id){
        console.log("delete job");
        return $http.delete("/api/jobs/"+id)
            .then(complete).catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    
    function failed() {
        return status.statusText;
    }
}