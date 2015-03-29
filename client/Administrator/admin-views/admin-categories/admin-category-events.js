Template.newCategoryTemplate.events({
    "click #createNewCategory":function(event,templ){
        //alert("category");
        var attrs = {
            name : $("#categoryName").val(),
            created_at:moment().format('MMMM Do YYYY'),
            userId:Meteor.userId()
        }

        Meteor.call('insertCategory',attrs,function(err){
           if(err){
               alert("Something went wrong");
           }
            else {
               Session.set("currentPage","CategoryIndexTemplate");
           }
        });

    }
});

// when the user clicks on the add category in the index page
Template.CategoryIndexTemplate.events({
   'click #addCategory':function(event,templ){
       Session.set("currentPage","newCategoryTemplate");
   },
    'click #goToEditCategory':function(event,templ){
        Session.set("EditingCategory",this);
        Session.set("currentPage","CategoryEditTemplate");
    }
});

Template.CategoryEditTemplate.events({
   'click #editCategory':function(event,templ){
       //alert("editing");
       event.preventDefault();
       var attrs = {
           _id:$("#editId").val(),
           name: $("#editName").val(),
           userId :Meteor.userId(),
           edited_at:moment().format('MMMM Do YYYY')
       }

       // console.log(attrs);
       Meteor.call("updateCategory",attrs,function(err){
           if(err){
               alert('Something went wrong')
           }
           else {
               Session.set("currentPage","CategoryIndexTemplate")
           }
       });
   }
});


