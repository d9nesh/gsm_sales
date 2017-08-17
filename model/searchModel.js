const mysql = require('mysql');
const config = require('./config.js');

var db = config.search;
var connection = mysql.createConnection(db);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var getData = function  (query, callback) {
  connection.query(query, true, (error, results, fields) => {
    if (error) {
      callback(error, undefined);
    }
    else {
      callback(undefined, results[0]);
    }
  });
};

module.exports = {
  getData
};
