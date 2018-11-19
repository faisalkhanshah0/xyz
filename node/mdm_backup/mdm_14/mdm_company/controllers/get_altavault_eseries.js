//const company_id = require('../db_apis/get_cmat_info.js');
const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

// Definition of get_altavault routes function starts here
async function get_altavault(req, res, next) {
  try {
		const connection1 = await oracledb.getConnection(dbConfig.fcmatdb); // Db connection created
		let serial_number = req.query.serial_number.trim(); // Splitting query string variable 
		let obj;
		let options = {
			outFormat: oracledb.ARRAY   // query result format
			// extendedMetaData: true,   // get extra metadata
			// fetchArraySize: 100       // internal buffer allocation size for tuning
		};

		// let binds = {serial_number};  // var to bind with first query
		// let result = await connection1.execute("select * from Tablename where serialno = :serial_number", binds, options);

		if(result.rows.length){
			obj = {
				EntryPoint:"Altavault",
				Primary_Serial_Number: 941517000062,
				Partner_Serial_Number: 211409000190,
				Primary_Serial_Number_Status: "Valid",
				Primary_Serial_Number_Error: "User Has Access to Serial Number",
				ASUP_STATUS: "ON",
				Last_Asup_Date: "5/5/2017"
			}

			let obj3 = {
				"Existing_Response_Time": "NBD PREMIUM ONSITE",
				"Existing_Service_End_Date": "12/12/2018",
				"Existing_Warranty_End_Date": "12/12/2018"
		 }
			
			obj.Existing_Service = obj3;
		
			// let binds = {Primary_Serial_Number : result.rows[0][0]};  // var to bind with second query
			// let result2 = await connection1.execute("select * from Tablename where serialno = :Primary_Serial_Number", binds, options);
				
			let obj2 = {
				"AVA_Hardware_Parts": "AVA400-144TB-4TBX36-R6",
				"AVA_Storage_Parts": "AVA10S-4TBX12-QS-R6",
				"AVA_SW_Cap_Parts": "AVA-SW-400-0P-C"
			}
			obj.AV_System = obj2;
	

		
		}

   
    if(obj){
      console.timeEnd("Time this");
      res.status(200).json(obj);
    }
    else{
      res.status(200).json({status: 404,message:'Data Not Found'});
    }

	
  } catch (err) {
    next(err);
  }
}
// Definition of get_altavault routes function ends here


// Definition of get_eseries routes function starts here
async function get_eseries(req, res, next) {
  try {

		// const connection1 = await oracledb.getConnection(dbConfig.fcmatdb); // Db connection created
		// let serial_number = req.query.serial_number.trim(); // Splitting query string variable 
		// let obj;
		// let options = {
		// 	outFormat: oracledb.ARRAY   // query result format
		// 	// extendedMetaData: true,   // get extra metadata
		// 	// fetchArraySize: 100       // internal buffer allocation size for tuning
		// };

		// let binds = {serial_number};  // var to bind with first query
		// let result = await connection1.execute("select * from Tablename where serialno = :serial_number",
		// 			binds, options);

		obj = {
			Entry_Point: "Eseries",
			Primary_Serial_Number: "1124FG000524",
			Partner_Serial_Number: "211409000190",
			Primary_Serial_Number_Status: "Valid",
			Primary_Serial_Number_Error: "User Has Access to Serial Number",
			ASUP_STATUS: "ON",
			Last_Asup_Date: "5/5/2017",
			ESeries_Software:[]
		}
	
		//Query 2
	
		let obj2 = {
			Family: "E-SERIES",
			System: "2610",
			"Internal Storage": "E2600 2GB CNTL NO HIC",
			Type: "High Availability (Duplex)"
	
		}
	
		obj.ESeries_System = obj2;
	
	
			//Query 4
			let result4 = ["FDE_SKM-2600","REMOTE_MIRRORING"];
			for(let i=0;i<result4.length;i++){
				obj.ESeries_Software.push(result4[i]);
			}
							
	
		//Query 5
		let result5 = [3,4];
	
		for(let i=0;i<result5.length;i++){
	
			let obj5 = {
									Storage: [],
									Expansion_Enclosure: [],
									Base_Enclosure: "DE5600 DISKLESS CM",
								 }
	
				//Query 6
								 
				let result6 = [5,6];
				for(let j=0;j<result6.length;j++){
					let obj6 = {
						"Storage Type": "DE6600 NLSAS 3TB",
						"Storage-Quantity": "10"
	
						}
	
					obj5.Storage.push(obj6);   
				}  
				
				 //Query 3
		let result3 = [1,2];
	
		for(let i=0;i<result3.length;i++){
			let obj3 = { 
									"name": "DE6600 DISKLESS DM" ,
									"qty": "10"
								}
	
								obj5.Expansion_Enclosure.push(obj3);  
				}
				obj.ESeries_Storage = obj5;        
	
	
		}
	
	
		//Query 7
	
		let obj7 = {
				Existing_Response_Time: "NBD PREMIUM ONSITE",
				Existing_Service_End_Date: "12/12/2018",
				Existing_Warranty_End_Date: "12/12/2018"
	 }
		
		obj.Existing_Service = obj7;
	
		if(obj){
			console.timeEnd("Time this");
			res.status(200).json(obj);
		}
		else{
			res.status(200).json({status: 404,message:'Data Not Found'});
		}
	
  } catch (err) {
    next(err);
  }
}
// Definition of get_eseries routes function ends here
module.exports = {
	get_altavault,
	get_eseries
}