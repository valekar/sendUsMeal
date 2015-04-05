Template.CompanyNewTemplate.events({
   'click #createCompany':function(event,templ){
       event.preventDefault();
       var compName = $("#companyName").val();
       var compLocation = $("#companyLocation").val();
       var createdBy = Meteor.userId();
       var createdAt = moment().format('MMMM Do YYYY');


       var attr = {
           name : compName,
           location:compLocation,
           userId:createdBy,
           created_at:createdAt
       }

       if(Meteor.userId()){
           Meteor.call("insertCompany",attr,function(err,result){
               if(err){
                   alert("Couldn't insert the company");
               }
               else {
                   Session.set("currentPage","CompanyIndexTemplate");
               }
           });
       }

   }

});

Template.CompanyEditTemplate.events({
    'click #editCompany':function(event,templ){
        event.preventDefault();

        var attrs = {
            _id:$("#companyId").val(),
            name : $("#companyName").val(),
            location:$("#companyLocation").val(),
            userId:Meteor.userId(),
            edited_at:moment().format('MMMM Do YYYY')
        }

        Meteor.call("updateCompany",attrs,function(err){
            if(err){
                alert("Couldnt update the company");
            }else{
                Session.set("currentPage","CompanyIndexTemplate");
            }
        })

    }
});


Template.CompanyIndexTemplate.events({
    'click #addCompany':function(e,templ){
        Session.set("currentPage","CompanyNewTemplate");
    },
    'click #editCompany':function(e,templ){
        /*Store the current instance in the EditingItem session variable*/
        Session.set("EditingCompany",this);
        /*Redirect to the next Edit template where you can edit the item*/
        Session.set("currentPage","CompanyEditTemplate");
    },
    'click #deleteCompany':function(e,templ){
        e.preventDefault();
        if(window.confirm("Are you sure?")){
            var attr = {
                _id:this._id,
                userId:Meteor.userId()
            }
            if(Meteor.userId()){
                Meteor.call('deleteCompany',attr,function(err,result){
                    if(err){
                        // alert("Couldn't delete");
                    }
                });
            }
        }
    }
});