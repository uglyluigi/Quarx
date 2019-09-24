import {handle_unauthorized_api_call} from "./common"

const AccessUser = require('../../models/access-user');
const passport = require('passport');
const router = require('express').Router();

router.post('/signup', (request, response, next) => {
    if (handle_unauthorized_api_call(request, response)) {
        return response;
    }

    AccessUser.register(new AccessUser({
        username: request.body.username
    }),
        request.body.password, (err, user) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    err: err
                });
            } else {
                passport.authenticate('local')(request, response, () => {
                    AccessUser.findOne({
                        username: request.body.username
                    }, (err, person) => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.json({
                            success: true,
                            status: "GOOD JOB"
                        })
                    })
                })
            }
        });
});

router.post('/login', passport.authenticate('local'), (request, response) => {
    AccessUser.findOne({username: request.body.username}, (err, person) => {
        request.login(person, function (err, something) {

        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json({
            success: true,
            status: "YOU DID IT!!!"
        })
    });
});

router.get('/logout', (request, response, next) => {
    if (request.session) {
        request.logout();
        request.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                response.clearCookie('expression');
                response.json({
                    message: "You are successfully logged out!"
                });
            }
        })
    } else {
        const err = new Error("You are not logged in!");
        err.status = 403;
        next(err);
    }
});

module.exports = router;