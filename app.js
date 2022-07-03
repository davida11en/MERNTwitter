// import Mongoose
const mongoose = require('mongoose');
// This creates a new Express server. 
const express = require("express");
const app = express();
// import your key
const db = require('./config/keys').mongoURI;
// tell our app which port to run on
const port = process.env.PORT || 5001;
// import your routes:
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
//  so that we can parse the JSON we send to our frontend
const bodyParser = require('body-parser');
// so that our users can actually sign in and access protected routes
const jwt = require('jsonwebtoken');
const passport = require('passport');

// connect to MongoDB using Mongoose:
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// setup some middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add the middleware for Passport
app.use(passport.initialize());
// to setup a configuration file for Passport
require('./config/passport')(passport);

// setup a basic route so that we can render some information on our page
app.get("/", (req, res) => {
  const user = new User({
    handle: "jim",
    email: "jim@jim.jim",
    password: "jimisgreat123"
  })
  user.save()
  res.send("Hello Friends")
});
// Tell Express to use your newly imported routes
app.use("/api/users", users);
app.use("/api/tweets", tweets);

// tell Express to start a socket and listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));

