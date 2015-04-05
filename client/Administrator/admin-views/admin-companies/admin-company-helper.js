Template.CompanyIndexTemplate.helpers({
   'companies':function(){
       return Companies.find();
   }
});


Template.CompanyEditTemplate.rendered= function(){
  var editingCompany = Session.get("EditingCompany");

    $("#companyName").val(editingCompany.name);
    $("#companyLocation").val(editingCompany.location);
    $("#companyCreatedAt").val(editingCompany.created_at);
    $("#companyCreatedBy").val(editingCompany.created_by);
    $("#companyId").val(editingCompany._id);

};