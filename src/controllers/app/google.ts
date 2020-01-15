import google from "passport-google-oauth";
import passport from "passport";

const GoogleStrategy = google.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "http://localhost:3000/login/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log("accessToken", accessToken);
      console.log("profile", profile);
      return cb(null, { test: "lcc3108 test" });
    }
  )
);

export default passport;
