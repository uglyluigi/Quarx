import {validate_objid_and_respond} from "./common"

const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = require('../../models/blog-post.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const empty = require('is-empty');
const axios = require('axios');
const passport = require('passport');

/**
 * Router for POST requests at /api/blog-posts/
 */
router.post('/', passport.authenticate('jwt', {session: false}), (request, response) => {
    const title = request.body.title;
    const body = request.body.body;
    const images = request.body.images;
    const new_blog_post = new BlogPost({title: title, body: body, images: images, hidden: false});

    new_blog_post
        .save()
        .then(() => {
            response.status(201).json({message: "Post successfully created."})
        }, (err) => {
            let errors = [];
            let err_i = 0;

            for (let error in err.errors) {
                let jobj_err = err.errors[error];
                errors[err_i++] = error + ' error: ' + jobj_err.message;
            }

            response.status(400).json({err: errors});
        });

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
        BlogPost
            .find({})
            .then((docs, err) => {
                if (err) {
                    console.log(err);
                    response.status(500).json({err: err});
                } else {
                    if (docs.length === 0) {
                        response.status(200).json({message: "There are currently no posts."});
                    } else {
                        response.status(200).json({posts: docs});
                    }
                }
            });
    } else {
        response.status(400).json({message: "GET ALL requests need a true get_all query parameter."})
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

    BlogPost
        .findOne({_id: ObjectId(postId)})
        .then((docs, err) => {
            if (err) {
                console.log(err);
                response.status(500).json({err: err});
            } else {
                if (docs) {
                    response.status(200).json({post: docs});
                } else {
                    response.status(404).json({message: "No post in the database has that ID."});
                }
            }
        });

    return response;
});

/**
 * Router for DELETE requests at /api/blog-posts/:postId
 */
router.delete('/:postId', passport.authenticate('jwt', {session: false}), (request, response) => {
    const postId = request.params.postId;

    if (!validate_objid_and_respond(response, postId)) {
        return response;
    }

    BlogPost
        .updateOne({_id: ObjectId(postId)}, {$set: {hidden: true}})
        .then((docs, err) => {
            if (err) {
                response.status(500).json({err: err});
            } else {
                response.status(200).json({message: `Post ${postId} hidden.`});
            }
        });

    return response;
});

/**
 * Router for PUT requests at /api/blog-posts/:postId
 */
router.put('/:postId', passport.authenticate('jwt', {session: false}), (request, response) => {
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
        return response.sendStatus(304);
    }

    BlogPost
        .updateOne({_id: ObjectId(postId)}, {$set: doc})
        .then((docs, err) => {
            if (err) {
                console.log(err);
                response.status(500).json({err: err});
            } else {
                if (docs.n === 0) {
                    response.status(404).json({message: "That post does not exist in the DB."});
                } else if (docs.nModified === 0) {
                    response.sendStatus(304);
                } else if (docs.n === 1 && docs.nModified === 1) {
                    response.sendStatus(200);
                }
            }
        });

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

