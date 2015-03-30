/*Used to show all the  medias on the media-index.html page*/
Template.MediaIndexTemplate.helpers({
   'medias':function(){
       return Medias.find();
   }
});