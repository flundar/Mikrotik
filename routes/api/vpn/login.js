var express = require('express')
router = express.Router();
const fs = require('fs')

router

.get('/', function(req, res){
	console.log(`istek`)
	console.log(req)
  
})

module.exports = router;