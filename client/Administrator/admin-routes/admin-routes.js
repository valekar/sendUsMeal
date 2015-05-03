
Router.map(function(){
    /*AdminHome.html page route*/
    this.route("/adminHome.htm",{

        waitOn:function(){
            /*subscribe only if user has been logged in */
            if(Meteor.userId()) {
            return [
              Meteor.subscribe("Items", Meteor.userId()),
              Meteor.subscribe("Categories",Meteor.userId()),
              Meteor.subscribe('Medias',Meteor.userId()),
              Meteor.subscribe("Companies",Meteor.userId()),
              Meteor.subscribe("Orders",Meteor.userId()),
              Meteor.subscribe('ItemList',Meteor.userId()),
              Meteor.subscribe('Carts',Meteor.userId()),
              Meteor.subscribe('Users',Meteor.userId())
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
                /*show the adminHome.htm page*/
                this.render('adminHeaderTemplate', {to: 'headerAdminSection'});
                this.render('adminBodyTemplate', {to: 'bodyAdminSection'});
                this.render('adminFootTemplate', {to: 'footerAdminSection'});
                this.layout('AdministratorLayout');
        }
    }),
        /*Admin Login page*/
        this.route("/adminLogin.htm",{
            /*Check if the first user is available, if not make him admin by making him to register the application*/
            waitOn:function(){
              return [Meteor.subscribe('userCheck')]
            },
            /*check if the user has been logged in*/
            onBeforeAction:function(){
                if(Meteor.user()) {
                  //  console.log("No user loggedin");
                   //this.next();
                    this.redirect("/adminHome.htm");
                } else {
                  //  console.log("User rediecting to adminHome.htm");
                    this.next()
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
            waitOn:function(){
                return [Meteor.subscribe('userCheck')]
            },
            //onBeforeAction:function(){
                //check if atleast one user is there as the admin
                //if(!Admin.find()) {

                  //  this.next();
                //} else {
                    //  console.log("User rediecting to adminLogin.htm");
               //     this.redirect("/adminLogin.htm");
             //   }
           // },
            action:function(){

                this.render('adminHeaderTemplate',{to:'headerAdminSection'});
                this.render('AdminBodyRegistrationTemplate',{to:'bodyAdminSection'});
                this.render('adminFootTemplate',{to:'footerAdminSection'});
                this.layout('AdministratorLayout');
            }

        });

});




