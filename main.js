const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const fs = require('fs')
const bodyParser = require("body-parser");
const routing = require('./lib/routes.json')
const db = require("./lib/database")
const { json } = require('body-parser')
const RosApi = require('node-routeros').RouterOSAPI;



app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'))
app.set('view engine', 'ejs')


const conn = new RosApi({
  host: '185.93.68.2',
  user: 'admin',
  password: 'utku1994',
});




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




// conn.connect()
//     .then(() => {
//         // Connection successful

//         // Let's add an IP address to ether2
//         conn.write('/ppp/secret/add',[
//          '=name=utkASDASu',
//          '=password=utkuadsd1994',
//          '=profile=denemevpn',
//         ]
//         )
//             .then((data) => {
//                for(let i = 0; i < data.length; i++)
//                {
//                   console.log(i)
//                   console.log(data[i].profile, data[i].password);
//                }
                

//                 // Added the ip address, let's print it
//                 return conn.write('/ip/address/print', ['?.id=' + data[0].ret]);
//             })
//     })
//     .catch((err) => {
//         console.log(err);
//     });


app.get('/home', function (req, res) {
  res.render('index', {
    // isim : localisim,
  })
})



console.log("---------------------------------------------")
console.log(" is active and running for service")
console.log("---------------------------------------------")


app.listen(80)