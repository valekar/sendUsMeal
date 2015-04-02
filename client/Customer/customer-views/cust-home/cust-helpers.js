/*Retrieve all the items listed to the body template of customer*/
Template.CustomerBodyTemplate.helpers({
    northItems:function(){
        //console.log(items);
        return getItems("iFnMCTQcYo7mrSHfD");
    },
    southItems:function(){
        return getItems("2pCR9hvpc3SdaSNe7");
    }
});


//return the items based upon the category id passed
function getItems(categoryId){
    var items = Items.find().fetch();
    var returningItems = [];
    //var NorthCategory = Categories.find({_id:"iFnMCTQcYo7mrSHfD"}).fetch();
    for(var i = 0;i<items.length;i++){
        //hard coded north category Id
        if(items[i].itemCategoryId==categoryId) {
            //check if the media is associated with the item
            if (items[i].itemMediaId != null) {
                var url = Medias.find({_id: items[i].itemMediaId}).fetch()[0].url();
                // console.log(url);
                var obj = {url: url};
                returningItems[i] = $.extend(items[i], obj);
            }
        }
    }
    return returningItems;
}

