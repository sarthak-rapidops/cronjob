const mongodb = require("mongodb").MongoClient;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const dotenv = require('dotenv')
dotenv.config()

const convertCSV= ()=>{


// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb+srv://sarthak:sarthak@mongodb-cgil4.mongodb.net/Student?retryWrites=true&w=majority";

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db("Student")
      .collection("test")
      .find({Course:"MCA"},{"Name.first_name":1})   
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(data);

        fs.writeFile("../csvfile.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write successfully!");
        });

        client.close();
      });
  }
);
}
// module.exports = convertCSV;
 convertCSV();