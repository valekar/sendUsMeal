Template.CustomerOrderBodyTemplate.helpers({
   'customerOrder':function(){
       //console.log(Session.get("cartId"));
       return Carts.find();
   },
    'itemList':function(){
        var itemList = ItemList.find().fetch();
        var grandAmount =0;
        for(var i=0;i<itemList.length;i++){
            grandAmount +=itemList[i].itemTotalPrice;
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

Template.CustomerRegisterTemplate.helpers({
    'companies':function(){
        return Companies.find();
    }
});


Template.CustomerSubOrderBodyTemplate.rendered = function(){
    //these are set when the user first registers into the system
    //these sessions are set when the customer logs in
    $("#orderSelectCompany").val(Session.get("orderSelectCompany"));
    $("#orderPersonalName").val(Session.get("orderPersonalName"));
    $("#orderPhoneNumber").val(Session.get("orderPhoneNumber"));
    $("#orderEmail").val(Session.get("orderEmail"));
}


Template.CustomerSubOrderBodyTemplate.helpers({
    'companies':function(){
        return Companies.find();
    }
});


Template.CustomerAllOrderBodyTemplate.helpers({

    'orders':function(){
         var orders = Orders.find({userId:Meteor.userId()},{sort: {date_created: -1}});
            console.log(orders.fetch());
            return orders;

    }

});


/*When the user fisrt arrives on the /order page, show him customer login page */
Template.CustomerOrderBodyTemplate.created=function(){
        if(!Meteor.userId()){
            Session.set('customerCurrentPage','CustomerLoginTemplate') ;
        }



};



