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


	router.post('/', (req, res) => {
		let insertuser = {
			name: req.body.name,
			email: req.body.email
		};
		let insertpoll = {
			poll_question: req.body.name,
			email: req.body.email
			user_id:
		};
		let insertoption = {
			choice_description: req.body.op1
		};
		let insertoption2 = {
			choice_description: req.body.op2
		};

		console.log(req.body, "users.js");
		// if (!req.body.text) {
		// 	res.status(400).json({
		// 		error: 'invalid request: no data in POST body'
		// 	});
		// 	return;
		// }
		knex
			.insert(insertuser).into('users')
			.insert(insertpoll).into('poll').select()
			.insert(insertoption).into('option')
			.insert(insertoption2).into('option')
			.then((results) => {
				res.json(results);
			});
	});
	return router;
}