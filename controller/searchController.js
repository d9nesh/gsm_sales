var getdataObjBysearchTermId = (searchTermId, results) => {
    var objId;
    for (var i = 0; i < results.length; i++) {
      if (results[i].id == searchTermId) {
        objId = i;
      }
    }
    return results[objId];
};

var getAsinDetailsObj = (searchTermId, results) => {
  var asinDetailsData = [];
  for (var i = 1; i <= 15; i++) {
    asinDetailsData[i] = getdataObjBysearchTermId(searchTermId, results);
  }
  return asinDetailsData
};

var getWordScoresObj = (searchTermId, results) => {
  var wordScoresData = [];
  for (var i = 1; i <= 25; i++) {
    wordScoresData[i] = getdataObjBysearchTermId(searchTermId, results);;
  }
  return wordScoresData;
};

var getWordScores = (data, index, whatData) => {
  var key;

  if (whatData === 'word') {
    key = 'word'+index;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'score') {
    key = `word${index}score`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

};

var getAsinDetails = (data, index, whatData) => {
  var key;

  if (whatData === 'asin') {
    key = 'asin'+index;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'titlescore') {
    key = `asin${index}titlescore`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'price') {
    key = `asin${index}price`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'salesestimate') {
    key = `asin${index}salesestimate`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'profitestimate') {
    key = `asin${index}profitestimate`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'sourcingprice') {
    key = `asin${index}sourcingprice`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'fbafees') {
    key = `asin${index}fbafees`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'titlesearchtermpercentage') {
    key = `asin${index}titlesearchtermpercentage`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }

  else if (whatData === 'titlesearchtermpointspercent') {
    key = `asin${index}titlesearchtermpointspercent`;
    if (data[key] === null) {
      return '-';
    }
    else{
      return data[key];
    }
  }
};

module.exports = {
  getdataObjBysearchTermId,
  getAsinDetailsObj,
  getWordScoresObj,
  getWordScores,
  getAsinDetails
};
