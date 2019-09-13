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

    const get_all = request.body.get_all;

    if (get_all) {
        info += `Note: this GET (id) request looks like a malformed GET (ALL) request. Remove the post ID in the URL to perform a GET (ALL) request. `
    }

    return response.status(404).json({success: false, info: info});
});

router.delete('/:postId', (request, response, next) => {
    console.log("DELETE request received");
});

module.exports = router;

