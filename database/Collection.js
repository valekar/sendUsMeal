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
    stores: [new FS.Store.FileSystem("medias", {path: "~/projectMedias"})]
});
/**************************/

