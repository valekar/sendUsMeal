Admin = new Mongo.Collection("admin");

Items = new Mongo.Collection("items");

Categories = new Mongo.Collection("categories");

/**************************/
Medias = new FS.Collection("medias", {
    stores: [new FS.Store.FileSystem("medias", {path: "~/projectMedias"})]
});
/**************************/

