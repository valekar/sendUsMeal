/*INcludes all the sub template events except for CustomerSubOrderBodyTemplate */
Template.CustomerOrderBodyTemplate.events({
    'click #customerRegister':function(e,templ){
        e.preventDefault();
      //  alert("aa");

        var attrs ={
            phoneNumber:$("#regPhoneNumber").val(),
            email:$("#regEmail").val(),
            company:$("#regSelectCompany").val(),
            name:$("#regPersonalName").val()

        };

        console.log(attrs);


        Meteor.call('checkUserExistence',$("#regPhoneNumber").val(),function(err,result)
        {
            console.log(result);

            if(err){
                alert("User already exsits please login");
            }else {
                Meteor.call("addCustomerUser",attrs,function(err,result){
                    if(err){
                        sweetAlert("Please enter a valid phone number");
                    }
                    else{
                        //alert("signed in");
                        sweetAlert("Signed In Successfully, Password has been sent to your mobile, Please Login using the same.");
                        //show the login template
                        Session.set('customerCurrentPage','CustomerLoginTemplate');

                    }
                });

            }
        });

    },
    'click #loginCustomer':function(e,templ){
        e.preventDefault();
        var username = $("#loginPhoneNumber").val();
        var password = $("#loginPassword").val();
        Meteor.loginWithPassword(username,password,function(err,res){
           if(err){
               sweetAlert("Couldnt login");
           }

            else {
               //set the values
               var user = Meteor.user();
               //  console.log(user);

               Session.set("orderSelectCompany",user.profile.company_id);
               Session.set("orderPersonalName",user.profile.personalName);
               Session.set("orderPhoneNumber",user.username);
               Session.set("orderEmail",user.profile.email);
           }
        });
    },

    'click #goToCustomerRegister':function(e,templ){
        e.preventDefault();
        Session.set('customerCurrentPage','CustomerRegisterTemplate');
    },
    'click #goToCustomerLogin':function(e,templ){
        e.preventDefault();
        Session.set('customerCurrentPage','CustomerLoginTemplate');
    },
     'click #goToForgotPassword':function(e,templ){
         e.preventDefault();
         Session.set('customerCurrentPage','CustomerForgotPassword');
     }
    ,
    'click #customerForgotPassword':function(e,templ){
        e.preventDefault();
        var phoneNumber = $("#customerForgotPhoneNumber").val();

        if(phoneNumber.length<=0){
            sweetAlert("Please enter your number");
            return;
        }

        Meteor.call("updateCustomerPassword",phoneNumber,function(err,res){
           if(err){
               sweetAlert("Couldnt send you the password");
              console.log(err);
               Session.set('customerCurrentPage','CustomerRegisterTemplate');
           }
            else{
               sweetAlert("We have sent your password to your number");
               Session.set('customerCurrentPage','CustomerLoginTemplate');

           }
        });
    }

});


/*SUb template for placing the orders */
Template.CustomerSubOrderBodyTemplate.events({

    'click #customerPlaceOrder':function(event,templ) {
        //get the cart id from the session
        var cardId = Session.get("cartId");

        console.log(Session.get("cartId"));


        if(Meteor.userId()){
            var user = Meteor.user();
            var attrs = {
                _id:user._id,
                phoneNumber:$("#orderPhoneNumber").val(),
                email:$("#orderEmail").val(),
                company:$("#orderSelectCompany").val(),
                name:$("#orderPersonalName").val()

                };

            Meteor.call("updateUser",attrs,function(err,res){
               if(err){
                   sweetAlert("Couldnt update the user");
               }else{
                   var attrs={
                       cartId:Session.get("cartId"),
                       userId:Meteor.userId(),
                       grandTotal:Session.get("grandTotalAmount"),
                       created_at:moment().format('MMMM Do YYYY')
                   }
                   Meteor.call("insertOrder",attrs,function(err,res){
                      if(err){
                          sweetAlert("Couldn't place your, Please contact us. ph: +91 9901336755");
                      }
                       else {
                          sweetAlert("Your order has been placed");
                          Router.go("/orders");
                      }
                   });
               }
            });

        }

    }
});




Template.CustomerAllOrderBodyTemplate.events({

});



Template.CustomerLoginTemplate.events({

});

