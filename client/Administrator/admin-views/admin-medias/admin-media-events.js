Template.MediaIndexTemplate.events({
   'click #goToAddMedia':function(event,templ){
       event.preventDefault();
       Session.set("currentPage","newMediaTemplate");
   }
});

Template.newMediaTemplate.events({
    'click #uploadMedia':function(e,templ){
        //  var url = $('fileMe').val();

        var file = $('#fileMe')[0].files[0];
        if(file){
            console.log(file.name);
        }

        var fileObj = new FS.File(file);

        console.log(fileObj);

        Medias.insert(fileObj,function (err, fileObj) {

        });
    }
});