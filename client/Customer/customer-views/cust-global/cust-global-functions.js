//return the items based upon the category id passed
getItems = function(categoryId){
    var items = Items.find().fetch();
    var returningItems = [];
    // if j is not usd the then the returning array will store the values of i
    var j=0;
    //var NorthCategory = Categories.find({_id:"iFnMCTQcYo7mrSHfD"}).fetch();
    for(var i = 0;i<items.length;i++){
        //hard coded north category Id
        if(items[i].itemCategoryId==categoryId) {
            //check if the media is associated with the item
            if (items[i].itemMediaId != null) {
                var url = Medias.find({_id: items[i].itemMediaId}).fetch()[0].url();
                // console.log(url);
                var obj = {url: url};
                returningItems[j] = $.extend(items[i], obj);
                j++;
            }
        }
    }
    return returningItems;
}

