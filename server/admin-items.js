/*Item methods for storing updating and deleting the items*/
Meteor.methods({
    insertItem:function(attrs){
       if(Meteor.users.findOne({profile:{admin:true}})._id==attrs.userId){
            Items.insert({
                "name":attrs.name,
                "price":attrs.price,
                "created_at":attrs.created_at,
                "created_by":attrs.userId,
                "itemCategoryId":attrs.itemCategoryId
            });
       }
   },
    editItem:function(attrs){
       // console.log(attrs.userId);
        if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
           // console.log(attrs);
            Items.update({_id:attrs._id},
                {
                    $set: {
                        "name": attrs.name,
                        "price": attrs.price,
                        "edited_at": attrs.edited_at,
                        "edited_by": attrs.userId,
                        "itemCategoryId":attrs.itemCategoryId,
                        "itemMediaId":attrs.itemMediaId
                    }
                },
                {upsert:true}
            );
        }
    },
    deleteItem:function(attrs){
        if(Meteor.users.findOne({profile:{admin:true}})._id===attrs.userId){
            Items.remove({_id:attrs._id});
        }
    }
});