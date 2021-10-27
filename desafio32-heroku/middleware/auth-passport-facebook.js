const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const {FACEBOOK_APP_ID, FACEBOOK_SECRET_ID} = require('../config/globals')
const userModel = require('../dao/models/users')

module.exports = () =>{

    const facebookOptions = {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET_ID,
        callbackURL: "https://app-coder-backend.herokuapp.com/productos/auth/facebook/callback",
        profileFields: ["id", "name", "picture", "email"]
    }

    const verifyCallback = async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            const user = await userModel.findOne({facebookID : profile.id}).lean()
            if (!user) {
                const {id, last_name,first_name,middle_name,picture, email} = profile._json
                const data = {
                    facebookID: id,
                    last_name: last_name,
                    first_name: first_name,
                    middle_name: middle_name,
                    picture: picture.data.url,
                    username: email,
                    password: ""
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
}
