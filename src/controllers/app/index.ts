import express from "express";
import logger from "morgan";
import passport from "./google";
// init express
export const app = express();

// middleware add
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);
app.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  (req, res, next) => {
    console.log("res.req.IncomingMessage.user", res.req.IncomingMessage.user);
    res.send(res.req.IncomingMessage.user);
  }
);

app.listen("3000", () => {
  console.log("start server at 3000");
});
// grapql load
