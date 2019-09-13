const express = require('express');
const router = express.Router();

router.use('/blog-posts', require('./blog-posts'));

module.exports = router;
