/*This is the admin registration template, This is shown when the user first comes for the first time*/
Template.AdminBodyRegistrationTemplate.events({
   'click #RegisterAdmin':function(event,templ){
       event.preventDefault();
       alert("Hello");

       if($("#confirmPassword").val() === $("#password").val())
       {
           var attrs = {
               userName:$("#userName").val(),
               password:$("#password").val()
           };


           //alert("values " + email + name + phoneNumber + company);
           //
           Meteor.call('addAdminUser',attrs,function(err,result){
               if(err){
                   alert("something went wrong " +err.reason);
               }
               else if(result){
                   console.log(result);
                   // alert(result);
                   Router.go('/adminHome.htm');
               }
           });

       }

   },

    'click #adminChangePassword':function(e,templ){
       // alert("Hello");
        e.preventDefault();

        var password = $("#adminPassword").val();
        var confirmPassword = $("#adminConfirmPassword").val();

        if(password!=confirmPassword){
            sweetAlert("password doesn't match");
            return;
        }


        Meteor.call('changeAdminPassword',password,function(err){
            if(err){
                sweetAlert("Coudn't change the password");
            }
        });
    }
});
/*This is to handle the user(admin) login */
Template.AdminBodyLoginTemplate.events({
    'click #adminLogin':function(e,templ) {
        e.preventDefault();
        var username = $("#userName").val();
        var password = $("#userPassword").val();
        var adminType = $('input:radio[name="adminType"]:checked').val();
        Session.set("adminType",adminType);
       // alert(adminType);
        Meteor.loginWithPassword({username:username}, password, function (err) {
            if (err) {
                alert("Error :: " + err.reason);
            }
            else {
                Router.go('/adminHome.htm');
            }

        });
    }


});

/*User logout*/
Template.adminHeaderTemplate.events({
   "click #adminLogout":function(event,templ){
       Meteor.logout(function(err) {
           if(err){
               alert("Couldn't logout");
           }else {
               Session.clear();
               Router.go("/adminLogin.htm")
           }
       });
   }
});

/*When the user has been logged in do the specified actions below*/
Template.adminLoggedInTemplate.events({
    /*Side bar navigation links*/
    'click #categories':function(event,templ){
        event.preventDefault();
        Session.set("currentPage","CategoryIndexTemplate");
    },
    'click #items':function(event,templ){
        event.preventDefault();

        //alert("calling the items index page");
        Session.set("currentPage","ItemIndexTemplate");

    },
    'click #orders':function(event,templ){
        alert("calling the orders Orders page");
    },
    'click #medias':function(event,templ){
        Session.set("currentPage","MediaIndexTemplate");

    },
    'click #companies':function(event,templ){
        Session.set("currentPage","CompanyIndexTemplate");
    },
    'click #orders':function(event,templ){
        event.preventDefault();
        Session.set("currentPage","AdminOrdersIndexTemplate");
    },
    'click #feedBacks':function(event,templ){
        event.preventDefault();
        Session.set("currentPage","AdminFeedBackTemplate");
    },
    'click #sendEmails':function(event,templ){
        event.preventDefault();
        Session.set("currentPage","AdminEmailTemplate");
    }

});