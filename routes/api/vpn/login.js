var express = require('express')
router = express.Router();
const fs = require('fs')

router

	.post('/', function (req, res) {
		console.log(`istek`)
		if (req.body.username || req.body.password) {
			if (req.body.username == "flundar" || req.body.username == "utku") {
				res.render('index', {
					
				})
			}
		}
	})

module.exports = router;