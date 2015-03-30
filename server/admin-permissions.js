/*FS media allow permission*/
Medias.allow({
    insert:function(userId){
        //console.log(userId);
        if(userId === Meteor.users.find({profile:{admin:true}}).fetch()[0]._id){
           // console.log("allowed");
            return true;
        }

    },
    update:function(userId){
        if(userId === Meteor.users.find({profile:{admin:true}}).fetch()[0]._id){
            // console.log("allowed");
            return true;
        }
    },
    download:function(userId){
        //console.log(userId);

        return true;
    }
})

//remove functionality of the media has been added in admin-user.js