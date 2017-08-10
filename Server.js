var express = require('express');
const hbs = require('hbs');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

app.post('/chart', (req, res) => {
  console.log(req.body);
  let chart = parseInt(req.body.chart);
  let asinValues = req.body.asin_values;
  let asin = req.body.asin;
  let segment = req.body.segment;
  var select_profit_chart_data;
  if (asin !== ""){
    select_profit_chart_data = `CALL select_profit_chart_data("${asin}",${chart})`;
  }else {
    select_profit_chart_data = `CALL select_profit_chart_data("${asinValues}",${chart})`;
  }


  console.log('Business Segment: ' + segment);
  console.log('ASIN: ' + select_profit_chart_data);
  console.log('Day to chart: ' + typeof chart);

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
