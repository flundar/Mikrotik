const mysql = require('mysql');
const settings = require('../config.json')
const workaround = "office"
var connect;

console.log(`going to print settings.mysql[1] ? ${settings.mysql[1]}`)
if (workaround == "office")
{
    connect = mysql.createConnection({
    host: settings.mysql[0],
    user: settings.mysql[1],
    password: settings.mysql[2],
    database: settings.mysql[3]
  });
  
}
else if(workaround == "home")
{
    connect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'flundar'
  });
}






module.exports = connect