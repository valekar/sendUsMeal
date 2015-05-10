Router.onBeforeAction('loading');
Router.map(function(){

    this.route("/",{
        waitOn:function(){

          return [
              Meteor.subscribe('CustomerItems'),
              Meteor.subscribe('CustomerMedias'),
              Meteor.subscribe('CustomerCompanies')
          ]
        },
        fastRender: true,
        action:function(){
            /*show the adminHome.htm page*/
            this.render('CustomerHeaderTemplate', {to: 'headerSection'});
            this.render('CustomerBodyTemplate', {to: 'bodySection'});
            this.render('CustomerFooterTemplate', {to: 'footerSection'});
            this.layout('CustomerLayout');
        }
    }),
        this.route("/south-indian",{
            waitOn:function(){
                return [
                    Meteor.subscribe('CustomerItems'),
                    Meteor.subscribe('CustomerMedias')
                ]
            },
            fastRender: true,
            cache:true,
            action:function(){
                /*show the adminHome.htm page*/
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('CustomerSouthIndianBodyTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        }),
        this.route("/north-indian",{
            waitOn:function(){

                Meteor.call("getSessionId", function(err, id) {
                    Session.set("currentSessionId",id);
                    //console.log(id);
                });


                return [
                    Meteor.subscribe('CustomerItems'),
                    Meteor.subscribe('CustomerCompanies'),
                    Meteor.subscribe('CustomerMedias'),
                    Meteor.subscribe('CustomerItemList',Session.get("currentSessionId"))
                ]
            },
            fastRender: true,
            data:function(){
                //get items is a global func defined in cust-global
                //passing north Indian category Id
                //properties file defined in Customer global
                tData ={
                        northItemsFromRoute:getItems(Properties.NorthIndianCategoryId)
                    };
                return tData;
            },
            action:function(){
                /*show the adminHome.htm page*/
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('CustomerNorthIndianBodyTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        }),

        this.route("/hand-picked-for-you",{
            waitOn:function(){

                Meteor.call("getSessionId", function(err, id) {
                    Session.set("currentSessionId",id);
                    //console.log(id);
                });


                return [
                    Meteor.subscribe('CustomerItems'),
                    Meteor.subscribe('CustomerCompanies'),
                    Meteor.subscribe('CustomerMedias'),
                    Meteor.subscribe('CustomerItemList',Session.get("currentSessionId"))
                ]
            },
            fastRender: true,
            data:function(){
                //get items is a global func defined in cust-global
                //passing north Indian category Id
                //properties file defined in Customer global
                tData ={
                    handPickedItemsFromRoute:getItems(Properties.HandPickedCategoryId)
                };
                return tData;
            },
            action:function(){
                /*show the adminHome.htm page*/
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('CustomerHandPickedBodyTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        }),


        this.route("/order",{
            waitOn:function(){
              return [
                  Meteor.subscribe('CustomerCartOrder',Session.get("cartId")),
                  Meteor.subscribe('CustomerItemList',Session.get("currentSessionId")),
                  Meteor.subscribe('CustomerCompanies')

              ]
            },
            fastRender: true,
            onBeforeAction:function(){
                //redirect the user to the north
                // indian items if nothing is present in the cart
               if(Session.get('grandTotalAmount') == null){
                   this.redirect('/north-indian');
               } else{
                   this.next();
               }

            }
            ,
            action:function(){
                /*show the adminHome.htm page*/
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('CustomerOrderBodyTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        }),
        this.route("/orders",{
            waitOn:function(){
                return [

                    Meteor.subscribe('CustomerOrders'),
                    Meteor.subscribe('CustomerCarts',Meteor.userId()),
                    Meteor.subscribe('CustomerOrderItemList'),
                    Meteor.subscribe('CustomerCompanies')

                ]
            },
            fastRender: true,
            action:function(){
                /*show the adminHome.htm page*/
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('CustomerAllOrderBodyTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        }),
        this.route("/about-us",{
           action:function(){
               this.render('CustomerHeaderTemplate', {to: 'headerSection'});
               this.render('AboutUsTemplate', {to: 'bodySection'});
               this.render('CustomerFooterTemplate', {to: 'footerSection'});
               this.layout('CustomerLayout');
           }
        }),
        this.route("/contact-us",{
            action:function(){
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('ContactUsTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        }),
        this.route("/feedback",{
            action:function(){
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('FeedBackTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        });


});

