const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const db = require('./model/db');
const searchModel = require('./model/searchModel');
const parseChartData = require('./controller/parseChartData');
const searchController = require('./controller/searchController');

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
          res.send({
          data:chartData
        });
      }
  });
});

app.get('/searchterms', (req, res) => {
  var searchQuery = `CALL select_pl_searchterms()`;
  searchModel.getData(searchQuery, (error, results) => {
    if (error) {
      return console.error(error);
    }
    else {
      res.render('searchterms', {
        dataObj : results
      });
    }
  });
});

app.post('/searchtermsdetails', (req, res) => {
  var searchTermId = req.body.search_term_id;
  var searchQuery = `CALL select_pl_searchterms()`;
  searchModel.getData(searchQuery, (error, results) => {
    if (error) {
      return console.error(error);
    }
    else {
      var dataObjBysearchTermId = searchController.getdataObjBysearchTermId(searchTermId, results);
      var asinDetailsObj = searchController.getAsinDetailsObj(searchTermId, results);
      var wordScoresObj = searchController.getWordScoresObj(searchTermId, results);

      res.render('searchtermsdetails', {
        dataObj       : dataObjBysearchTermId,
        wordScores    : wordScoresObj,
        asinDetails   : asinDetailsObj
      });
    }
  });
});

app.post('/api/search/insert', (req, res) => {
  var searchterm = req.body.searchterm;
  var ip_address = req.body.ip_address;
  var searchQuery = `CALL insert_pl_searchterms('${searchterm}',' ${ip_address}')`;
  searchModel.getData(searchQuery, (error, results) => {
    if (error) {
      res.send(error);
      return console.error(error);
    }
    else {
      res.send({
        searchterm,
        ip_address
      });
    }
  });
});

app.get('/privatemanufacturer', (req, res) => {
  res.render('privatemanufacturer', {});
});

app.get('/privatelabelpurchase', (req, res) => {
  res.render('privatelabelpurchase', {});
});

app.get('/api/manufacturer/data/get', (req, res) => {
  var dataObj = [];

  for (var i = 0; i < 25; i++) {
    var data = {
      id          : i,
      name        : 'XYZ',
      address     : 'ABC',
      website     : 'demo.com',
      category    : 'abc',
      port        : 'xyz',
      information : 'XYZ',
      saleName    : 'XYZ',
      saleEmail   : 'xyz@demo.com' ,
      tech_name   : 'ABC',
      tech_email  : 'abc@demo.com'
      // action      : 'XYZ'
    };
    dataObj[i] = data;
  }

  res.send({rows : dataObj});
});

app.post('/api/manufacturer/data/post', (req, res) => {
  var data = req.body;
  console.log(data);
  res.send(data);
});

app.get('/api/purchase/data/get', (req, res) => {
  var dataObj = [];

  for (var i = 0; i < 25; i++) {
    var data = {
      id          : i,
      searchTerm  : 'XYZ',
      quantity    : '0',
      unitCost    : '$ 0',
      shipping    : 'XYZ',
      category    : 'xyz',
      productWeight: '0',
      caseWeight  : '0',
      casePack    : 'XYZ',
      shippingTerm: 'ABC',
      label       : 'xyz' ,
      hsCode      : 'ABC',
      purchaseDate: '09-12-2017',
      shippingDate: '09-12-2017',
      leadTime    : '00:00',
      // action      : 'XYZ'
    };
    dataObj[i] = data;
  }

  res.send({rows : dataObj});
});

app.post('/api/purchase/data/post', (req, res) => {
  var data = req.body;
  console.log(data);
  res.send(data);
});

hbs.registerHelper('checkValue', (data) => {
  if (data == null) {
    return '-';
  }else {
    return data;
  }
});

hbs.registerHelper('getWordScores', (data, index, whatData) => {
  return searchController.getWordScores(data, index, whatData);
});

hbs.registerHelper('getAsinDetails', (data, index, whatData) => {
  return searchController.getAsinDetails(data, index, whatData);
});

app.listen(3000);
console.log('Running expressjs on http://127.0.0.1:3000');
