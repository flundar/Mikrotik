var express = require('express')
router = express.Router();
const fs = require('fs')
var resim = ["./sources/dagkomando/1.jpg","./sources/dagkomando/2.jpg","./sources/dagkomando/3.jpg","./sources/dagkomando/4.png","./sources/dagkomando/5.jpg","./sources/dagkomando/6.jpg"]
router

.get('/', function(req, res){
	console.log(`istek`)
    var secilenresim = resim[Math.floor(Math.random()*resim.length)];
    fs.readFile(secilenresim, function (err, data) {
        if (err) throw err; // Fail if the file can't be read.
        else {
          res.writeHead(200, {
            'Content-Type': 'image/jpeg'
          });
          res.end(data); // Send the file data to the browser.
        }
    });
})

module.exports = router;