import {IS_TEST_ENV} from "../../constants";

const express = require('express');
const router = express.Router();

router.use('/blog-posts', require('./blog-posts'));
router.use('/event-messenger', require('./event-messenger'));
router.use('/login', require('./login'));
router.use('/assets', require('./assets'));

if (IS_TEST_ENV) {
    console.log("[WARNING] TEST APIs ARE ENABLED");
    router.use('/test', require('./test'));
}

module.exports = router;
