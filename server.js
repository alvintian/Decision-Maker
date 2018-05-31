"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// knex/db communicating functions
const userData = require("./scripts/createUserData")(knex);
const pollData = require("./scripts/createPollData")(knex);
const findPoll = require("./scripts/findPoll")(knex);


// Generate random string function (eventually move to module)
function generateRandomString() {
  var randomString = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++) {
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomString;
}


// GET homepage --> no data to be sent here... just render the ejs file
app.get("/", (req, res) => {
  res.render("index");
});

// POST create poll
app.post("/polls", (req, res) => {
      var pollDesc = req.body.description; //now being handled by Ajax
      var pollQuestion = req.body.question; //now being handled by Ajax
      var pollId = generateRandomString();
      var userName = req.body.name; //now being handled by Ajax
      var userEmail = req.body.email; //now being handled by Ajax
      var pollURL = `polls/${pollId}` //send to database?
      var adminURL = `admin/polls/${pollId}` //send to database?

      //nolan to send in an array...
        //options... how do we capture from the form? loop through each item and send to database?
        if (!userEmail) {
          res.send('You must enter an email to create a poll')
        } else {
          //how are we treating existing emails...create a function to check if it exists?
          //function to send data to database (user table)
          userData.addUser(userEmail, userName, (err, rows) => {
              if (err) {
                console.log("error adding user data");
              }
              console.log(`testing if user add successful: ${rows}`)
            }
            //function to send data to database (poll table)
            // pollData.addPoll(pollTitle, pollDesc, pollURL, adminURL, (err, rows) => {
            //     if (err) {
            //       console.log("error adding poll data");
            //     }
            //     console.log(`testing if poll data add successful: ${rows}`)
            //   }
            //tweak to send just URLs?
              pollData.addPoll(pollURL, adminURL, (err, rows) => {
                if (err) {
                  console.log("error adding poll data");
                }
                console.log(`testing if poll data add successful: ${rows}`)
              }
              res.redirect(`/polls/${PollId}`);
            })
            //send email to user... should this be done on server or ajax
    })


// GET specific poll page
app.get("/polls/:id", (req, res) => {
  var pollURL = `polls/${req.params.id}`;

if(...would be if the select query comes to nothing...) {
  res.send('This poll is no longer active')
} else {
  findPoll.findPollDis(pollURL, (err, rows) => {
    if (err) {
      console.log("error finding poll data");
      //should we put our error send here if we cannot find the url?
    }
    console.log(`testing if specific poll data is passed in: ${rows}`);
    /// send in JSON format?
// how to pass the data to the specific poll???
  })
}
}

//GET admin specific poll page... results?
app.get("/admin/polls/:id"), (req, res) => {
var adminURL = `admin/polls/${req.params.id}`;

if(...would be if the select query comes to nothing...) {
  res.send('This poll is no longer active')
} else {
  findPoll.findPollDis(adminURL, (err, rows) => {
    if (err) {
      console.log("error finding poll data");
      //should we put our error send here if we cannot find the url?
    }
    console.log(`testing if specific poll data is passed in: ${rows}`);
// how to pass the data to the specific poll???
  })
}
///
////we need to select actual values from our options database
////delete option
}


//DELETE (POST) delete poll page
app.post("/polls/:id/delete", (req, res) => {
  var pollURL = `polls/${req.params.id}`;
  (find using----select func-----) {
    delete -----select-----;
  }
  res.redirect("/urls");
});






app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
