const database   = require('../services/database.js');
const oracledb   = require('oracledb');

console.log('Inside db_apis ');

// Find dept function starts here
async function find(context) {
 let company_id=context.company_id;
 console.log('Inside db_apis company_id ',company_id);
 const binds = {
  p_sn: `${company_id}`,
 }

 const result = await database.getDepartment(company_id);
 console.log(`Result: ${JSON.stringify(result)}`);
 return result;
}
// Find dept function ends here

module.exports.find = find;