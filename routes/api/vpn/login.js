var express = require('express')
router = express.Router();
const fs = require('fs')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var session;
router

	.post('/', function (req, res) {
		if (req.body.username || req.body.password) {
			if (req.body.username == "flundar" || req.body.password == "utku") {
				session = req.session;
				session.user = req.body.username;
				res.redirect('/menu');
			} else {
				res.redirect('/home');
			}
		} else {
			res.redirect('/home');
		}
	})

module.exports = router;