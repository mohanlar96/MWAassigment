angular.module("meanGames").controller("RegisterController",RegisterController);
console.log("this is the register");
function RegisterController(GameDataFactory){
    var vm=this;
    vm.register=function(){
    const user={
        username:vm.username,
        password:vm.password
    };
    if(!vm.username || !vm.password){
        vm.err="please add username and password";
    }
    else if(vm.password != vm.passwordRepeat){
        vm.err="plase make sure your password match";
    }
    else{
        GameDataFactory.register(user).then(function(response){
            console.log(response);
            vm.message="successful registration";
            vm.err="";
        })
    }
}
}

