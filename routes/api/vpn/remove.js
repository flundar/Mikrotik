var express = require('express')
router = express.Router();
const fs = require('fs')
const bodyParser = require("body-parser");
const settings = require('../../../config.json')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const RosApi = require('node-routeros').RouterOSAPI;
const conn = new RosApi({
  host: settings.ip,
  user: settings.username,
  password: settings.password,
});

router.use(bodyParser.urlencoded({
  extended: false
}));

conn.on('error', (err) => {
  console.log(err);
});


router

  .post('/', function (req, res) {
    if (session.user) {
    if (req.body.id || req.body.id == 0) {
      console.log(req.body.id)
      conn.connect()
        .then(() => {
          conn.write('/ppp/secret/remove', [
              '=.id=' + req.body.id,
            ])
            .then((data) => {
			  res.send("finished")
              if(data.toString().toLowerCase().includes("already")){
                console.log("üye bulunmaktadır")
                conn.close()
                return
              }
            })
            .catch((err) => {
              if(err.toString().toLowerCase().includes("already")){
                console.log("üye bulunmaktadır")
                conn.close()
                return
              }
            });
        })
        .catch((err) => {
          if(err.toString().toLowerCase().includes("already")){
            console.log("üye bulunmaktadır")
            conn.close()
            return
          }
        });
      res.send("bitti")
    }
  } else {
    res.send("couldn't verified")
  }
  })

module.exports = router;