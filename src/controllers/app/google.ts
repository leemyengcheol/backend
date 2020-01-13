import google from "passport-google-oauth";
import passport from "passport";

const GoogleStrategy = google.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "test",
      clientSecret: "test",
      callbackURL: "http://localhost:3000/login/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

export default passport;
