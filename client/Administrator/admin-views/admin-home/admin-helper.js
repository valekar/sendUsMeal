/*Check if the user is admin or check if the admin exists in the table */
Template.AdminBodyLoginTemplate.helpers({
   'noUser':function(){
       if(typeof Admin.findOne() == 'undefined'){
           return true;
       }
       else {
           return false;
       }
   }

});
/*A helper method used to display the template that is there in the session*/
/*This is the main functionality for the whole admin part*/
Template.adminLoggedInTemplate.helpers({
    'currentShowingPageTemplate':function(){
        return Session.get("currentPage");
    }
});

/*When the user logs into the system*/
Template.adminLoggedInTemplate.rendered = function(){
    /*Autmatically show the Items page*/
    $("#orders").trigger('click');

    $('ul.nav-pills li a').click(function (e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    });



}