import {DB_URI, DB_CLUSTER_NAME, BLOG_COLLECTION_NAME, EMS_COLLECTION_NAME} from "../../constants";
import produce_update_response from "./common"

const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = require('../../models/blog-post.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const empty = require('is-empty');


//Router for POST requests @ quarx.com/api/blog-posts/

router.post('/', (request, response, next) => {
    //TODO add authentication
    console.log("POST request received");

    const title = request.body.title;
    const body = request.body.body;
    const images = request.body.images;

    if (!title || !body || !images) {
        return response.status(400).json({message: "Your blog post must contain a title, body, and array of images (even if it's empty).", sorry: false});
    }

    MongoClient.connect(DB_URI)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .insert({title: title, body: body, images: images, hidden: false})
                .then(out => response.status(201).json({message: "Post successfully POSTed (xd)", post: out.ops}))
                .then(() => connection.close());
        });

    return response;
});

//Router for GET requests with a JSON body containing "get_all": true @ /api/blog-posts/

router.get('/', async (request, response, next) => {
    const get_all = request.body.get_all;

    if (get_all) {
        console.log("GET (ALL) request received");

        MongoClient.connect(DB_URI)
            .then(connection => {
                connection
                    .db(DB_CLUSTER_NAME)
                    .collection(BLOG_COLLECTION_NAME)
                    .find()
                    .toArray()
                    .then(all_posts => response.status(200).json(all_posts))
                    .then(() => connection.close());
            })
    } else {
        response.status(400).json({message: "Your GET request is being made at the root URI but does not contain the proper body."})
    }



    return response;
});

//Router for GET requests that provide a specific post ID to retrieve

router.get('/:postId', async (request, response, next) => {
    const postId = request.params.postId;

    //Respond with 'bad request' if the post ID they're trying to GET doesn't meet MongoDB's requirements.
    if (!ObjectId.isValid(postId)) {
        return response.status(400).json({message: `The provided ID \'${postId}\' is not a valid DB object ID.`, sorry: false})
    }

    MongoClient.connect(DB_URI)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .findOne({_id: ObjectId(postId)})
                .then(out => {
                    if (out != null) {
                        response.status(200).json(out);
                    } else {
                        response.status(404).json({message: `Post with ID ${postId} does not exist in this DB.`, sorry: true});
                    }
                }, err => {
                    console.log("Error connecting to mongo: " + err);
                    response.status(500).json({message: "Something weird happened when communicating with MongoDB.", sorry: true});
                })
                .then(() => connection.close());
        });

    return response;
});

//Router for DELETE requests that provide a specific post ID to delete

router.delete('/:postId', async (request, response, next) => {
    //TODO implement deletes, probably just end up updating a field in the post instead
    //of removing it from the DB

    const postId = request.params.postId;

    if (!ObjectId.isValid(postId)) {
        return response.status(400).json({message: `The provided ID \'${postId}\' is not a valid DB object ID.`});
    }

    MongoClient.connect(DB_URI)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .updateOne({_id: ObjectId(postId)}, {$set: {hidden: true}})
                .then(out => produce_update_response(response, out, postId))
                .then(() => connection.close())
        });

    return response;
});

router.put('/:postId', (request, response, next) => {
    console.log("PUT to /blog-posts");
    const postId = request.params.postId;

    const new_title = request.body.title;
    const new_body = request.body.body;
    const new_images = request.body.images;
    const new_hidden = request.body.hidden;

    let doc = {};

    if (!ObjectId.isValid(postId)) {
        return response.status(400).json({message: `The provided ID \'${postId}\' is not a valid DB object ID.`});
    }

    if (new_title) {
        doc['title'] = new_title;
    }

    if (new_body) {
        doc['body'] = new_body;
    }

    if (new_images) {
        doc['images'] = new_images;
    }

    if (new_hidden) {
        doc['hidden'] = new_hidden;
    }

    if (empty(doc)) {
        return response.status(304).json({message: "Your PUT request doesn\'t attempt to update anything."});
    }

    MongoClient.connect(DB_URI)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .updateOne({_id: ObjectId(postId)}, {$set: doc})
                .then(out => produce_update_response(response, out, postId))
                .then(() => connection.close())
        });

    return response;
});

module.exports = router;

