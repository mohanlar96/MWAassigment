angular.module("jobApp").controller("JobsController", JobsController);

function JobsController(JobDataFactory){
    console.log("test");
    var vm =this;
    vm.title = "Hello world";
    JobDataFactory.getAllJobs().then(function(response){
        console.log("response", response);
        vm.jobs = response;
    })

    vm.deleteJob = function(id) {
        console.log("delete job with Id: ", id);
        JobDataFactory.deleteOneJob(id).then(function(response){
            vm.status = response;
            alert("delete job with id:"+id);
            location.reload();
        })
    }

    vm.addJob = function() {
        console.log("add new job");
        var postData = {
            title : vm.jobTitle,
            salary : vm.jobSalary,
            locationCity : vm.jobCity,
            locationState : vm.jobState,
            description : vm.jobDescription,
            experience : vm.jobExperience,
            postDate : vm.jobPostDate
        }

        JobDataFactory.addOneJob(postData).then(function(response){
            vm.status = response;            
            location.replace("/");
        })
    }
}