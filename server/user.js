Meteor.methods({
    addAdminUser:function(attrs){
        var admin = false;
        if(typeof (Meteor.users.findOne()) == 'undefined'){
            admin = true;
        }
        var userObject = {
            'username':attrs.userName,
            'password':attrs.password,
            profile:{
                admin:admin
            }
        }


        console.log(userObject);

        if(typeof (Meteor.users.findOne()) != 'undefined') {
            check(userObject, {
                username: String,
                password: String

            });
        }
        Admin.insert({_id:"xx",flag:true});
        var user_id = Accounts.createUser(
            userObject

        );

        return user_id;


    }

});