Meteor.methods({
    'insertCategory':function(attrs){
        if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
            Categories.insert({
                name: attrs.name,
                created_at:attrs.created_at,
                created_by:attrs.userId

            });
        }
    },
    'updateCategory':function(attrs){
        if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
            Categories.update({_id:attrs._id},
                {
                    $set:{
                        name: attrs.name,
                        edited_by:attrs.userId,
                        edited_at:attrs.edited_at
                }   }
            )
        }
    }
})