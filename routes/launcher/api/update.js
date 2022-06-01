var express = require('express'),
router = express.Router();
const db = require("../../../lib/database")
const epoch = Math.floor(new Date().getTime() / 1000)

router
  .get('/', function (req, res) {
    if (!req.headers.ip) return;
    db.query(`SELECT ip FROM whitelist WHERE ip = '${req.headers.ip}'`, function (e, r, f) {
      if (resultArray(r).length > 0) {
        db.query(`DELETE FROM whitelist where ip = ${req.headers.ip}`, function (e, r, f) {
          console.log(e || "Data deleted successfully.")
        })
      } else {
        console.log("Data is not exist.")
      }
    })

  })

function resultArray(r) {
  return (Object.values(JSON.parse(JSON.stringify(r))));
}
module.exports = router;