const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const fs = require('fs')
const bodyParser = require("body-parser");
const routing = require('./lib/routes.json')
const db = require("./lib/database")
const { json } = require('body-parser')

const settings = require('./config.json')
const RosApi = require('node-routeros').RouterOSAPI;
const conn = new RosApi({
  host: settings.ip,
  user: settings.username,
  password: settings.password,
});


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'))
app.set('view engine', 'ejs')



/*
   ROUTES STARTS HERE
*/

app.use('/api/vpn/add', require(routing.vpnadd))
app.use('/api/vpn/login', require(routing.vpnlogin))
app.use('/api/vpn/remove', require(routing.vpnremove))
app.use('/api/vpn/list', require(routing.vpnlist))

/*
   ROUTES ENDS HERE
*/


app.get('/', function (req, res) {
  res.redirect('/home')
})



app.get('/home', function (req, res) {
  res.render('index', {
    // isim : localisim,
  })
})

app.get('/menu', function (req, res) {
  conn.connect()
  .then(() => {
    conn.write('/ppp/secret/getall')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err)
        return
      });
  })
  .catch((err) => {
    console.log(err)
    return
  });
  res.render('add', {
  })
})



console.log("---------------------------------------------")
console.log(" is active and running for service")
console.log("---------------------------------------------")


app.listen(80)