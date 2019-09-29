import {handle_unauthorized_api_call, go_away_err} from "./common"

const AccessUser = require('../../models/access-user');
const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * POST router to /api/login/signup
 *
 * Probably not even going to be used,
 * since there's only going to be 1 user
 * allowed to log in to the site since
 * we only want site admins to have special
 * access.
 */
router.post('/signup', passport.authenticate('jwt', {session: false}), (request, response, next) => {
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

/**
 * POST router to /api/login/login (yep)
 *
 * Receives a username and password. Logs the user in if passport says it's OK.
 *
 * Body:
 * {
 *     username: "username",
 *     password: "password"
 * }
 *
 * Known issues:
 * * Probably going to need another layer of auth of some kind since the request is made containing a plaintext
 * password, making this susceptible to MITM attacks, however if we configure SSL correctly on the actual
 * deployed site this might become a non-issue.
 */
router.post('/login', (request, response) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(`User found 2: ${user}`);
        console.log(`Info: ${info}`);
        console.log(`Err: ${err}`);

        if (err || !user) {
            return response.status(400).json({
                message: 'Invalid credentials.',
                user: user
            })
        }

        request.login(user, {session: false}, (err) => {
            if (err) {
                return response.status(500).json({error: err});
            }

            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            return response.status(200).json({user, token});
        });
    })(request, response);

    return response;
});

/**
 * GET router to /api/login/logout (lol).
 * Destroys the user's session if one exists.
 *
 * Known issues:
 * * Does not respond correctly when trying to log out without an active session. Always responds
 * with the inner 200-returning expression, but this could be an issue with how Postman stores cookies.
 * I don't know! Jeez!
 */
router.get('/logout', (request, response, next) => {
    if (request.session) {
        request.logout();
        request.session.destroy((err) => {
            go_away_err(err);

            if (!err) {
                response.status(200).clearCookie('expression').json({message: "You have been logged out."});
            }
        });
    } else {
        response.status(403).json({message: "You were not logged out (no session to destroy).", sorry: false});
    }

    return response;
});

module.exports = router;