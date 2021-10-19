const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../dao/models/users')
const {validPassword, createPassword} = require('../utils/passwordUtil')

const customFields = {
    passReqToCallback: true
}

const loginCallback = async (req, username, password, done) => {
    try {
        const user = await userModel.findOne({ username: username }).lean()
        
        if (!user) { return done(null, false) }
        
        const isValid = await validPassword(password, user.password);
        
        if (isValid) {
            return done(null, user);
        } else {
            console.log("Contraseña incorrecta")
            return done(null, false);
        }

    } catch (err) {
        done(err);
    }
}

const signUpCallback = async (req,username, password, done) => {
    try {
        const user = await userModel.find({ username: username }).lean()
        console.log(user)
        if (user.length) { 
            return done(null, false, console.log("mensaje:", "Hay un usuario registrado con su mail"))
        } else {
            const newUser = {
                name: req.body.name,
                username: username,
                password: await createPassword(password)
            }
            const newCreatedUser= await userModel.create(newUser)
            return done(null, newCreatedUser);
        }

    } catch (err) {
        done(err);
    }
}

const loginStrategy  = new LocalStrategy(customFields,loginCallback);
const signUpStrategy = new LocalStrategy(customFields,signUpCallback)

passport.use("login",loginStrategy);
passport.use("signup", signUpStrategy)

// Serialize

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    userModel.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

module.exports = passport;