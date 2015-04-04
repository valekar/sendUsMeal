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




    }
});


Meteor.methods({
    'insertCart':function(attr){
        Carts.insert({
            itemList : attr.itemList
        });
    }
});

//get the current session id
Meteor.methods({
    getSessionId: function() {
        return this.connection.id;
    }
});