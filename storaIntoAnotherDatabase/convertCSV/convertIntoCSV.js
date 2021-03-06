const mongodb = require("mongodb").MongoClient;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const dotenv = require('dotenv')
dotenv.config()

const convertCSV= ()=>{


// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db("example")
      .collection("employee")
      .find({})   
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(data);

        fs.writeFile("./csvfile.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write successfully!");
        });

        client.close();
      });
  }
);
}
module.exports = convertCSV;
//convertCSV();