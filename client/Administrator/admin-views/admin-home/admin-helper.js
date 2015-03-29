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

Template.adminLoggedInTemplate.helpers({
    'myTemplate':function(){
        return Session.get("currentPage");
    }
});


Template.adminLoggedInTemplate.rendered = function(){
    $("#categories").trigger('click');

    $('ul.nav-pills li a').click(function (e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    });



}