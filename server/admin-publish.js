/*admin publishing items*/
Meteor.publish('userCheck',function(){
    var fields ={};
    return Admin.find({},{_id:0});
});


Meteor.publish('Items',function(id){
    if(id === Meteor.users.findOne({profile:{admin:true}})._id){
        return Items.find({},{reactive: false});
    }
});

Meteor.publish('Categories',function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id){
        return Categories.find({},{reactive: false});
    }
});


Meteor.publish('Medias',function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return Medias.find({},{reactive: false});
    }
});

Meteor.publish("Companies",function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return Companies.find({},{reactive: false});
    }
});

Meteor.publish("Orders",function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return Orders.find({});
    }
});

Meteor.publish('ItemList',function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return ItemList.find();
    }
});

Meteor.publish('Carts',function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return Carts.find();
    }
});

Meteor.publish('Users',function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return Meteor.users.find({},{reactive: false});
    }
});

Meteor.publish('FeedBacks',function(id){
    /*Check if the user is admin*/
    if(id === Meteor.users.findOne({profile:{admin:true}})._id) {
        return Feedbacks.find();
    }
});