Template.AdminOrdersIndexTemplate.helpers({
   'orders':function(){
       var orders = Orders.find({created_at:moment().format('MMMM Do YYYY')},{sort: {created_at: -1}}).fetch();
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
            //console.log(orders[i].userId);
           var user = Meteor.users.findOne({_id:orders[i].userId});
           //console.log(user);
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