"use strict";

const express = require('express');
const multer = require('multer');
const router = express.Router();
var app = express();

module.exports = (knex) => {
  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //     });
  // });
  function generateRandomString() {
    var randomString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
      randomString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomString;
  }

  const multerConf = {
    storage: multer.diskStorage({
      destination: function(req, file, next) {
        next(null, './public/styles/images');
      },
      filename: function(req, file, next) {
        const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + '-' + Date.now() + '.' + ext);
      }
    }),
    fileFilter: function(req, file, next) {
      if (!file) {
        next();
      }
      const image = file.mimetype.startsWith('image/');
      if (image) {
        next(null, true);
      } else {
        next({
          message: "File type not supported"
        }, false);
      }
    }
  };



  //document.getelementsByClassName('.empty').length
  router.post('/', multer(multerConf).any(), (req, res) => {
    //      req.body.photo1 = req.files[0].filename;
    //      req.body.photo2 = req.files[1].filename;
    let pollurlID = generateRandomString();
    let insertuser = {
      name: req.body.name,
      email: req.body.email
    };
    let insertpoll = {
      poll_question: req.body.question,
      poll_url: `polls/${pollurlID}`,
      admin_url: `admin/polls/${pollurlID}`
    };
    let insertoption = [];
    if (req.files.length === 2) {
      console.log(typeof(req.files), "files exist.");
      console.log(req.files.length, "file length");
      insertoption.push({
        choice_description: req.body.op1,
        choice_picture: req.files[0].filename
      }, {
        choice_description: req.body.op2,
        choice_picture: req.files[1].filename
      })
    } else {
      let i = 0;
      for (let x in req.body) {
        if (String(x) !== "name" && String(x) !== "email" && String(x) !== "question") {
          insertoption.push({
            choice_description: req.body[x],
            choice_picture: req.files[i].filename
          })
          i++;
        }
      }
    }
    //if (req.body.hasOwnProperty(x))
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
          question_description: req.body.photo,
          user_id_fk: response[0],
          poll_url: `polls/${pollurlID}`,
          admin_url: `admin/polls/${pollurlID}`
        }).into('poll').returning('poll_id'))
      //    .insert(insertpoll).into('poll').select('req.body.question', id).from('users')
      .then(function(response) {
        return knex('option')
          .insert(insertoption.map(a => Object.assign(a, {
            score: 0
          }, {
            poll_id_fk: response[0]
          })))
      })
      .then((results) => {
        res.redirect(`/polls/thankyou/${pollurlID}`);
      });
  });

  router.post('/result', (req, res) => {
    let matchX = [];
    let superX = [];
    let pollid = 0;
    for (let x in req.body) {
      if (String(x) === "pollid") {
        pollid = req.body[x];
      }
      if (String(x) !== "submit_button" && String(x) !== "pollid") {
        matchX.push(x);
        superX.push(req.body[x]);
      }
    }
    let loopyloop = [];
    for (let i = 0; i < matchX.length; i++) {
      let loopy = knex('option').increment('score', parseInt(superX[i])).
      where({
        poll_id_fk: pollid,
        choice_description: matchX[i]
      });
      loopyloop.push(loopy);
    }
    Promise.all(loopyloop).then(response => {
      res.redirect('/admin/polls/all'); //    res.json(response);
    })
  })
  return router;
}