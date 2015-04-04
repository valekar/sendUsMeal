/*Retrieve all the items listed to the body template of customer*/
Template.CustomerNorthIndianBodyTemplate.helpers({

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
    }
});


Template.CustomerNorthIndianBodyTemplate.rendered = function() {
    // got this data from router

    var items = this.data && this.data.northItemsFromRoute;
   // console.log(items);
    for(var i=0;i<items.length;i++){
        Session.set("item"+items[i]._id+"Quantity",0);
        Session.set("item"+items[i]._id+"",0);
       // console.log("item"+items[i]._id+"Quantity");
    }


    $("#myScrollspy").affix({
        offset: {
            top: 330
        }
    });

    $("#myNavSpy").affix({
        offset: {
            top: 335
        }
    });

};

/*$("#myNav ul li a[href^='#']").on('click', function(e) {

    // prevent default anchor click behavior
    e.preventDefault();

    // animate
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 300, function(){

        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = this.hash;
    });

});*/


