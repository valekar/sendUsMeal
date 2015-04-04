Template.CustomerNorthIndianBodyTemplate.events({
    'click #addNorthFood':function(event,templ){
        //get the current item{ID}Quantity
        // this is set in the rendered template (CustomerNorthIndianBodyTemplate)
        Session.set("item"+this._id+"Quantity",Session.get("item"+this._id+"Quantity")+1);

        var quantity = Session.get("item"+this._id+"Quantity");
        var object = this;
        //defined in the router waitOn method
        var currentSessionId = Session.get("currentSessionId");
        upsertIntoItemList(object,quantity,currentSessionId);
    },
    'click #removeNorthFood':function(event,templ){
        //get the current item{ID}Quantity
        // this is set in the rendered template (CustomerNorthIndianBodyTemplate)
        //update only if the value of the current item{ID}Quantity is not equal to zero
        if(Session.get("item"+this._id+"Quantity")!=0){
            Session.set("item"+this._id+"Quantity",Session.get("item"+this._id+"Quantity")-1);
        }


        var quantity = Session.get("item"+this._id+"Quantity");
        var object = this;
        //defined in the router waitOn method
        var currentSessionId = Session.get("currentSessionId");
        upsertIntoItemList(object,quantity,currentSessionId);
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
}