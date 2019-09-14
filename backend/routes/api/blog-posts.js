import {DB_URI} from "../../constants";

const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = require('../../models/blog-post.model');
const ObjectId = require('mongodb').ObjectID;


const MongoClient = require('mongodb').MongoClient;

//Info:
// GET ALL requests behave like GET requests with this body:
//{
//  "get_all": true
//}
//All other GET requests must provide a post ID.
//


//Router for GET requests @ quarx.com/api/blog-posts/


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

    MongoClient.connect(DB_URI, function (err, client) {
        if (err) throw err;

        var db = client.db('test');
        db.collection('blog-posts').find({_id : ObjectId(request.params.postId)}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });

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

