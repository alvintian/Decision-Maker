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
	var insert1 = {
		name: req.body.name,
		email: req.body.email
	};
	console.log(req.body,"users.js");
		// if (!req.body.text) {
		// 	res.status(400).json({
		// 		error: 'invalid request: no data in POST body'
		// 	});
		// 	return;
		// }
		knex
			.insert(insert1).into('users')
			.then((results) => {
				res.json(results);
			});
	});
	return router;
}