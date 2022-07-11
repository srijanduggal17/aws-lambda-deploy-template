//////////////////////////
// Purpose is to update the finished inventory count
// for a sku in the database after a manual count
//////////////////////////


// Import libraries
const mysql = require('mysql');

// Database configuration
const options = {
	host: "boilbossdb.coyh1wm7cirj.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "CAKoqNSQs1434GrAnUld",
	charset : 'utf8mb4',
	database: "default"
};

// Connect to database
const con = mysql.createConnection(options);

// Call the database
function dbQuery(queryInput) {
	return new Promise((resolve, reject) => {
		con.query(queryInput, function (err, result, fields) {
			if (err) {
				console.log("Error on Query", err)
				return reject(err)
			};
			resolve(JSON.parse(JSON.stringify(result)));
		});
	});
}


exports.handler = async (event) => {
    // Get list of inventory counts
    const skuList = JSON.parse(event.body);
    
	// Set up query
    let query = "insert into inventory_count (timestamp, sku, qty) values ";
    
    // Loop over each sku and add to query
    const queryList = skuList.map(countObj => {
    	return `(CURRENT_TIMESTAMP, ${con.escape(countObj.sku)}, ${con.escape(countObj.count)})`;
    });
    
    query = query + queryList.join(', ');
    
    await dbQuery(query);
    
    const response = {
        statusCode: 200,
        body: 'Counts Updated'
    };
    return response;
};
