Meteor.publish('CustomerItems',function(){

   return Items.find({}, {reactive: false});
});


Meteor.publish('CustomerMedias',function(){
    return Medias.find({}, {reactive: false});
});

Meteor.publish('CustomerItemList',function(currentSessionId){
   return ItemList.find({currentSessionId:currentSessionId},{reactive: false});
});


Meteor.publish('CustomerCartOrder',function(cartId){
    return Carts.find({_id:cartId});
});


Meteor.publish('CustomerOrders',function(){

    var orders = Orders.find({userId:this.userId});

    return orders;
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
   return Companies.find({},{reactive: false});
});


/*
var wrappedFind = Meteor.Collection.prototype.find;

Meteor.Collection.prototype.find = function () {
    var cursor = wrappedFind.apply(this, arguments);
    var collectionName = this._name;

    cursor.observeChanges({
        added: function (id, fields) {
            console.log(collectionName, 'added', id, fields);
        },

        changed: function (id, fields) {
            console.log(collectionName, 'changed', id, fields);
        },

        movedBefore: function (id, before) {
            console.log(collectionName, 'movedBefore', id, before);
        },

        removed: function (id) {
            console.log(collectionName, 'removed', id);
        }
    });

    return cursor;
};
*/
