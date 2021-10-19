const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const {FACEBOOK_APP_ID, FACEBOOK_SECRET_ID} = require('../config/globals')
const userModel = require('../dao/models/usersFacebook')

const facebookOptions = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_SECRET_ID,
    callbackURL: "/productos/auth/facebook/callback",
    profileFields: ["id", "name", "picture", "email"]
}

const verifyCallback = async (accessToken, refreshToken, profile, done)=>{
    try {
        const user = await userModel.findOne({_id : profile.id}).lean()
        if (!user) {
            const {id, last_name,first_name,middle_name,picture} = profile._json
            const data = {
                _id: id,
                last_name: last_name,
                first_name: first_name,
                middle_name: middle_name,
                picture: picture.data.url
              };

            const newUser= await userModel.create(data)
            return done(null, newUser);
        }
        return done(null, user);
    } catch (error) {
        done(error)
    }
}
const loginStrategy  = new FacebookStrategy(facebookOptions,verifyCallback);

passport.use(loginStrategy);

// Serialize

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((userId, done) => {
    userModel.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

module.exports = passport;