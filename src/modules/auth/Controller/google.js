import express from "express";
import passport from "passport";
import Google from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
const strategy = Google.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // This function will be called when the user is authenticated successfully
      // You can perform any necessary actions here, such as creating a user profile in your app's database
      // The `profile` object contains user information returned by Google
      return done(null, profile);
    }
  )
);

const app = express();

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Define the routes

// Redirect the user to the Google authentication page
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google will redirect to after authentication
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect or respond with JSON token
    res.redirect("/dashboard"); // Replace with your desired redirect URL
  }
);

// A protected route that requires authentication
app.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send("Welcome to the dashboard!");
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
