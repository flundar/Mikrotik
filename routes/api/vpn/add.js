var express = require('express')
router = express.Router();
const fs = require('fs')
const bodyParser = require("body-parser");
const settings = require('../../../config.json')
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
    console.log(`istek`)
    if (req.body.name || req.body.password || req.body.profile) {
      console.log(req.body.name, req.body.password, req.body.profile)
      conn.connect()
        .then(() => {
          conn.write('/ppp/secret/add', [
              '=name=' + req.body.name,
              '=password=' + req.body.password,
              '=profile=' + req.body.profile,
            ])
            .then((data) => {
              console.log(data);
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
  })

module.exports = router;