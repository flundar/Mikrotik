var express = require('express'),
router = express.Router();
const request = require('request')
const fs = require('fs')
router
  .get('/', function (req, res) {

    if (!req.query.hex) res.send("Hex adresi doğru olarak bulunamadı.");

    request('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=52A66B13219F645834149F1A1180770A&steamids=' + h2d(req.query.hex), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          var data = JSON.parse(body)
          var img = data.response.players[0].avatarfull
          request(img).pipe(fs.createWriteStream('doodle.png'));
          setTimeout(() => {
            fs.readFile('doodle.png', function (err, data) {
              if (err) throw err; // Fail if the file can't be read.
              else {
                res.writeHead(200, {
                  'Content-Type': 'image/jpeg'
                });
                res.end(data); // Send the file data to the browser.
              }
            });
          }, 500);
        } catch (error) {
          res.send("Hex adresi doğru olarak bulunamadı")
          console.log(error)
        }
      } else {
        res.statusCode = 404
        res.statusMessage = 'Not found';
      }
    })
  })



function h2d(s) {

  function add(x, y) {
    var c = 0,
      r = [];
    var x = x.split('').map(Number);
    var y = y.split('').map(Number);
    while (x.length || y.length) {
      var s = (x.pop() || 0) + (y.pop() || 0) + c;
      r.unshift(s < 10 ? s : s - 10);
      c = s < 10 ? 0 : 1;
    }
    if (c) r.unshift(c);
    return r.join('');
  }

  var dec = '0';
  s.split('').forEach(function (chr) {
    var n = parseInt(chr, 16);
    for (var t = 8; t; t >>= 1) {
      dec = add(dec, dec);
      if (n & t) dec = add(dec, '1');
    }
  });
  return dec;
}

module.exports = router;