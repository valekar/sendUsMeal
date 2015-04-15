Template.CustomerHeaderTemplate.rendered = function(){
    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    Session.set('customerCurrentPage','CustomerLoginTemplate');

}


Template.CustomerHeaderTemplate.helpers({
   'currentShowingPageTemplate':function(){
       return Session.get('customerCurrentPage');
   }
});

Template.CustomerRegisterTemplate.helpers({
    'companies':function(){
        return Companies.find();
    }
});
