/*Retrieve all the items listed to the body template of customer*/
Template.CustomerSouthIndianBodyTemplate.helpers({
    southItems:function(){
        //get items is a global func defined in cust-global
        //passing south Indian category Id
        return getItems(Properties.SouthIndianCategoryId);
    }
});


