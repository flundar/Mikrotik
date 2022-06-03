const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require("body-parser");
const routing = require('./lib/routes.json')
const {
  json
} = require('body-parser')


const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const settings = require('./config.json')




const RosApi = require('node-routeros').RouterOSAPI;
const conn = new RosApi({
  host: settings.ip,
  user: settings.username,
  password: settings.password,
});


app.use(sessions({
  secret: "asirigizlisecret915818fsjw",
  saveUninitialized: true,
  cookie: {
    maxAge: 360000
  },
  resave: false
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: false
}));

var session;


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
app.use('/api/vpn/edit', require(routing.vpnedit))
app.use('/api/vpn/activeremove', require(routing.vpnactiveremove))

/*
   ROUTES ENDS HERE
*/


app.get('/', function (req, res) {
  res.redirect('/home')
})



app.get('/home', function (req, res) {
  res.render('index', {})
})
conn.on('error', (err) => {
  console.log(err);
});

app.get('/menu', function (req, res) {
  session = req.session
  if (session.user) {
    conn.connect()
      .then(() => {
        conn.write('/ppp/secret/getall')
          .then((data) => {
            console.log(data)
            res.render('menu', {
              profiles: data,
            })
          })
          .catch((err) => {
            console.log(err)
            res.send("cannot connect")
            return
          });
      })
      .catch((err) => {
        console.log(err)
        res.send("cannot connect")
        return
      });
  } else {
    res.send("couldn't verified")
  }

})

app.get('/activeusers', function (req, res) {
  conn.connect()
    .then(() => {
      conn.write('/ppp/active/getall')
        .then((data) => {
          res.render('activeusers', {
            active: data,
          })
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
})


console.log("---------------------------------------------")
console.log(" is active and running for service")
console.log("---------------------------------------------")


app.listen(8080)