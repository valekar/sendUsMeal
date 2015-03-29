Meteor.publish('userCheck',function(){
    var fields ={};
    return Admin.find({},{_id:0});
});


Meteor.publish('Items',function(id){
    if(id === Meteor.users.findOne({profile:{admin:true}})._id){
        return Items.find();
    }
});

Meteor.publish('Categories',function(id){
    if(id === Meteor.users.findOne({profile:{admin:true}})._id){
        return Categories.find();
    }
});


Meteor.publish('Medias',function(){
   return Medias.find();
});