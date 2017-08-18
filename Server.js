const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const db = require('./model/db');
const searchModel = require('./model/searchModel');
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

  // console.log('Input Values : ' + asin);
  // console.log('Checkbox Values : ' + asinValues);
  // console.log('Checkbox length : ' + asinValues.split(",").length);

  var profitChartQuery;
  if (asin !== ""){
    profitChartQuery = `CALL select_profit_chart_data("${asin}",${chart})`;
  }else {
    profitChartQuery = `CALL select_profit_chart_data("${asinValues}",${chart})`;
  }

  // console.log('Query => ' + profitChartQuery);

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

app.get('/api/chartdata', (req, res) => {
  var asin = req.query.asin;
  var chart_day = req.query.chart_day;
  var profitChartQuery = `CALL select_profit_chart_data("${asin}",${chart_day})`;

  db.getData(profitChartQuery, (error, results) => {
    if (error) {
        return console.error(error);
      }
      else {
        var chartData = parseChartData.chartData(results);
        // console.log(JSON.stringify(chartData, undefined, 2));
        // console.log(chartData.length);
        res.send({
          data:chartData
        });
      }
  });
});

app.get('/search', (req, res) => {
  var searchQuery = `CALL select_pl_searchterms()`;
  searchModel.getData(searchQuery, (error, results) => {
    if (error) {
      return console.error(error);
    }
    else {
      res.render('search', {
        dataObj : results
      });
    }
  });
});

app.get('/searchDetails', (req, res) => {
  var objId;
  var searchTermId = req.query.search_term_id;
  var searchQuery = `CALL select_pl_searchterms()`;
  searchModel.getData(searchQuery, (error, results) => {
    if (error) {
      return console.error(error);
    }
    else {
      for (var i = 0; i < results.length; i++) {
        if (results[i].id == searchTermId) {
          objId = i;
        }
      }
      res.render('searchDetails', {
        dataObj : results[objId]
      });
    }
  });
});

hbs.registerHelper('checkValue', (data) => {
  if (data == null) {
    return '-';
  }else {
    return data;
  }
});

app.listen(3000);
console.log('Running expressjs on http://127.0.0.1:3000');
