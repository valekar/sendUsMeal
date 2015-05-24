Meteor.methods({
   'sendEmailToUsers':function(attr){
       var mycustomer = new Mailgun(MailOptions);
       mycustomer.send({
           'to': attr.toEmailId,
           'from':  'no-reply@mybitefood.in',
           'bcc':'srinivas.valekar@gmail.com',
           'html': Handlebars.templates['mail-general-template']({message:attr.message}),
           //'text': 'This is a test',
           'subject': attr.subject,
           'tags': [
               'some',
               'test',
               'tags'
           ]
       });
   }
});