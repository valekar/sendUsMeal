
Router.map(function(){
    /*Article mapping /article/123*/
    this.route("/adminHome.htm",{

        waitOn:function(){
            if(Meteor.userId()) {
            return [
              Meteor.subscribe("Items", Meteor.userId()),
              Meteor.subscribe("Categories",Meteor.userId()),
              Meteor.subscribe('Medias')
          ]}
            else return;
        },
        onBeforeAction:function(){

            if(!Meteor.userId()) {
               // console.log("User rediecting to adminLogin.htm");
                this.redirect("/adminLogin.htm");
            }else {
                this.next();
            }
        },

        action:function(){
                this.render('adminHeaderTemplate', {to: 'headerAdminSection'});
                this.render('adminBodyTemplate', {to: 'bodyAdminSection'});
                this.render('adminFootTemplate', {to: 'footerAdminSection'});
                this.layout('AdministratorLayout');
        }
    }),
        this.route("/adminLogin.htm",{

            waitOn:function(){
              return [Meteor.subscribe('userCheck')]
            },

            onBeforeAction:function(){
                if(!Meteor.userId()) {
                  //  console.log("No user loggedin");
                   this.next();
                } else {
                  //  console.log("User rediecting to adminHome.htm");
                    this.redirect("/adminHome.htm");
                }
            },

            action:function(){

                    this.render('adminHeaderTemplate', {to: 'headerAdminSection'});
                    this.render('AdminBodyLoginTemplate', {to: 'bodyAdminSection'});
                    this.render('adminFootTemplate', {to: 'footerAdminSection'});
                    this.layout('AdministratorLayout');


            }

        }),
        this.route("/adminRegister.htm",{
            action:function(){

                this.render('adminHeaderTemplate',{to:'headerAdminSection'});
                this.render('AdminBodyRegistrationTemplate',{to:'bodyAdminSection'});
                this.render('adminFootTemplate',{to:'footerAdminSection'});
                this.layout('AdministratorLayout');
            }

        });

});




