Meteor.publish('CustomerItems',function(){

   return Items.find();
});


Meteor.publish('CustomerMedias',function(){
    return Medias.find();
});

Meteor.publish('CustomerItemList',function(currentSessionId){
   return ItemList.find({currentSessionId:currentSessionId});
});


Meteor.publish('CustomerCartOrder',function(cartId){
    return Carts.find({_id:cartId});
});


Meteor.publish('CustomerOrders',function(){
    return Orders.find({userId:this.userId});
});


