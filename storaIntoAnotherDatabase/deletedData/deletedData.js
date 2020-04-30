const mongodb = require("mongodb").MongoClient;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const dotenv = require('dotenv')
dotenv.config()

const deletedData = ()=>{


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
      .find({"name":"uvw"})   
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(data);

        fs.writeFile("../deleted_Data_file.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write successfully!");
        });    
        client.close();
    });
    client.db('example').collection("employee").deleteMany({"name":"uvw"},(err,obj)=>{
        if(err) throw err;
        console.log("data deleted")
        client.close();
        });
    });
}

//module.exports = deletedData
deletedData()