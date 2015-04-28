/*This is a separate admin-user.js for the admin*/
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
        };


        console.log(userObject);

        if(typeof (Meteor.users.findOne()) != 'undefined') {
            check(userObject, {
                username: String,
                password: String

            });
        }
       var id = Admin.insert({_id:"xxzzsrinisendmemeal12345",flag:true});

        userObject = {
            '_id':id,
            'username':attrs.userName,
            'password':attrs.password,
            profile:{
                admin:admin
            }
        }

        console.log("Inserting admin "+ id);
        var user_id = Accounts.createUser(
            userObject

        );

        return user_id;


    },

    'changeAdminPassword':function(password){
        console.log("changing admin password");
        var user = Meteor.users.findOne();
        Accounts.setPassword(user._id,password);
    }

});

/*MEteor methods for media remove functionality*/
Meteor.methods({
    "removeMedia":function(attrs){
        if(Meteor.users.findOne({profile:{admin:true}})._id==attrs.userId) {
            Medias.remove({_id:attrs.mediaId});
        }
    }
});

Meteor.methods({
   'orderDelivered':function(attrs){
      // console.log("updating :: " + attrs.orderId);
       if(attrs.id === Meteor.users.findOne({profile:{admin:true}})._id) {
           Orders.update({_id:attrs.orderId},
               {
                   $set:{
                       active:false
                   }
               }
           );
       }
   },
    'orderPending':function(attrs){
       // console.log("updating :: " + attrs.orderId);
        if(attrs.id === Meteor.users.findOne({profile:{admin:true}})._id) {
            Orders.update({_id:attrs.orderId},
                {
                    $set:{
                        active:true
                    }
                }
            );
        }
    }
});