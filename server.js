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



// Generate random string function (eventually move to module)
function generateRandomString() {
  var randomString = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++) {
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomString;
}




// GET homepage
app.get("/", (req, res) => {
  res.render("index");
});

// POST create poll
app.post("/polls", (req, res) => {
      var pollDesc = req.body.description; //send to database
      var pollQuestion = req.body.question; //send to database
      // var pollId = generateRandomString();   id from database??
      var userName = req.body.name;
      var userEmail = req.body.email; //send to database
      var options = ? ? ?
        //options... how do we capture from the form? loop through each item and send to database?
        if (!userEmail) {
          res.send('You must enter an email to create a poll')
        } else {
          //how are we treating existing emails...create a function to check if it exists?
          userData.addUser(userEmail, userName, (err, rows) => {
              if (err) {
                console.log("error adding user data");
              }
              console.log(`testing if user add successful: ${rows}`)
            }
            pollData.addPoll(pollTitle, pollDesc, (err, rows) => {
                if (err) {
                  console.log("error adding poll data");
                }
                console.log(`testing if poll data add successful: ${rows}`)
              }
              res.redirect(`/polls/${!!id!!!}`) //need ID associated with poll or generate from here?
            })



    })
 /// poll export function in scripts/createPollData.js (function called addPoll)
 // user export  function in scripts/createUserData.js. (function called addUser)



    res.redirect(`/polls/${pollId}`)
  }
}

// GET specific poll page
app.get("/polls/:id", (req, res) => {
if(... check in db... !req.params.id) {
  res.send('This poll is no longer active')
} else {
  res.render("polls_display", !!!database info!!!)
}
}

//GET admin poll page









app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
