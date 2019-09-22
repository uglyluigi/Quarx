import {DB_URI, DB_CLUSTER_NAME, BLOG_COLLECTION_NAME, MDB_CLIENT_OPS} from "../../constants";
import {produce_update_response, validate_objid_and_respond, handle_mongo_error, handle_unauthorized_api_call} from "./common"

const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = require('../../models/blog-post.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const empty = require('is-empty');
const axios = require('axios');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/**
 * TODO:
 * * Add auth (passport probably)
 */

/**
 * Router for POST requests at /api/blog-posts/
 */
router.post('/', (request, response) => {
    console.log("POST request received");

    if (handle_unauthorized_api_call(request, response)) {
        return response;
    }

    const title = request.body.title;
    const body = request.body.body;
    const images = request.body.images;

    if (!title || !body || !images) {
        return response.status(400).json({message: "Your blog post must contain a title, body, and array of images (even if it's empty).", sorry: false});
    }

    MongoClient.connect(DB_URI, MDB_CLIENT_OPS)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .insert({title: title, body: body, images: images, hidden: false})
                .then(out => response.status(201).json({message: "Success", post: out.ops}))
                .then(() => connection.close());
        })
        .catch(err => handle_mongo_error(response, err));

    return response;
});

/**
 * Router for GET requests at /api/blog-posts/
 * Express does not offer explicit GET ALL support, so this acts in its place
 * Does not return anything unless the request contains a query parameter like this:
 * ?all=true
 */
router.get('/', (request, response) => {
    const get_all = request.query['all'];

    if (get_all) {
        console.log("GET (ALL) request received");

        MongoClient.connect(DB_URI, MDB_CLIENT_OPS)
            .then(connection => {
                connection
                    .db(DB_CLUSTER_NAME)
                    .collection(BLOG_COLLECTION_NAME)
                    .find()
                    .toArray()
                    .then(all_posts => response.status(200).json(all_posts))
                    .then(() => connection.close());
            })
            .catch(err => handle_mongo_error(response, err));
    } else {
        response.status(400).json({message: "Your GET request is being made at the root URI but does not contain the proper body."})
    }

    return response;
});

/**
 * Router for GET requests at /api/blog-posts/:postId
 */
router.get('/:postId', (request, response) => {
    const postId = request.params.postId;

    //Respond with 'bad request' if the post ID they're trying to GET doesn't meet MongoDB's requirements.
    if (!validate_objid_and_respond(response, postId)) {
        return response;
    }

    MongoClient.connect(DB_URI, MDB_CLIENT_OPS)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .findOne({_id: ObjectId(postId)})
                .then(out => {
                    if (out != null) {
                        response.status(200).json(out);
                    } else {
                        response.status(404).json({
                            message: `Post with ID ${postId} does not exist in this DB.`,
                            sorry: true
                        });
                    }
                })
                .then(() => connection.close())
                .catch(err => handle_mongo_error(response, err));
        });

    return response;
});

/**
 * Router for DELETE requests at /api/blog-posts/:postId
 */
router.delete('/:postId', (request, response) => {
    const postId = request.params.postId;

    if (!validate_objid_and_respond(response, postId)) {
        return response;
    }

    MongoClient.connect(DB_URI, MDB_CLIENT_OPS)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .updateOne({_id: ObjectId(postId)}, {$set: {hidden: true}})
                .then(out => produce_update_response(response, out, postId))
                .then(() => connection.close());
        }).catch(err => handle_mongo_error(response, err));

    return response;
});

/**
 * Router for PUT requests at /api/blog-posts/:postId
 */
router.put('/:postId', (request, response) => {
    console.log("PUT to /blog-posts");
    const postId = request.params.postId;

    const new_title = request.body.title;
    const new_body = request.body.body;
    const new_images = request.body.images;
    const new_hidden = request.body.hidden;

    let doc = {};

    if (!validate_objid_and_respond(response, postId)) {
        return response;
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

    MongoClient.connect(DB_URI, MDB_CLIENT_OPS)
        .then(connection => {
            connection
                .db(DB_CLUSTER_NAME)
                .collection(BLOG_COLLECTION_NAME)
                .updateOne({_id: ObjectId(postId)}, {$set: doc})
                .then(out => produce_update_response(response, out, postId))
                .then(() => connection.close());
        })
        .catch(err => handle_mongo_error(response, err));

    return response;
});

/**
 * Router for PUT requests at /api/blog-posts/
 * Simply redirects to the POST router at /api/blog-posts/ and returns the response
 */
router.put('/', (request, response) => {
    axios.post('/api/blog-posts', request.body)
        .then(response2 => response.status(response2.status).json(response2.data))
        .catch(err => response.status(err.response.status).json(err.response.data));
    return response;
});

module.exports = router;

