Template.AdminEmailTemplate.events({
   'click #sendEmailToUser':function(e,templ){
       e.preventDefault();
       var toEmailId = $("#toEmailId").val();
       var fromEmailId = $("#fromEmailId").val();
       var subject = $("#subject").val();
       var message = $("#message").val();

       var attrs={
           toEmailId:toEmailId,
           fromEmailId:fromEmailId,
           subject:subject,
           message:message
       };

       Meteor.call("sendEmailToUsers",attrs,function(err,res){
           if(err){

           }
           else{
               sweetAlert("Sent the email successfully");
           }
       })
   }
});