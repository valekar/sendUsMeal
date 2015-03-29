// adding new item into the list
Template.newItemTemplate.events({
   "click #createNewItem":function(event,templ){
       event.preventDefault();
       var attrs={
           name:$("#itemName").val(),
           price:$("#itemPrice").val(),
           created_at:moment().format('MMMM Do YYYY'),
           userId:Meteor.userId(),
           itemCategoryId: $("#itemCategory").val()
       }

       if(Meteor.userId()){
           Meteor.call('insertItem',attrs,function(err,result){
               if(err){
                   alert("Couldnt insert");
               }
               else{
                   alert("Inserted the item successfully");
                   Session.set("currentPage","ItemIndexTemplate");
               }
           })
       }
   }
});

//index page events where you can see all the items
Template.ItemIndexTemplate.events({
    'click #AddItem':function(event,templ){
       // alert("Addming events");
        Session.set("currentPage","newItemTemplate");
    },

    'click #editItem':function(event,templ){
       // console.log(this);
        Session.set("EditingItem",this);
        Session.set("currentPage","ItemEditTemplate");
    },
    'click #deleteItem':function(event,templ){
        if(window.confirm("Are you sure?")){
            var attr = {
                _id:this._id,
                userId:Meteor.userId()
            }
                if(Meteor.userId()){
                    Meteor.call('deleteItem',attr,function(err,result){
                       if(err){
                          // alert("Couldn't delete");
                       }
                    });
                }
        }
        else {
            //alert("cancelled");
        }
    }
});

Template.ItemEditTemplate.events({
   'click #editItem':function(event,templ){
       event.preventDefault();
       alert("editting items" + $("#itemCategoryId").val());


       var attrs = {
           _id:$("#itemId").val(),
           name:$("#itemName").val(),
           price:$("#itemPrice").val(),
           edited_at:moment().format('MMMM Do YYYY'),
           userId:Meteor.userId(),
           itemMediaId:$("#itemMediaId").val(),
           itemCategoryId: $("#itemCategoryId").val()
       };

      // console.log(attrs);

       if(Meteor.userId()){
           Meteor.call('editItem',attrs,function(err,result){
               if(err){
                   alert("Couldnt insert");
               }
               else{
                 //  alert("Edited the item successfully");
                  Session.set("currentPage","ItemIndexTemplate");
               }
           })
       }

   },

    'click #addItemMedia':function(event,templ){
        event.preventDefault();
        //alert("media");
        Session.set("currentPage","ItemMediaTemplate");
    }
});


Template.ItemMediaTemplate.events({
   'click #addItemMedia':function(event,templ){
       var mediaId = $('input[name=addItemMediaCheckbox]:checked').val();
       if(mediaId.length<=0){
           alert("Select any Media please");
       }
       else {
          // console.log(mediaId);
           Session.set("ItemMedia",mediaId);
           Session.set("currentPage","ItemEditTemplate");
       }

   }
});