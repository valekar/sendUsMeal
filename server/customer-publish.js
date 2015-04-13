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

Meteor.publish('CustomerCarts',function(attr){
    if(attr == this.userId){
        return Carts.find();
    }
});


Meteor.publish('CustomerOrderItemList',function(){
   return ItemList.find();
});

Meteor.publish('CustomerCompanies',function(){
   return Companies.find();
});

