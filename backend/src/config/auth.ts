import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.serializeUser((user: any, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const email = profile.emails?.[0]?.value ?? null;
      const pictureUrl = profile.photos?.[0]?.value ?? null;

      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        {
          $set: {
            googleId: profile.id,
            firstName: profile.name?.givenName ?? null,
            lastName: profile.name?.familyName ?? null,
            pictureUrl,
            email,
          }
        },
        { upsert: true, new: true }
      );
      return cb(null, user);
    } catch (err) {
      return cb(err as Error);
    }
  }
));

export default passport;