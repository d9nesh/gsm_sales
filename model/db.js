const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'gsmdev.cnlb2que19vq.us-west-2.rds.amazonaws.com',
  port     : 3306,
  user     : 'gsmsales',
  password : 'gsmsalesdev',
  database : 'gsmdev'
});

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
