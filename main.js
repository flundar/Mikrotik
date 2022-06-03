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


const settings = require('./config.json');
const { profile } = require('console');




const RosApi = require('node-routeros').RouterOSAPI;
const conn = new RosApi({
  host: settings.ip,
  user: settings.username,
  password: settings.password,
});

var firewall = false

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
var dataprofiles;


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
  res.redirect('/login')
})



app.get('/login', function (req, res) {
  session = req.session
  if (session.user) {
    res.redirect('menu')
  } else {
    res.render('login')
  }
 
 
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
            dataprofiles = data
            res.render('menu', {
              profiles: dataprofiles,
              firewall: firewall,
              username: session.user,
              profile: settings.profile,
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
    res.redirect("/login")
  }

})

app.get('/activeusers', function (req, res) {
  session = req.session
  if (session.user) {
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
  } else {
    res.redirect("/login")
  }
})


app.get('/showlog', function (req, res) {
  session = req.session
  if (session.user) {
  conn.connect()
    .then(() => {
      conn.write('/log/print')
        .then((data) => {
          res.render('showlog', {
            veri: data,
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
  } else {
    res.redirect("/login")
  }
})

app.get('/showalllog', function (req, res) {
  session = req.session
  if (session.user) {
  conn.connect()
    .then(() => {
      conn.write('/log/print')
        .then((data) => {
          res.render('showalllog', {
            veri: data,
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
  } else {
    res.redirect("/login")
  }
})




app.post('/api/vpn/firewall', function (req, res) {
  session = req.session
  if (session.user) {
    conn.connect()
      .then(() => {
        if(firewall){
          firewall = false
          conn.write('/ip/firewall/raw/set',[
            "=.id=1",
            "=disabled=yes"
          ])
          conn.write('/ip/firewall/raw/set',[
            "=.id=2",
            "=disabled=yes"
          ])
          .catch((err) => {
            console.log(err)
            res.send("cannot connect")
            return
          });
        }else{
          firewall = true
          conn.write('/ip/firewall/raw/set',[
            "=.id=1",
            "=disabled=no"
          ])
          conn.write('/ip/firewall/raw/set',[
            "=.id=2",
            "=disabled=no"
          ])
          .catch((err) => {
            console.log(err)
            res.send("cannot connect")
            return
          });
        }
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

app.get('*', function(req, res){
  res.status(404).send('what???');
});

console.log("---------------------------------------------")
console.log(" is active and running for service")
console.log("---------------------------------------------")


app.listen(8080)