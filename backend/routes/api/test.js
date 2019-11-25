import {go_away_err} from "./common";
const router = require('express').Router();
const sgWorker = require('../../workers/sendgrid-worker');

router.get('/email', (request, response, next) => {
    console.log('=> Conducting email alert test');
    sgWorker.sendToAll('Test email', "<b>This is a demo email containing sample text</b>");
    return response.sendStatus(200);
});

/**
 * POST router to /api/login/signup
 *
 * Probably not even going to be used,
 * since there's only going to be 1 user
 * allowed to log in to the site since
 * we only want site admins to have special
 * access.
 */
router.post('/signup', (request, response, next) => {
    AccessUser.register(new AccessUser({username: request.body.username}), request.body.password, (err, user) => {
        if (err) {
            response.status(500).json({err: err});
        } else {
            passport.authenticate('local')(request, response, () => {
                AccessUser.findOne({username: request.body.username}, (err, person) => {
                    go_away_err(err, response);

                    if (!err) {
                        response.status(200).json({
                            message: "You\'ve been successfully logged in.",
                            success: true,
                            happy_4_u: true
                        });
                    }
                })
            });
        }
    });

    return response;
});

module.exports = router;