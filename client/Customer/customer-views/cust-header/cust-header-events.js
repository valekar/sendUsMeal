Template.CustomerHeaderTemplate.events({
    'click #customerLogout':function(e,templ){
        Meteor.logout(function(err) {
            if(err){
                alert("Couldn't logout");
            }else {
                Router.go("/")
            }
        });
    }
})