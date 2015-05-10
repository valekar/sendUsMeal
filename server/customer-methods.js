/*Methods for ItemList*/
Meteor.methods({
    'insertItemList':function(attr){
        //this is for the new guest user
       // console.log(attr.currentSessionId);
      //  console.log(this.connection.id);
        if(typeof ItemList.findOne({itemId:attr.itemId,currentSessionId:attr.currentSessionId}) != 'undefined'){
             // console.log(attr);
            //console.log("updating")


               ItemList.update({itemId:attr.itemId,currentSessionId:attr.currentSessionId},
                   {
                       $set: {
                           itemQuantity: attr.itemQuantity,
                           itemTotalPrice: attr.itemTotalPrice,
                           itemName: attr.itemName
                       }
                   }
               );


        }
        else {
            ItemList.insert(
                    {
                        currentSessionId:attr.currentSessionId,
                        itemId: attr.itemId,
                        itemQuantity: attr.itemQuantity,
                        itemTotalPrice: attr.itemTotalPrice,
                        itemName: attr.itemName
                    }

            );
        }

    },
    'deleteItemList':function(attr){
        //console.log("deleting an itemlist" + attr.itemId +"  "+ attr.currentSessionId);
        ItemList.remove({itemId:attr.itemId,currentSessionId:attr.currentSessionId});
    }
});


Meteor.methods({
    'insertCart':function(attr){

        if(this.connection.id == attr.currentSessionId){

            var itemLists = ItemList.find({currentSessionId:attr.currentSessionId}).fetch();
            var itemListIds = [];
            for(var i=0;i<itemLists.length;i++){
                itemListIds[i] = itemLists[i]._id;
            }
           // console.log("The Grand total is :: " + attr.grandTotal);
            var id = Carts.insert({
                itemListIds:itemListIds,
                sessionId:attr.currentSessionId,
                grandTotal:attr.grandTotal
            });

            return id;
        }


    }
});

//get the current session id
Meteor.methods({
    getSessionId: function() {
        return this.connection.id;
    }
});



Meteor.methods({
   'insertOrder':function(attrs){
       if(this.userId == attrs.userId){
           Orders.insert({
               created_at:attrs.created_at,
               userId:attrs.userId,
               cartId:attrs.cartId,
               grandTotal:attrs.grandTotal,
               active:attrs.active
           })
       }
   },

    'deleteOrder':function(attrs){
        if(this.userId == attrs.userId){
            Orders.remove({_id:attrs._id,active:true});
        }
    }
});


Meteor.methods({
    'insertFeedback':function(attrs){
        Feedbacks.insert({
            userEmail:attrs.userEmail,
            type:attrs.type,
            userFeedback:attrs.userFeedback,
            created_at:attrs.created_at
        })
    }
})