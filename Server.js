var express = require('express');
const hbs = require('hbs');
var mysql = require('mysql');
var app = express();

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

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerPartials(__dirname + '/views/partials');

// app.set('view engine', 'jade');
// app.set('views', './views');

app.get('/', (req, res) => {
  let select_profit_chart_asin = `CALL select_profit_chart_asin()`;
  connection.query(select_profit_chart_asin, true, (error, results, fields) => {
    // console.log(JSON.stringify(results, undefined, 2));
    if (error) {
      return console.error(error.message);
    }
    res.render('index', {
      products: results[0]
    });
  });
  // connection.end();
});

app.get('/chart', (req, res) => {
  let chart = req.query['chart'];
  let asinValues = req.query['asin-values'];
  let asin = req.query['asin'];
  let segment = req.query['segment'];
  var select_profit_chart_data;
  if (asin !== ""){
    select_profit_chart_data = `CALL select_profit_chart_data("${asin}",10)`;
  }else {
    select_profit_chart_data = `CALL select_profit_chart_data("${asinValues}",10)`;
  }
  console.log(select_profit_chart_data);

  // console.log('Business Segment: ' + segment);
  // console.log('ASIN: ' + asin);
  // console.log('Day to chart: ' + chart);

  connection.query(select_profit_chart_data, true, (error, results, fields) => {
    // console.log(JSON.stringify(results[0][0]['sum(quantity)'], undefined, 2));
    var data = results[0];
    var saleData = []
    for (var i in data){
      //console.log("Sale quantity: " + data[i]['sum(quantity)']);
      saleData[i] = {
        "saledate" : data[i].saledate,
        "hours" : data[i].hours,
        "minutes" : data[i].minutes,
        "sum_quantity" : data[i]['sum(quantity)'],
        'sum_projectedprofit' : data[i]['sum(projectedprofit)'],
        'max_purchasedate' : data[i]['max(purchasedate)']
      }
    }
    if (error) {
      return console.error(error.message);
    }
    res.render('chart', {
      products: saleData
    });
  });

});

app.listen(3000);
console.log('Running expressjs on http://127.0.0.1:3000');
