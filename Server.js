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

app.post('/searchDetails', (req, res) => {
  var objId;
  var wordScoresData = [];
  var asinDetailsData = [];
  var searchTermId = req.body.search_term_id;
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

      for (var i = 1; i <= 15; i++) {
        asinDetailsData[i] = results[objId];
      }

      for (var i = 1; i <= 25; i++) {
        wordScoresData[i] = results[objId];
      }

      res.render('searchDetails', {
        dataObj       : results[objId],
        wordScores    : wordScoresData,
        asinDetails   : asinDetailsData
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

hbs.registerHelper('getWordScores', (data, index, whatData) => {
  var key;
  if (whatData === 'word') {
    key = 'word'+index;
    return data[key];
  }
  else if (whatData === 'score') {
    key = `word${index}score`;
    return data[key];
  }

});

hbs.registerHelper('getAsinDetails', (data, index, whatData) => {
  var key;
  if (whatData === 'asin') {
    key = 'asin'+index;
    return data[key];
  }
  else if (whatData === 'titlescore') {
    key = `asin${index}titlescore`;
    return data[key];
  }
  else if (whatData === 'price') {
    key = `asin${index}price`;
    return data[key];
  }
  else if (whatData === 'salesestimate') {
    key = `asin${index}salesestimate`;
    return data[key];
  }
  else if (whatData === 'profitestimate') {
    key = `asin${index}profitestimate`;
    return data[key];
  }
  else if (whatData === 'sourcingprice') {
    key = `asin${index}sourcingprice`;
    return data[key];
  }
  else if (whatData === 'fbafees') {
    key = `asin${index}fbafees`;
    return data[key];
  }
  else if (whatData === 'titlesearchtermpercentage') {
    key = `asin${index}titlesearchtermpercentage`;
    return data[key];
  }
  else if (whatData === 'titlesearchtermpointspercent') {
    key = `asin${index}titlesearchtermpointspercent`;
    return data[key];
  }
});

app.listen(3000);
console.log('Running expressjs on http://127.0.0.1:3000');
