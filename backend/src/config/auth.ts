import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';
import type { Request } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import type {VerifiedCallback} from 'passport-jwt';

const jwtExtractor = function(req: Request): string | null { 
    let token = null;
    if (req && req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1] ?? null;  
    }
    return token;
};

passport.use(
  new JwtStrategy(
    { jwtFromRequest: jwtExtractor, secretOrKey: process.env.SECRET_JWT as string }, 
    async function(jwt_payload: any, done: VerifiedCallback) {  
      try {
        const foundUser = await User.findOne({ _id: jwt_payload.sub });
        if(!foundUser) {
          done(null,null)
        }
        done(null, foundUser)
      } catch (error) {
        done(error, null)
      }
    }
));

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
        { upsert: true,   returnDocument: 'after' }
      );
      return cb(null, user);
    } catch (err) {
      return cb(err as Error);
    }
  }
));

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

export default passport;