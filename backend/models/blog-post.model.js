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
    },

    images: {
        type: Array,
        required: true,
        unique: false,
        trim: true
    },

    hidden: {
      type: Boolean
    }
}, {
    timestamps: true
});

const BlogPost = mongoose.model('blog-post', BlogPostSchema);
module.exports = BlogPost;