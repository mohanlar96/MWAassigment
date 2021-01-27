angular.module("meanGames").controller("LoginController",LoginController);

function LoginController($location,$window,AuthFactory,GameDataFactory,jwtHelper){
    var vm=this;
    vm.isLoggedIn=function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    }
        vm.login=function(){
            console.log("tryin to login");
            if(vm.username && vm.password){
                console.log(vm.username);
                var user={
                    username:vm.username,
                    password:vm.password
                };
                GameDataFactory.login(user).then(function(response){
                    if(response.success){
                        $window.sessionStorage.token=response.token;
                        AuthFactory.isLoggedIn=true;
                        var token= $window.sessionStorage.token;
                        var decodedToken= jwtHelper.decodeToken(token);
                        vm.loggedInUser= decodedToken.username;
                        console.log(vm.loggedInUser);

                    }
                })
            }

        }
        vm.logout=function(){
            AuthFactory.isLoggedIn=false;
            delete $window.sessionStorage.token;
            $location.path("/")
            
        }
        vm.isActiveTab=function(url){
            var currentPath=$location.path().split("/")[1];
            return (url == currentPath ?"active":"")
        }
    }
