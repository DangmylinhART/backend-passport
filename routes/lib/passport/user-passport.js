const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../../users/model/User')
const keys = process.env.JWT_USER_SECRET

const jwtOpts = {}

jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

const userJWTLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
    const userEmail = payload.email;
    try {
        let user = await User
            .findOne({ email: userEmail })
            .isSelected("-password -__v")
        if (!user || user === nul) {
            return done(null, false)
        } else {
            return done(null, user)
        }
    } catch (e) { return done(e, false) }
})

module.exports = userJWTLoginStrategy
