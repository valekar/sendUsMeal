Template.FeedBackTemplate.events({
   "click #getFeedBack":function(e,templ){
       e.preventDefault();

       var type = $("#feedBackType").val();
       var emailId=$("#userEmail").val();
       var feedback = $("#userFeedback").val();

       var attrs ={
           type:type,
           userEmail:emailId,
           userFeedback:feedback,
           created_at:moment().format('MMMM Do YYYY')
       };

       Meteor.call("insertFeedback",attrs,function(err,res){
          if(err){
              sweetAlert("we couldn't get your feedback,Sorry try again later");
              Router.go("/feedback");
          }
           else {
              sweetAlert("Thank you for your feedback");
              $("#feedBackType").val('0');
              $("#userEmail").val('');
              $("#userFeedback").val('');
          }
       });

   }



});