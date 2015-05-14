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
    },
    'showOrderButton':function(){

        var len = ItemList.find().fetch().length;
        if(len<=0){
            return false;
        }
        else{
            return true;
        }

    },

    'companies':function(){
        return Companies.find();
    }



});


Template.CustomerNorthIndianBodyTemplate.rendered = function() {
    /**
     *
     * this is used to remove & delete the items from the session cart
     */
    // got this data from router
    var items = this.data && this.data.northItemsFromRoute;
   // console.log(items);
    for(var i=0;i<items.length;i++){
        Session.set("item"+items[i]._id+"Quantity",0);
        Session.set("item"+items[i]._id+"",0);
       // console.log("item"+items[i]._id+"Quantity");
    }
    /**
     * this is used to affix the cart if the user scrolls down
     */

    $("#myScrollspy").affix({
        offset: {
            top: 200
        }
    });


    var $affix = $("#myScrollspy"),
        $parent = $affix.parent(),
        resize = function() { $affix.width($parent.width()); };
    $(window).resize(resize);
    resize();

    /**
     * used to hide/show the Order button
     */
    Session.set("NoOfItemListInCart",this.data.northItemsFromRoute.length);
    if(!Meteor.user() && Session.get("deliveredPlaces") != true){
        //used to alert the user when he clicks on the north indian food items
        $("#deliveredPlaces").modal('show');
        Session.set("deliveredPlaces",true);
    }

    var $container = $('#isotope-container');
    // init
    $container.isotope({
        // set columnWidth a fraction of the container width


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


