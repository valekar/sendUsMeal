// adding new item into the list
/*Adding the food items*/
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
        /*Store the current instance in the EditingItem session variable*/
        Session.set("EditingItem",this);
        /*Redirect to the next Edit template where you can edit the item*/
        Session.set("currentPage","ItemEditTemplate");
    },
    /*Delete the current item from the list*/
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
    }
});

/*The events that happen in the edit template*/
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
    /*Interesting :: Add the media , this redirects to the item-media template where in you can choose the related the
     pick for the item*/
    'click #addItemMedia':function(event,templ){
        event.preventDefault();
        //alert("media");
        /*go to the media template to choose the media for the current item*/
        Session.set("currentPage","ItemMediaTemplate");
    }
});

/*the item-media.html page events*/
Template.ItemMediaTemplate.events({
    /*choose one of the items and then click the add media button */
   'click #addItemMedia':function(event,templ){
       var mediaId = $('input[name=addItemMediaCheckbox]:checked').val();
       if(mediaId.length<=0){
           alert("Select any Media please");
       }
       else {
          // console.log(mediaId);
           /*Store the currently selected media Id */
           Session.set("ItemMedia",mediaId);
           /*Redirect to the editing page*/
           Session.set("currentPage","ItemEditTemplate");
       }

   }
});