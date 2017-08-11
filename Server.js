const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const db = require('./model/db');
const parseChartData = require('./controller/parseChartData');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  let profitChartDataQuery = `CALL select_profit_chart_asin()`;
  db.getData(profitChartDataQuery, (error, results) => {
    if (error) {
        return console.error(error);
      }
      else {
        res.render('index', {
            products: results
          });
      }
  });
});

app.post('/chart', (req, res) => {
  let chart = parseInt(req.body.chart);
  let asinValues = req.body.asin_values;
  let asin = req.body.asin;
  var profitChartQuery;
  if (asin !== ""){
    profitChartQuery = `CALL select_profit_chart_data("${asin}",${chart})`;
  }else {
    profitChartQuery = `CALL select_profit_chart_data("${asinValues}",${chart})`;
  }
  db.getData(profitChartQuery, (error, results) => {
    if (error) {
        return console.error(error);
      }
      else {
        var saleData = parseChartData.parseData(results);
        var chartData = parseChartData.chartData(results);
        res.render('chart', {
            products: saleData,
            chartData: JSON.stringify(chartData)
          });
      }
  });
});

app.listen(3000);
console.log('Running expressjs on http://127.0.0.1:3000');
