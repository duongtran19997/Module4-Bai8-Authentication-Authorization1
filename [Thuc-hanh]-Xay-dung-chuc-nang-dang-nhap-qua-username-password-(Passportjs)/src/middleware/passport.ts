import passport from "passport"

import {UserModel} from '../schema/user.model'

import LocalStrategy from 'passport-local';


passport.serializeUser((user, done) => {

    done(null, user)

})


passport.deserializeUser(function (user, done) {

    done(null, user);

});


passport.use('local', new LocalStrategy(async (username, password, done) => {

    await UserModel.findOne({username: username}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    });


}));


export default passport;