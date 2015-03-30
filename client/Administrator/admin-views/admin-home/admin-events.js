/*This is the admin registration template, This is shown when the user first comes for the first time*/
Template.AdminBodyRegistrationTemplate.events({
   'click #RegisterAdmin':function(event,templ){
       event.preventDefault();
       //alert("Hello");

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

   }
});
/*This is to handle the user(admin) login */
Template.AdminBodyLoginTemplate.events({
    'click #adminLogin':function(e,templ) {
        e.preventDefault();
        var username = $("#userName").val();
        var password = $("#userPassword").val();
        Meteor.loginWithPassword(username, password, function (err) {
            if (err) {
                alert("Error :: " + err);
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

    }

});