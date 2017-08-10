const dateFormat = require('dateformat');

var parseData = (data) => {
  var saleData = []
  for (var i in data){
    saleData[i] = {
      "saledate" : dateFormat(data[i].saledate, "yyyy-mm-dd"),
      "hours" : data[i].hours,
      "minutes" : data[i].minutes,
      "sum_quantity" : data[i]['sum(quantity)'],
      'sum_projectedprofit' : data[i]['sum(projectedprofit)'],
      'max_purchasedate' : data[i]['max(purchasedate)']
    }
  }
  return saleData
};

module.exports = {
  parseData
};
