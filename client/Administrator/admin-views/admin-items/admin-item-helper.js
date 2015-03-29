Template.ItemIndexTemplate.helpers({
   'items':function(){
       return Items.find();
   }
});


Template.ItemEditTemplate.rendered = function(){
  var item = Session.get("EditingItem");
    $("#itemName").val(item.name);
    $("#itemPrice").val(item.price);
    $('#itemCreated_at').val(item.created_at);
    $('#itemCreated_by').val(item.created_by);
    $("#itemId").val(item._id);
    $("#itemMediaId").val(item.itemMediaId);
    $("#itemCategoryId").val(item.itemCategoryId);

    //console.log(item);
    //set the value of mediaId after coming back from the item-media.html page
    if(Session.get("ItemMedia")!=null){
        $("#itemMediaId").val(Session.get("ItemMedia"));
        Session.set("ItemMedia",null);
    }

};


Template.ItemEditTemplate.helpers({
   'categories':function(){
       return Categories.find()
   }
});

Template.newItemTemplate.helpers({
    'categories':function(){
        return Categories.find()
    }
});


Template.ItemMediaTemplate.helpers({
    'medias':function(){
        return Medias.find();
    }
});

