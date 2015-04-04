Meteor.publish('CustomerItems',function(){

   return Items.find();
});


Meteor.publish('CustomerMedias',function(){
    return Medias.find();
});

Meteor.publish('CustomerItemList',function(currentSessionId){
   return ItemList.find({currentSessionId:currentSessionId});
});

