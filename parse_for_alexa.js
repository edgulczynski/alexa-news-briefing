var alexaFeed = [],
request = require('request'),
fs = require("fs");
request.get({
  url: "https://api.nytimes.com/svc/topstories/v2/home.json",
  qs: {
    'api-key': "dc8a609689f14a5982155e0d68d53acb"
  },
}, function(err, response, body) {
  body = JSON.parse(body);
  var parseForAlexa = function(raw){
    var parsedRecord = {
        "uid": raw.short_url,
        "updateDate": raw.updated_date,
        "titleText": raw.title,
        "mainText": raw.byline + ": " + raw.abstract,
        "redirectionUrl": raw.url
    };
    return parsedRecord;
  }
  alexaFeed = body.results.map(parseForAlexa);
  fs.writeFile("docs/home.json", JSON.stringify(alexaFeed));
});

