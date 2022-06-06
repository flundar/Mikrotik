var express = require('express')
router = express.Router();
const fs = require('fs')
const cookieParser = require("cookie-parser");
const settings = require("../../../config.json")
const sessions = require('express-session');
var session;
var logged;
router

	.post('/', function (req, res) {
		if (req.body.username || req.body.password) {
			for (let i = 0; i < settings.users.length; i++) {
				if (req.body.username == settings.users[i].username && req.body.password == settings.users[i].password) {
					logged = true
				}
				else{
					logged = false
				}
			}

			if (logged) {
				session = req.session;
				session.user = req.body.username;
				res.redirect('/menu');
			} else {
				res.send("wrong cr")
			}
		} else {
			res.redirect('/login');
		}
	})

module.exports = router;