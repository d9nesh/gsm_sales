const dateFormat = require('dateformat');

var parseData = (data) => {
  var saleData = []
  for (var i in data){
    saleData[i] = {
      "saledate" : dateFormat(data[i].saledate, "UTC:yyyy-mm-dd"),
      "hours" : data[i].hours,
      "minutes" : data[i].minutes,
      "sum_quantity" : data[i].quantity,
      'sum_projectedprofit' : data[i].projectedprofit,
      'max_purchasedate' : data[i]['max(purchasedate)']
    }
  }
  return saleData
};

var chartData = (data) => {
  var dataObj = [];
  var dateExist = [];
  for (var i in data){
    var sale_date = dateFormat(data[i].saledate, "yyyymmdd");
    var print_date = dateFormat(data[i].saledate, "yyyy-mm-dd");
      dataObj[i] = {
        date_time : dateFormat(data[i]['max(purchasedate)'], "UTC:ddd mmm dd yyyy HH:MM:ss"),
        quantity : data[i].quantity,
        sale_date: sale_date,
        sale_hour: data[i].hours,
        profit:  data[i].projectedprofit,
        printDate: print_date
      }
    }
  return dataObj;
};

module.exports = {
  parseData,
  chartData
};
