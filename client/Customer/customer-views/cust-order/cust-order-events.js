
/*SUb template for placing the orders */
Template.CustomerSubOrderBodyTemplate.events({

    'click #customerPlaceOrder':function(event,templ) {
        //get the cart id from the session
        var cardId = Session.get("cartId");
        event.preventDefault();
        console.log(Session.get("cartId"));


        if(Meteor.userId()){
            var user = Meteor.user();
            var attrs = {
                _id:user._id,
                phoneNumber:$("#orderPhoneNumber").val(),
                email:$("#orderEmail").val(),
                company:$("#orderSelectCompany").val(),
                name:$("#orderPersonalName").val()


                };

            Meteor.call("updateUser",attrs,function(err,res){
               if(err){
                   sweetAlert("Couldnt update the user");
               }else{
                   var attrs={
                       cartId:Session.get("cartId"),
                       userId:Meteor.userId(),
                       grandTotal:Session.get("grandTotalAmount"),
                       created_at:moment().format('MMMM Do YYYY'),
                       active:true
                   }
                   Meteor.call("insertOrder",attrs,function(err,res){
                      if(err){
                          sweetAlert("Couldn't place your, Please contact us. ph: +91 9901336755");
                      }
                       else {
                          sweetAlert("Your order has been placed");
                          Router.go("/orders");
                      }
                   });
               }
            });

        }

    }
});




Template.CustomerAllOrderBodyTemplate.events({
    'click #cancelOrder':function(e,templ){
        e.preventDefault();
        if(window.confirm("Are you sure?")){
            var attr = {
                _id:this._id,
                userId:Meteor.userId()
            };


            if(Meteor.userId() && this.active == true){
                Meteor.call('deleteOrder',attr,function(err,result){
                    if(err){
                         sweetAlert("Couldn't cancel the order");
                    }
                    else{
                        sweetAlert("Your order has been cancelled");
                    }
                });
            }else {
                sweetAlert("Your order cannot be cancelled as it has already been delivered");
            }
        }

    }
});




