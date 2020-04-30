const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const dotenv = require('dotenv')
dotenv.config()

let stream = fs.createReadStream(`${process.env.Stream}`);

let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database:process.env.DB_EXPORT
    });

    // open the connection
    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        let query =
        `INSERT INTO ${process.env.Table_Name} (id, name) VALUES ?`;
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);