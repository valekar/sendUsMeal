Router.onBeforeAction('loading');
Router.map(function(){

    this.route("/",{
        waitOn:function(){

          return [
              Meteor.subscribe('CustomerItems'),
              Meteor.subscribe('CustomerMedias')
          ]
        },
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
                    Meteor.subscribe('CustomerMedias'),
                    Meteor.subscribe('CustomerItemList',Session.get("currentSessionId"))
                ]
            },
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
        this.route("/order",{
            waitOn:function(){
              return [
                  Meteor.subscribe('CustomerCartOrder',Session.get("cartId")),
                  Meteor.subscribe('CustomerItemList',Session.get("currentSessionId")),
                  Meteor.subscribe('Companies')

              ]
            },
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

                    Meteor.subscribe('CustomerOrders')


                ]
            },
            action:function(){
                /*show the adminHome.htm page*/
                this.render('CustomerHeaderTemplate', {to: 'headerSection'});
                this.render('CustomerAllOrderBodyTemplate', {to: 'bodySection'});
                this.render('CustomerFooterTemplate', {to: 'footerSection'});
                this.layout('CustomerLayout');
            }
        })


});