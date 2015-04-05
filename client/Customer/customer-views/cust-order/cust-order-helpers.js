Template.CustomerOrderBodyTemplate.helpers({
   'customerOrder':function(){
       console.log(Session.get("cartId"));
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
    'companies':function(){
        return Companies.find();
    }
});