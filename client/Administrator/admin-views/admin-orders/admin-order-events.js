Template.AdminOrdersIndexTemplate.events({
    'click #orderDelivered':function(e,templ){
        e.preventDefault();

        if(window.confirm("Has order been delivered?")){
            var attrs = {
                id:Meteor.userId(),
                orderId:this._id
            }
            if(Meteor.userId()){
                Meteor.call('orderDelivered',attrs,function(err,res){
                    if(err){
                        sweetAlert("Could not do the operation");
                    }
                    else {
                    }
                })
            }
        }


    }, 'click #orderPending':function(e,templ){
        e.preventDefault();

        if(window.confirm("Are you sure? Do you really want make it a pending order?")){
            var attrs = {
                id:Meteor.userId(),
                orderId:this._id
            }
            if(Meteor.userId()){
                Meteor.call('orderPending',attrs,function(err,res){
                    if(err){
                        sweetAlert("Could not do the operation");
                    }
                    else {
                    }
                })
            }
        }


    }
});