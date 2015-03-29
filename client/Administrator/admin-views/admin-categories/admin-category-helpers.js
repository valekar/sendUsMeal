Template.CategoryIndexTemplate.helpers({
   'categories':function(){
       return Categories.find();
   }
});

Template.CategoryEditTemplate.rendered = function(){
    var editingCategory = Session.get("EditingCategory");
    $("#editId").val(editingCategory._id);
    $("#editName").val(editingCategory.name);
    $("#editCreatedAt").val(editingCategory.created_at);
    $("#editCreatedBy").val(editingCategory.created_by);
};