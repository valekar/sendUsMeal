/*show all the medias that are available in the system*/
Template.MediaIndexTemplate.events({
   'click #goToAddMedia':function(event,templ){
       event.preventDefault();
       Session.set("currentPage","newMediaTemplate");
   },
    'click #removeMedia':function(event,templ){
        var mediaId = $('input[name=ItemMediaCheckbox]:checked').val();
       // alert(mediaId);
        if(mediaId == null){
            alert("select any one media");
            return;
        }

        if(window.confirm("Are you sure?")){
            var attrs = {
                mediaId:mediaId,
                userId:Meteor.userId()
            }
            Meteor.call("removeMedia",attrs,function(err){
                if(err){
                    alert("couldn't remove");
                }
            });
        }


    }
});

/*Add new photo to the system*/
Template.newMediaTemplate.events({
    'click #uploadMedia':function(e,templ){
        //  var url = $('fileMe').val();

        var file = $('#fileMe')[0].files[0];
        if(file == null){
            alert("Choose a photo from your system");
            return;
        }

        var fileObj = new FS.File(file);




        //console.log(fileObj);
        /*This has to be inserted on the client side because the FS collection doesn't allow you to add on the server side*/
        Medias.insert(fileObj,function (err, fileObj) {
            if(err){
                alert("couldn't insert the media");
            }else {
                Session.set("currentPage","MediaIndexTemplate");
            }
        });
    }
});