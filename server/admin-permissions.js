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