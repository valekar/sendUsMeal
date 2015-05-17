/*This has been added for the admin
 By doing so we are restricting the outsiders to only get the admin boolean value
 We are not storing any id , so when we call Meteror.users() on the client side this will be restricted
 All I want to say is that we are not allowing outsiders to get the user details*/
Admin = new Mongo.Collection("admin");

/*Items stored in the table*/
Items = new Mongo.Collection("items");

/*Category table*/
Categories = new Mongo.Collection("categories");




/**************************/
Medias = new FS.Collection("medias", {
    stores: [new FS.Store.FileSystem("medias",
        {
            beforeWrite: function(fileObj) {
                // We return an object, which will change the
                // filename extension and type for this store only.
                return {
                    extension: 'png',
                    type: 'image/png'
                };
            },
            path: "~/projectMedias",
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 30x10px thumbnail
                //gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);
                gm(readStream).resize(350,350).stream('PNG').pipe(writeStream);
            }
        }
    )],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }

    /* new FS.Store.FileSystem("thumbs", {
     transformWrite: function(fileObj, readStream, writeStream) {
     // Transform the image into a 30x10px thumbnail
     gm(readStream, fileObj.name()).resize('200', '150').stream().pipe(writeStream);
     },
     path: "~/projectMedias"

     })*/
});
/**************************/

ItemList = new Mongo.Collection("itemList");

Carts = new Mongo.Collection('carts');

Companies = new Mongo.Collection('companies');


Orders = new Mongo.Collection('orders');

Feedbacks = new Mongo.Collection('feedBacks');