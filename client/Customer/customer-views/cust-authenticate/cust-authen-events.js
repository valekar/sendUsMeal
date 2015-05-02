Template.CustomerRegisterTemplate.events({
    'click #customerRegister':function(e,templ){
        e.preventDefault();
        //  alert("aa");
       // console.log($("#regPersonalNames").val());

        var attrs = getRegisterValues();

        if(attrs === false){
            return;
        }

        console.log(attrs);


        Meteor.call('checkUserExistence',$("#regPhoneNumber").val(),function(err,result)
        {
            console.log(result);

            if(err){
                alert("User already exists please login");
            }else {
                Meteor.call("addCustomerUser",attrs,function(err,result){
                    if(err){
                        sweetAlert("Something went wrong Please make sure enter all the fields correctly");
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

    },'click #goToCustomerLogin':function(e,templ){
        e.preventDefault();
        Session.set('customerCurrentPage','CustomerLoginTemplate');
    }
});


Template.CustomerForgotPassword.events({
    'click #customerForgotPassword':function(e,templ){
        e.preventDefault();
        var phoneNumber = getForgotValue();
        //console.log(phoneNumber);
        if(phoneNumber.length<=0){
            sweetAlert("Please enter your number");
            return;
        }else if(!phoneNumberValidation(phoneNumber)){
            sweetAlert("Please enter a valid Phone Number");
            return;
        }

        Meteor.call("updateCustomerPassword",phoneNumber,function(err,res){
            if(err){
                sweetAlert("Couldn't send you the password");
                console.log(err);
                Session.set('customerCurrentPage','CustomerRegisterTemplate');
            }
            else{
                sweetAlert("We have sent your password to your number");
                Session.set('customerCurrentPage','CustomerLoginTemplate');

            }
        });
    },'click #goToCustomerLogin':function(e,templ){
        e.preventDefault();
        Session.set('customerCurrentPage','CustomerLoginTemplate');
    }
});


Template.CustomerLoginTemplate.events({
    'click #loginCustomer':function(e,templ){
        e.preventDefault();
        //var username = $("#loginPhoneNumber").val();
       // var password = $("#loginPassword").val();

        var attrs = getLoginValues();

        if(attrs === false){
            return;
        }

        Meteor.loginWithPassword(attrs.username,attrs.password,function(err,res){
            if(err){
                sweetAlert("Couldn't login,Please check your phone number and password");
            }

            else {
                //set the values
                var user = Meteor.user();
                //  console.log(user);
                // set the value for the order page to be populated withe values
                /*Session.set("orderSelectCompany",user.profile.company_id);
                Session.set("orderPersonalName",user.profile.personalName);
                Session.set("orderPhoneNumber",user.username);
                Session.set("orderEmail",user.profile.email);*/
                // if this is present(Used in the / page)
                $('#LoginModal').modal('hide');
                //Router.go("/north-indian");
            }
        });
    },
    'click #goToCustomerRegister':function(e,templ){
        e.preventDefault();
        Session.set('customerCurrentPage','CustomerRegisterTemplate');
    },
    'click #goToForgotPassword':function(e,templ){
        e.preventDefault();
        Session.set('customerCurrentPage','CustomerForgotPassword');
    }
});


function getRegisterValues(){
    var personalName = getTextValues("regPersonalName"," Name");
    var phoneNumber = getTextValues("regPhoneNumber"," Phone Number");
    var email = getTextValues("regEmail"," Email");
    console.log(phoneNumber);
    if(!phoneNumberValidation(phoneNumber)){
        sweetAlert("Please enter a valid phone number");
        return false;
    }


   if(!emailValidation(email)){
       sweetAlert("Please enter a valid email Id");
        return false;
    }

    //else {
        var attrs = {
            phoneNumber:phoneNumber,
            email:email,
            company:$("#regSelectCompany").val(),
            name:personalName

        };
        return attrs;
   // }


}

function getLoginValues(){
    var username = getTextValues("loginPhoneNumber", " Phone Number");
    var password = getTextValues("loginPassword", " Password");


    if(!phoneNumberValidation(username)) {
        sweetAlert("Please enter a valid phone number");
        return false;
    }

   // else {
        var attrs = {
            username:username,
            password:password
        }
        return attrs;
   // }


}


function getForgotValue(){
    var phoneNumber = getTextValues("customerForgotPhoneNumber", " Phone Number");
    phoneNumber = parseInt(phoneNumber);
  //  console.log(phoneNumber);
    if(isNaN(phoneNumber)){
        sweetAlert("Please enter a valid number");
        return false;
    }

    return phoneNumber;
}

/*Select any one one values of the form from the same page*/
/*Because we will be having two forms on the same page,we have to do something like this*/
// when a click event happens on the html of order page, it will not be detected , but the click events on modals are deteched , so we have to carefully
// get the values from the input texts where the click event happens
function getTextValues(textName,alertValue){
    var textValues = $("input[name='"+textName+"']").map(function() {
        return this.value
    }).get();
    var value = "";
    for(var i in textValues){
        value = textValues[i];
        if(value.length>0){
            break;
        }else{
            if(i == textValues.length-1){
                sweetAlert("Please enter your " + alertValue);
                return ;
            }
        }
    }

    return value;
}


function phoneNumberValidation(inputtxt){
    var phoneNo = /^[789]\d{9}$/;
    return phoneNo.test(inputtxt);
}

function emailValidation(inputtxt) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(inputtxt);
}

