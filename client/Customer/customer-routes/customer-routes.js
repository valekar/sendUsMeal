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
    });
});