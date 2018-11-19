//const company_id = require('../db_apis/get_cmat_info.js');
const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

// Definition of get routes function starts here
async function get(req, res, next) {
  try {
    const context = {SAP_COMPANY:[]}; // final result variable initialization
	console.log('Inside cntroller file');
	const connection1 = await oracledb.getConnection(dbConfig.fcmatdb); // Db connection created
	let company_id_arr = req.query.company_id.trim().split(','); // Splitting query string variable 
	let ref_trans_type=req.query.source_id?req.query.source_id.trim():'NA'; //Assignment for second query string variable
		for(let i=0;i<company_id_arr.length;i++){     
			let options = {
					  outFormat: oracledb.ARRAY   // query result format
					  // extendedMetaData: true,   // get extra metadata
					  // fetchArraySize: 100       // internal buffer allocation size for tuning
					};
			let binds = {cm_id : company_id_arr[i]};  // var to bind with first query
			let result;
			  // CMAT block of code starts
			if (ref_trans_type=='CMAT') 
			{
				 result = await connection1.execute("select A.ORIG_SYSTEM_REFERENCE SAP_COMPANY_ID,B.PARTY_NUMBER COMPANY_CMAT_ID,B.PARTY_NAME,NVL(B.ATTRIBUTE12,'CUSTOMER') Customer_Type,decode(b.secure_customer,10002,'Y','N') secure_customer from HZ_ORIG_SYS_REFERENCES A, APPS.HZ_PARTIES B where A.ORIG_SYSTEM='SAP50' AND A.ATTRIBUTE1 = 'C' AND A.STATUS = 'A' AND A.OWNER_TABLE_NAME = 'HZ_PARTIES' AND A.OWNER_TABLE_ID = B.PARTY_ID AND B.PARTY_TYPE = 'ORGANIZATION' AND B.STATUS = 'A'  and B.PARTY_NUMBER= :cm_id",
								binds, options);

			} // CMAT block of code ends
			else
			{ // Company ID block of code starts
				 result = await connection1.execute("select A.ORIG_SYSTEM_REFERENCE SAP_COMPANY_ID,B.PARTY_NUMBER COMPANY_CMAT_ID,B.PARTY_NAME,NVL(B.ATTRIBUTE12,'CUSTOMER') Customer_Type,decode(b.secure_customer,10002,'Y','N') secure_customer from HZ_ORIG_SYS_REFERENCES A, APPS.HZ_PARTIES B where A.ORIG_SYSTEM='SAP50' AND A.ATTRIBUTE1 = 'C' AND A.STATUS = 'A' AND A.OWNER_TABLE_NAME = 'HZ_PARTIES' AND A.OWNER_TABLE_ID = B.PARTY_ID AND B.PARTY_TYPE = 'ORGANIZATION' AND B.STATUS = 'A' and A.ORIG_SYSTEM_REFERENCE = :cm_id",
								binds, options);
					
			}
			  // Company ID block of code starts
					
					if(result.rows.length){
												let obj = {
							SAP_COMPANY_ID: result.rows[0][0],
							COMPANY_CMAT_ID: result.rows[0][1],
							PARTY_NAME: result.rows[0][2],
							Customer_Type: result.rows[0][3],
							secure_customer: result.rows[0][4]
						}
						
					const connection2 = await oracledb.getConnection(dbConfig.teimdb);
					
					let binds2 = {cmt_id : obj.COMPANY_CMAT_ID}; // var to bind with second query
					
					let result2 = await connection2.execute("SELECT distinct system_Serial_number , role_id FROM EIM_PR_IB_LATEST A where role_id in (19,13,21,16) and A.CMAT_CUSTOMER_ID =:cmt_id ",
								binds2, options);   // SYSTEM_SERIAL_NUMBER fetching query 
					 console.log(result2.rows);
					obj.SYSTEM_SERIAL_NUMBER = [];
					// loop for system_Serial_number starts
					for(let j=0;j<result2.rows.length;j++){  
						let obj2 = {	
						system_Serial_number: result2.rows[j][0],
						role_id: result2.rows[j][1]	
						}
						obj.SYSTEM_SERIAL_NUMBER.push(obj2);
					}
					// loop for system_Serial_number ends
						
					context.SAP_COMPANY.push(obj);
					
					}
					else{
						/*let obj = {
							message: 'Data Not Found'
						}	
						context.data.push(obj);*/		
					}
					console.log('contrller file end');

			
		}
	
	// final check block for result starts 
	if (context.SAP_COMPANY.length>0) {
		res.status(200).json(context);
	  } else {
		console.log('Sending 404')
		res.status(404).json({message:'No Row Return'});
	  }
	// final check block for result ends
	
  } catch (err) {
    next(err);
  }
}
// Definition of get routes function ends here
module.exports.get = get;