//const company_id = require('../db_apis/get_cmat_info.js');
const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

async function get(req, res, next) {
//function get(req, res, next) {
  try {
    const context = {};

    //context.company_id = req.params.id;
	console.log('Inside cntroller file');
    console.log(context.company_id);
	const connection1 = await oracledb.getConnection(dbConfig.fcmatdb);
	let binds = {cm_id : req.params.id};
	let options = {
      outFormat: oracledb.ARRAY   // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };

	let result = await connection1.execute("select A.ORIG_SYSTEM_REFERENCE SAP_COMPANY_ID,B.PARTY_NUMBER COMPANY_CMAT_ID,B.PARTY_NAME,NVL(B.ATTRIBUTE12,'CUSTOMER') Customer_Type,decode(b.secure_customer,10002,'Y','N') secure_customer from HZ_ORIG_SYS_REFERENCES A, APPS.HZ_PARTIES B where A.ORIG_SYSTEM='SAP50' AND A.ATTRIBUTE1 = 'C' AND A.STATUS = 'A' AND A.OWNER_TABLE_NAME = 'HZ_PARTIES' AND A.OWNER_TABLE_ID = B.PARTY_ID AND B.PARTY_TYPE = 'ORGANIZATION' AND B.STATUS = 'A' and A.ORIG_SYSTEM_REFERENCE = :cm_id",
				binds, options);
		
		context.SAP_COMPANY_ID= result.rows[0][0];
		context.COMPANY_CMAT_ID= result.rows[0][1];
		context.PARTY_NAME= result.rows[0][2];
		context.Customer_Type= result.rows[0][3];
		context.secure_customer= result.rows[0][4];
	const connection2 = await oracledb.getConnection(dbConfig.teimdb);
	let binds2 = {cmt_id : context.COMPANY_CMAT_ID};
	let options2 = {
      outFormat: oracledb.ARRAY   // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };

	let result2 = await connection2.execute("SELECT distinct system_Serial_number , role_id FROM EIM_PR_IB_LATEST A where role_id in (19,13,21,16) and A.CMAT_CUSTOMER_ID =:cmt_id",
				binds2, options2);
		context.system_Serial_number= result2.rows[0][0];
		context.role_id= result2.rows[0][1];
		
		console.log('rows ',result2.rows[0][0]);

	console.log('contrller file end');
    if (req.params.id) {
      if (context) {
        res.status(200).json(context);
      } else {
        console.log('Sending 404')
        res.status(404).end();
      }
    } else {
      res.status(200).json(context);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;