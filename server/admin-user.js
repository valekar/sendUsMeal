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