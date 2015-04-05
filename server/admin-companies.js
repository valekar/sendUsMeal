Meteor.methods({
   'insertCompany':function(attrs){
       //check if the user is admin
       if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
           Companies.insert({
               name: attrs.name,
               created_at:attrs.created_at,
               created_by:attrs.userId,
               location:attrs.location

           });
       }
   } ,
    'updateCompany':function(attrs){
        if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
            Companies.update({_id:attrs._id},
                {
                    $set:{
                        location:attrs.location,
                        name: attrs.name,
                        edited_by:attrs.userId,
                        edited_at:attrs.edited_at
                    }   }
            )
        }
    },
    'deleteCompany':function(attrs){
    if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
        Companies.remove({_id:attrs._id});
    }
}
});