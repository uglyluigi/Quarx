const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AccessUser = require('./models/access-user');
require('dotenv').config();

passport.use(new LocalStrategy(AccessUser.authenticate()));
passport.serializeUser(AccessUser.serializeUser());
passport.deserializeUser(AccessUser.deserializeUser());

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
(jwtPayload, cb) => {
    return AccessUser.findOne(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        })
}));
