import google from "passport-google-oauth";
import passport from "passport";
import { doSingUpOrLogin } from "../firestore/user";
import { generateToken } from "@/controllers/auth/jwt";

const GoogleStrategy = google.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "http://localhost:3000/login/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("accessToken", accessToken);
      console.log("profile", profile);
      doSingUpOrLogin(profile);
      const token = await generateToken(profile);
      return cb(null, { token });
    }
  )
);

export default passport;
