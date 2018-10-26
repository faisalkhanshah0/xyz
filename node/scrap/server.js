
const fs = require('fs');

var xmldata = fs.readFileSync('../../x/x.txt', 'utf8');
var convert = require('xml-js');

var result = convert.xml2json(xmldata, {compact: true, spaces: 4});
var resultxml = JSON.parse(result);
resultxml.urlset.url.forEach(element => {
    fs.appendFileSync('data.txt', element.loc._cdata+'\n');
    console.log(element.loc._cdata);
});
// console.log(resultxml.urlset.url);

// console.time('t');
