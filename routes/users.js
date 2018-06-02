"use strict";

const express = require('express');
const router = express.Router();
var app = express();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  function generateRandomString() {
    var randomString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
      randomString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomString;
  }
  //document.getelementsByClassName('.empty').length
  router.post('/', (req, res) => {

    let pollurlID = generateRandomString();
    let insertuser = {
      name: req.body.name,
      email: req.body.email
    };
    let insertpoll = {
      poll_question: req.body.question,
      poll_url: `polls/${pollurlID}`,
      admin_url: `admin/polls/${pollurlID}`,
      //      user_id: req:b
    };
    let insertoption = [];
    for (let x in req.body) {
      if (String(x) !== "name" && String(x) !== "email" && String(x) !== "question") {
        insertoption.push({
          choice_description: req.body[x]
        })
      }
    }
    //      if (req.body.hasOwnProperty(x))
    // let count = -3;

    //     ++count;
    // insertoption.push({choice_description: req.body.op+});

    // console.log(req.body, "users.js");
    // if (!req.body.text) {
    //  res.status(400).json({
    //    error: 'invalid request: no data in POST body'
    //  });
    //  return;
    // }
    knex
      .insert(insertuser).into('users').returning('id')
      //  .('poll').insert('req.body.question')
      .then(response =>
        knex.insert({
          poll_question: req.body.question,
          user_id_fk: response[0],
          poll_url: `polls/${pollurlID}`,
          admin_url: `admin/polls/${pollurlID}`
        }).into('poll').returning('poll_id'))

    //    .insert(insertpoll).into('poll').select('req.body.question', id).from('users')

    .then(function(response) {
      return knex('option')
        .insert(insertoption.map(a => Object.assign(a, {score:0},{
          poll_id_fk: response[0]
        })))
    })

    // [{
    //         choice_description: req.body.op1,
    //         poll_id_fk: response[0]
    //       }, {
    //         choice_description: req.body.op2,
    //         poll_id_fk: response[0]
    //       }]
    // .then(function(response) {
    //  return knex('option')
    //    .insert({
    //      choice_description: req.body.op2,
    //      poll_id: response[0]
    //    })
    // })

    //      from("pollToSelectDataFrom")).into("users")

    // .insert(insertpoll).into('poll').select('req.body.question', id).from('users')
    //  .where('name').equals(req.body.name);
    // .insert(insertoption).into('option')
    // .insert(insertoption2).into('option')

    .then((results) => {
      res.redirect(`/polls/thankyou/${pollurlID}`);

    });
  });
  return router;
}
