import express from "express";
import logger from "morgan";
import passport from "./google";
// init express
export const app = express();

// middleware add
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
  })
);

app.listen("3000", () => {
  console.log("start server at 3000");
});
// grapql load
