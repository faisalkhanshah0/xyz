const oracledb = require('oracledb');
//const oracledbT = require('oracledb');
const dbConfig = require('../config/database.js');
const envName  = require('../config/environment.json');

oracledb.outFormat  = oracledb.OBJECT;
//oracledbT.outFormat = oracledb.OBJECT; //connect with TEIM

let numRows = 10;
let serialNumber = {};
var serialNumber1 = {};

console.log('inside database.js file');

async function initialize() {
  if (envName.test) {
    await oracledb.createPool(dbConfig.fcmatdb);
	await oracledb.createPool(dbConfig.teimdb);
	//await oracledbT.createPool(dbConfig.teimdb);
  }
  if (envName.prod) {
    await oracledb.createPool(dbConfig.teimdb);
  }
  if (envName.stage) {
    await oracledb.createPool(dbConfig.teimdb);
  }

}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close();
}

module.exports.close = close;


function doRelease(connection) {
  connection.close(
      function(err) {
      if (err) {
          console.error(err.message);
      }
      });
  }
      
      
function doClose(connection, resultSet) {
resultSet.close(
  function(err) {
  if (err) { console.error(err.message); }
  doRelease(connection);
  });
}


