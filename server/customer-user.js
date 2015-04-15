Meteor.methods({

    addCustomerUser:function(attrs){
        var password =  "Slice" + Math.floor(Math.random()*900) + 100;
        sendSms(attrs.phoneNumber);
        if(password!=null){
            var userObject = {
                'username':attrs.phoneNumber,
                'password':password+"",

                'profile':{
                    'email':attrs.email,
                    'personalName':attrs.name,
                    'company_id':attrs.company
                }
            };
            console.log(userObject);
            check(userObject,{
                username:String,
                password:String,
                profile:{
                    email:String,
                    personalName:String,
                    company_id:String
                }

            });

            var user_id = Accounts.createUser(
                userObject

            );

            //this.setUserId(user_id);

            return userObject.password;
        }else {
            throw new Meteor.Error("Couldnt register your number, number already exists, Please contact Administrator");
        }



    }

});



Meteor.methods({
    'checkUserExistence':function(username){
        if(typeof Meteor.users.findOne({username:username})!='undefined')
            return true;
        else
            return false;
    },

    'updateUser':function(attrs){
        Meteor.users.update({_id:attrs._id},
            {
                $set:{
                    username:attrs.phoneNumber,
                    profile:{
                        email: attrs.email,
                        personalName:attrs.name,
                        company_id:attrs.company
                    }

                }
            }

        )
    },
    //used for resetting the forgotten password
    'updateCustomerPassword':function(phonenumber){
        phonenumber = parseInt(phonenumber);
        console.log(phonenumber);
        if(isNaN(phonenumber)){
            throw Meteor.Error("Please enter valid number");
        }
        //check(phonenumber,Number);

        if(typeof  Meteor.users.find({username:""+phonenumber+""}).fetch()[0] != 'undefined'){
            var userId = Meteor.users.find({username:phonenumber+""}).fetch()[0]._id;
            //console.log(userId);
            var password =  "Slice" + Math.floor(Math.random()*900) + 100;

                console.log("Setting the password !! :: "+ password);
            Accounts.setPassword(userId,password);
            console.log("Password :: " + password);
            sendSms(phonenumber,password);
        }
    },

    'changeCustomerPassword':function(attrs){
        if(this.userId == attrs.userId){
            Accounts.setPassword(this.userId,attrs.password);
        }else{
            throw new Meteor.Error("Couldn't update the password");
        }
    }


});




sendSms = function(phoneNumber,password){

    twilio = Twilio("ACd9a8f0183a747cd753b1e3532581455d", "7f192048e68ed4cf0fe22ee63f2416a3");
    twilio.sendSms({
        to:'+91'+phoneNumber, // Any number Twilio can deliver to

        from: '+12019031863', // A number you bought from Twilio and can use for outbound communication
        body: 'testing, '+ password+" This is Srinivas Here, have fun" // body of the SMS message
    }, function(err, responseData) {
        if (err) {
            console.log("Couldn't send the sms "+ err.message );
            throw new Meteor.Error(err.message);
            //return password;
        }
        else {
            console.log('+91'+phoneNumber + " password :: "+password);
            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."


        }


    });
};


/*


    var password = Math.floor(Math.random()*90000) + 10000;
 password  = "Slice"+password;
 try {
 var returnedPassword = sendSms(phonenumber, password);
 return returnedPassword;
 } catch (e) {
 console.log(e.message);
 throw new Meteor.Error("Couldn't send the sms to you, Please contact admin " + e.message );
 }


var twilio = Twilio("ACd9a8f0183a747cd753b1e3532581455d", "7f192048e68ed4cf0fe22ee63f2416a3");
var wrappedSend = Meteor.wrapAsync(twilio.sendSms, twilio);

sendSms = function(phoneNumber,password) {

    wrappedSend({
        to:'+91'+phoneNumber, // Any number Twilio can deliver to

        from: '+12019031863', // A number you bought from Twilio and can use for outbound communication
        body: 'testing, '+ password+" This is Srinivas Here, have fun" // body of the SMS message
    });


    var userId = Meteor.users.find({username:phoneNumber}).fetch()[0]._id;
    ///console.log(phoneNumber);
    Accounts.setPassword(userId,password);
    console.log("returning");
    return password;
};*/
