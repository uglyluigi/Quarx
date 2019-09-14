import {DB_URI} from "../../constants";

const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = require('../../models/blog-post.model');


//Info:
// GET ALL requests behave like GET requests with this body:
//{
//  "get_all": true
//}
//All other GET requests must provide a post ID.
//


//Router for GET requests @ quarx.com/api/blog-posts/

var DBClient = require('mongodb').MongoClient;

DBClient.connect(DB_URI)
    .then(() => console.log("Blog posts API successfully connected to DB"))
    .catch(err => console.log(`Error while connecting blog post api to DB:\n${err}`));

router.post('/', (request, response, next) => {
    console.log("POST request received");

    const title = request.body.title;
    const body = request.body.body;
    const post = new BlogPost({title, body});

    return post.save()
        .then(() => response.json({post: post.toJSON()}))
        .catch(next);
});

router.get('/', (request, response, next) => {
    const get_all = request.body.get_all;

    if (get_all) {
        console.log("GET (ALL) request received");
        return response.json({success: true});
    }

    return response.json({success: false});
});

router.get('/:postId', (request, response, next) => {
    let info = ``;

    console.log("GET (id) request received.");
    console.log(`Searching DB ${DB_URI} for object with ID ${request.params.postId}`);

    var db = DBClient.db("test");
    db.collection("blog-posts");



    const get_all = request.body.get_all;

    if (get_all) {
        info += `Note: this GET request has the body of what this API considers a GETALL request. It will be ignored.`;
    }

    return response.status(404).json({success: false, info: info});
});

router.delete('/:postId', (request, response, next) => {
    console.log("DELETE request received");
});

module.exports = router;

