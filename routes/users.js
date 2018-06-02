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
      };
      let insertoption = [];
      for (let x in req.body) {
        if (String(x) !== "name" && String(x) !== "email" && String(x) !== "question") {
          insertoption.push({
            choice_description: req.body[x]
          })
        }
      }
      knex
        .insert(insertuser).into('users').returning('id')
        .then(response =>
          knex.insert({
            poll_question: req.body.question,
            user_id_fk: response[0],
            poll_url: `polls/${pollurlID}`,
            admin_url: `admin/polls/${pollurlID}`
          }).into('poll').returning('poll_id'))
        .then(function(response) {
          return knex('option')
            .insert(insertoption.map(a => Object.assign(a, {
              score: 0
            }, {
              poll_id_fk: response[0]
            })))
        })
        .then((results) => {
          res.redirect(`/polls/${pollurlID}`);
        });
    });
    router.post('/result', (req, res) => {
        let updatechoice = [];
        let updatescore = [];
        let matchX = [];
        let superX = [];
        for (let x in req.body) {
          if (String(x) !== "submit_button") {
            updatechoice.push({
              choice_description: x
            })
            updatescore.push({
              score: req.body[x]
            })
            matchX.push(x);
            superX.push(req.body[x]);
          }
        }
        let loopyloop = [];
        for (let i = 0; i < updatescore.length; i++) {
          let loopy = knex('option').increment('score', parseInt(superX[i])).
          where({poll_id_fk: 3,choice_description: matchX[i]});
          loopyloop.push(loopy);
        }
        //            for (let x in req.body) {
        //             if (String(x) !== "submit_button") {
        //       console.log(req.body[x], x);
        // knex.raw(update option set score = case(choice_description when superX[i])
        //   updatescore where updatechoice)
        //      knex.raw(update option set score = score + superX[i] where )
        //       .update(updatescore[0])
        console.log(loopyloop.map(function(e) {
            return
            e.toString();
          }));
          Promise.all(loopyloop).then(response => {
            res.json(response);
          })
        })
      //   let insertScore = {score:req.body.score};
      //   knex
      //     .insert(insertScore).into('users').returning('id')
      //     .then(response =>
      //       knex.insert({
      //         poll_question: req.body.question,
      //         user_id_fk: response[0],
      //         poll_url: `polls/${pollurlID}`,
      //         admin_url: `admin/polls/${pollurlID}`
      //       }).into('poll').returning('poll_id'))
      // })
      return router;
    }

    // knex('option').max('poll_id_fk')
    //   .then(function(x) {
    //     console.log(x[0].max)
    //     // for (let i = 0; i < updatescore.length; i++) {
    //     //   let loopy = knex('option').increment('score', parseInt(superX[i])).
    //     //   where('choice_description', matchX[i]).andWhere('poll_id_fk', x[0].max);
    //     //   console.log(loopy)
    //     //   loopyloop.push(loopy);
    //     // }
    //     for (let i = 0; i < updatescore.length; i++) {
    //       return knex('option').increment('score', parseInt(superX[i])).
    //       where('choice_description', matchX[i]).andWhere('poll_id_fk', x[0].max)


    //     }
    //   })
    //   .then(response => {
    //     res.json(response);
    //   })