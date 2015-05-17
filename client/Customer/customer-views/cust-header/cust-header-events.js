Template.CustomerHeaderTemplate.events({
    'click #customerLogout':function(e,templ){
        Meteor.logout(function(err) {
            if(err){
                alert("Couldn't logout");
            }else {
                Router.go("/")
            }
        });
    },

    'click #customerChangePassword':function(e,templ){
        e.preventDefault();
        var password = $("#password").val();
        var userName = Meteor.user().username;
        if(password.length>0){
            var confirmPassword = $("#confirmPassword").val();
            var attrs ={
              password:password,
              userId:Meteor.userId()
            };
            if(password == confirmPassword){
                Meteor.call('changeCustomerPassword',attrs,function(err,result){
                    if(err){
                        sweetAlert("Couldn't update the password");
                    }else{
                        sweetAlert("Your password has been changed successfully!");
                        $("#changePasswordModal").modal('hide');
                        $("#password").val('');
                        $("#confirmPassword").val('');
                        // as it automatically logs out the user login the user again
                        Meteor.loginWithPassword(userName,password,function(err,res){
                            if(err){
                                sweetAlert("Couldn't login");
                            }
                        });

                    }
                });
            }
            else {
                sweetAlert("Passwords doesn't match");
            }
        }
        else {
            sweetAlert("Please enter your password");
        }
    },
    'click #goToHome':function(){
        Router.go("/");
    }
})