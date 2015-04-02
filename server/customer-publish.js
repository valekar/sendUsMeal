Meteor.publish('CustomerItems',function(){
   return Items.find();
});


Meteor.publish('CustomerMedias',function(){
    return Medias.find();
});