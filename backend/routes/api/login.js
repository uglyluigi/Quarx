const AccessUser = require('../../models/access-user');
const passport = require('passport');
const router = require('express').Router();

router.post('/signup', (req, res, next) => {
    AccessUser.register(new AccessUser({
        username: req.body.username
    }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    err: err
                });
            } else {
                passport.authenticate('local')(req, res, () => {
                    AccessUser.findOne({
                        username: req.body.username
                    }, (err, person) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            success: true,
                            status: "GOOD JOB"
                        })
                    })
                })
            }
        });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    AccessUser.findOne({username: req.body.username}, (err, person) => {
        req.login(person, function (err, something) {

        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
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