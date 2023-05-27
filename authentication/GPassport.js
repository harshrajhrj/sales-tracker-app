require('dotenv/config')
const GoogleOAuthStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const UserModel = require('../database/Models/UserModel');

passport.serializeUser((user, done) => {
    // console.log("user saved");
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    if (user) {
        // console.log("user unsaved");
        done(null, user);
    }
})

passport.use(new GoogleOAuthStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL,
    scope: ['profile', 'email']
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await UserModel.findOne({ google_id: profile.id });
            if (user) {
                done(null, user)
            }
            else {
                const NewUser = new UserModel({
                    google_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profile_url: profile._json.picture,
                    timeZone: profile._json.timezone
                });
                const SavedUser = await NewUser.save();
                done(null, SavedUser);
            }
        } catch (err) {
            done(err, null)
        }
    }
));