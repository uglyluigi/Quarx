const express = require('express');
const router = express.Router();

router.use('/blog-posts', require('./blog-posts'));
router.use('/event-messenger', require('./event-messenger'));
router.use('/login', require('./login'));
router.use('/assets', require('./assets'));

module.exports = router;
