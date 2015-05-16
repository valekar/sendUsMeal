Template.CustomerHandPickedBodyTemplate.events({
    'click #addNorthFood':function(event,templ){
        //get the current item{ID}Quantity
        // this is set in the rendered template (CustomerHandPickedBodyTemplate)
        Session.set("item"+this._id+"Quantity",Session.get("item"+this._id+"Quantity")+1);

        $("#orderAlert").popover('show');


        var quantity = Session.get("item"+this._id+"Quantity");
        var object = this;
        //defined in the router waitOn method
        var currentSessionId = Session.get("currentSessionId");
        upsertIntoItemList(object,quantity,currentSessionId);
        callTimeOut();
    },
    'click #removeNorthFood':function(event,templ){

        var quantity = Session.get("item"+this._id+"Quantity");
        var object = this;
        //defined in the router waitOn method
        var currentSessionId = Session.get("currentSessionId");

        //get the current item{ID}Quantity
        // this is set in the rendered template (CustomerNorthIndianBodyTemplate)
        //update only if the value of the current item{ID}Quantity is not equal to zero
        if(Session.get("item"+this._id+"Quantity")!=0){
            Session.set("item"+this._id+"Quantity",Session.get("item"+this._id+"Quantity")-1);
            upsertIntoItemList(object,quantity,currentSessionId);
        }
        else {
            //remove the item from the itemlist if the item{itemID}Quantity is 0
            deleteFromItemList(object,currentSessionId);
        }
    },

    'click #orderFood':function(){
        var currentSessionId = Session.get("currentSessionId");
        var attrs = {
            currentSessionId:currentSessionId,
            grandTotal:Session.get("grandTotalAmount")
        }
        Meteor.call("insertCart",attrs,function(err,result) {
            if (err) {
                alert("Couldn't process your orders");
            }
            else {
                //this is used in cust-order.html page
                Session.set("cartId",result);
                Router.go("/order");
               // alert(result);
            }

        });
    },
    'click #clear':function(e,templ){
         e.preventDefault();
    //Session.keys = {};
        location.reload();
}
});


// method to insert/update the ItemList
upsertIntoItemList = function(object,quantity,currentSessionId){
    var attr = {
        //this is used so that for every new new a new Itemlist is entered instead of updating the previous itemlist
        currentSessionId:currentSessionId,
        itemId:object._id,
        itemQuantity:quantity,
        itemTotalPrice:object.price*quantity,
        itemName:object.name

    };

    Meteor.call('insertItemList',attr,function(err,result){
        if(err){
            alert("Couldn't add the item to the cart");
        }
    });
};


deleteFromItemList = function(object,currentSessionId){
  var attr = {
      itemId : object._id,
      currentSessionId:currentSessionId
  }


    Meteor.call('deleteItemList',attr ,function(err,result){
       if(err){
           alert("Couldnt remove");
       }
    });

};

function callTimeOut(){
    setTimeout(function(){
        $("#orderAlert").popover('hide');
    }, 700);
}