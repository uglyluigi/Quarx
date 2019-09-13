const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },

    body: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
}, {
    timestamps: true
});

const BlogPost = mongoose.model('blog-post', BlogPostSchema);
module.exports = BlogPost;