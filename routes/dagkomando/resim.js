var express = require('express'),
router = express.Router();
const request = require('request')
router
  .get('/', function (req, res) {

    fs.renameSync('1.jpg', '2.jpg');
  })

module.exports = router;