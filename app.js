// import Mongoose
const mongoose = require('mongoose');

// This creates a new Express server. 
const express = require("express");
const app = express();
// import your key
const db = require('./config/keys').mongoURI;
// connect to MongoDB using Mongoose:
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


// setup a basic route so that we can render some information on our page
app.get("/", (req, res) => res.send("Hello Friends"));

// tell our app which port to run on
const port = process.env.PORT || 5001;

// tell Express to start a socket and listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));