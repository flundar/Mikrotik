var express = require('express');
router = express.Router();
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/888560126695473253/BmMboi4Gzp2oyx465vYh-bHK_w_Lng_GMK_6z3MXz68_cNe4sLiB-frUQX7u4wwEGe7j");


router
  .post('/', function (req, res) {
    if(!req.body.nick || !req.body.ip || !req.body.hex) return res.sendStatus(404);
    const embed = new MessageBuilder()
      .setTitle('CarX Logs')
      .setAuthor('flundar.com', 'https://flundar.com/img/flundar.jpg', 'https://flundar.com')
      .setURL('https://flundar.com')
      .addField('Nick', req.body.nick)
      .addField('Hex', req.body.hex, true)
      .addField('Version', req.body.version, true)
      .addField('Can Run?', req.body.compile, true)
      .addField('Steam Profile', `https://steamcommunity.com/profiles/${h2d(req.body.hex)}`)
      .addField('IP', req.body.ip, true)
      .setColor('#00b0f4')
      .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
      .setDescription('We got this')
      .setImage('https://flundar.com/steam/api/avatar?hex=' + req.body.hex)
      .setTimestamp();
    hook.send(embed);
    res.sendStatus(200);
  })

function resultArray(r) {
  return (Object.values(JSON.parse(JSON.stringify(r))));
}


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