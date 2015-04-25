Template.CustomerOrderBodyTemplate.helpers({
   'customerOrder':function(){
       //console.log(Session.get("cartId"));
       return Carts.find();
   },
    'itemList':function(){
        var itemList = ItemList.find().fetch();
        var grandAmount =0;
        for(var i=0;i<itemList.length;i++){
            grandAmount +=itemList[i].itemTotalPrice*itemList[i].itemQuantity;
        }
        Session.set("grandTotalAmount",grandAmount);
        return itemList;
    },
    'grandTotalAmount':function(){
        return Session.get("grandTotalAmount");
    },
    'currentShowingPageTemplate':function(){

        return Session.get('customerCurrentPage');
    }




});



Template.CustomerSubOrderBodyTemplate.rendered = function(){
    //these are set when the user first registers into the system
    //these sessions are set when the customer logs in
    if(Meteor.userId()) {
        var user = Meteor.user();
        //  console.log(user);
        // set the value for the order page to be populated withe values
        Session.set("orderSelectCompany", user.profile.company_id);
        Session.set("orderPersonalName", user.profile.personalName);
        Session.set("orderPhoneNumber", user.username);
        Session.set("orderEmail", user.profile.email);


        $("#orderSelectCompany").val(Session.get("orderSelectCompany"));
        $("#orderPersonalName").val(Session.get("orderPersonalName"));
        $("#orderPhoneNumber").val(Session.get("orderPhoneNumber"));
        $("#orderEmail").val(Session.get("orderEmail"));
    }
}


Template.CustomerSubOrderBodyTemplate.helpers({
    'companies':function(){
        return Companies.find();
    }
});


Template.CustomerAllOrderBodyTemplate.helpers({

    'orders':function(){
         var orders = Orders.find({userId:Meteor.userId()},{sort: {created_at: -1}}).fetch().reverse();
           // console.log(orders);
           // console.log("Afterr");
            for(var i=0;i<orders.length;i++){
                var itemList =[];
               // console.log();
                var cart = Carts.find({_id:orders[i].cartId}).fetch()[0];

               //console.log(cart);
               var itemListIds = cart.itemListIds;
               // console.log(itemListIds);
                for(var j=0;j<itemListIds.length;j++){
                   // console.log(itemListIds[i]);
                   //itemList["item"] = ItemList.find({_id:itemListIds[i]}).fetch()[0];
                    itemList.push(ItemList.find({_id:itemListIds[j]}).fetch()[0]);
                }
                var itemListObject = {};
                itemListObject["itemList"] = itemList;
                orders[i] = $.extend(orders[i],itemListObject);

                var user = Meteor.users.findOne({_id:orders[i].userId});
                //console.log(user.profile.company_id);
                var company = Companies.find({_id:user.profile.company_id}).fetch()[0];
                var userDetails = {
                    companyName : company.name,
                    companyLocation:company.location,
                    userName:user.profile.personalName,
                    userPhone:user.username
                };
                var userDetailsObject = {};
                userDetailsObject["userDetails"] = userDetails;
                orders[i] = $.extend(orders[i],userDetailsObject);


            }



           // console.log(orders);

            return orders;

    }

});


/*When the user fisrt arrives on the /order page, show him customer login page */
Template.CustomerOrderBodyTemplate.created=function(){
        if(!Meteor.userId()){
            Session.set('customerCurrentPage','CustomerLoginTemplate') ;
        }



};



