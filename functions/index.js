const functions = require('firebase-functions');
const express = require("express");

const app = express();

const FBAuth = require("./util/fbauth");

const { getAllScreams, postOneScream } = require("./routes/screams");
const { signup, login, uploadImage } = require("./routes/users");


// Scream routes
app.get("/screams", getAllScreams)
app.post("/scream", FBAuth, postOneScream);

// user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);


exports.api = functions.https.onRequest(app);