/*Used in the categories-index.html to display the categories*/
Template.CategoryIndexTemplate.helpers({
   'categories':function(){
       return Categories.find();
   }
});

/*Fill the form fields with the suitable values when the user clicks on the edit button*/
Template.CategoryEditTemplate.rendered = function(){
    //value of the clicked instance is stored in EditingCategory
    var editingCategory = Session.get("EditingCategory");
    $("#editId").val(editingCategory._id);
    $("#editName").val(editingCategory.name);
    $("#editCreatedAt").val(editingCategory.created_at);
    $("#editCreatedBy").val(editingCategory.created_by);
};