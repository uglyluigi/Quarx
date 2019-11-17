const router = require('express').Router();
const sgWorker = require('../../workers/sendgrid-worker');

router.get('/email', (request, response, next) => {
    console.log('=> Conducting email alert test');
    sgWorker.sendToAll('Test email', "<b>This is a demo email containing sample text</b>");
    return response.sendStatus(200);
});

module.exports = router;