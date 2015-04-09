/**
 * Event handler js file for all the events of the categories
 */
Template.newCategoryTemplate.events({
    /*Add a new category*/
    "click #createNewCategory":function(event,templ){
        //alert("category");
        event.preventDefault();
        var attrs = {
            name : $("#categoryName").val(),
            created_at:moment().format('MMMM Do YYYY'),
            /*Pass the userId to verify if the user is admin*/
            userId:Meteor.userId(),
            active:false
        }
        /*This call has been defined in categories.js file on the server side*/
        Meteor.call('insertCategory',attrs,function(err){
           if(err){
               alert("Something went wrong");
           }
            else {
               /*If successful change the showing to the Categories index page*/
               Session.set("currentPage","CategoryIndexTemplate");
           }
        });

    }
});


// when the user clicks on the add category in the index page
Template.CategoryIndexTemplate.events({
    /*goes to new category-new.html*/
   'click #addCategory':function(event,templ){
       Session.set("currentPage","newCategoryTemplate");
   },
    /*Goes to category-edit.html*/
    'click #goToEditCategory':function(event,templ){
        Session.set("EditingCategory",this);
        Session.set("currentPage","CategoryEditTemplate");
    }
});
/*This is after when the category has been editted you submit the page to be updated*/
Template.CategoryEditTemplate.events({
   'click #editCategory':function(event,templ){
       //alert("editing");
       event.preventDefault();
       var attrs = {
           _id:$("#editId").val(),
           name: $("#editName").val(),
           userId :Meteor.userId(),
           /*add the edited date */
           edited_at:moment().format('MMMM Do YYYY')
       }

       // console.log(attrs);
       Meteor.call("updateCategory",attrs,function(err){
           if(err){
               alert('Something went wrong')
           }
           else {
               /*redirect(replace the currentPage template with category-index.html page template)*/
               Session.set("currentPage","CategoryIndexTemplate")
           }
       });
   }
});


