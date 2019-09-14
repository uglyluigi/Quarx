import {DB_URI, USE_TEST_DB} from "../../constants";

const mongoose = require('mongoose');
const router = require('express').Router();
const BlogPost = require('../../models/blog-post.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;

//Info:
// GET ALL requests behave like GET requests with this body:
//{
//  "get_all": true
//}
//All other GET requests must provide a post ID.
//

//Helpful functions

//Query the blog post DB with the specified DOC
//Connections are closed at the end of each query
async function queryDB(doc) {
    const DB = USE_TEST_DB ? 'test' : 'quarx-blog-db';
    const COLLECTION = 'blog-posts';

    const connection = await MongoClient.connect(DB_URI, {useNewUrlParser: true}).catch(e => console.log("Error during DB query: "+ e));

    if (connection) {
        const db = await connection.db(DB).collection(COLLECTION);
        const query = await db.find(doc).toArray();

        return query;
    }

    connection.close();
    return null;
}

//Router for POST requests @ quarx.com/api/blog-posts/
//currently borked

router.post('/', (request, response, next) => {
    //TODO verify the contents of the post before saving to DB
    console.log("POST request received");

    const title = request.body.title;
    const body = request.body.body;
    const post = new BlogPost({title, body});

    return post.save()
        .then(() => response.json({post: post.toJSON()}))
        .catch(next);
});

//Router for GET requests with a JSON body containing "get_all": true @ /api/blog-posts/

router.get('/', async (request, response, next) => {
    const get_all = request.body.get_all;

    if (get_all) {
        console.log("GET (ALL) request received");
        const query_res = await queryDB({});

        return response.status(200).json(query_res);
    }

    return response.status(400).json({message: `GET ALL request must have a JSON body with field \"get_all\": true`, sorry: false});
});

//Router for GET requests that provide a specific post ID to retrieve

router.get('/:postId', async (request, response, next) => {
    const id = request.params.postId;

    //Respond with 'bad request' if the post ID they're trying to GET doesn't meet MongoDB's requirements.
    if (!ObjectId.isValid(id)) {
        return response.status(400).json({message: `The provided ID \'${id}\' is not a valid DB object ID.`, sorry: false})
    }

    const query_res = await queryDB({_id: ObjectId(id)});

    //Respond with 'OK' and the json containing the post at the given ID if it was found in the DB.
    if (query_res != null) {
        return response.status(200).json(query_res);
    } else {
        //Otherwise, respond with 'not found', because the request was valid, but the resource simply isn't here.
        return response.status(404).json({message: `Post with ID ${id} does not exist in this DB.`, sorry: true});
    }
});

//Router for DELETE requests that provide a specific post ID to delete

router.delete('/:postId', (request, response, next) => {
    //TODO implement deletes, probably just end up updating a field in the post instead
    //of removing it from the DB
    console.log("DELETE request received");
    return response.status(501).json({message: "Deletion is not implemented yet.", sorry: true})
});

module.exports = router;

