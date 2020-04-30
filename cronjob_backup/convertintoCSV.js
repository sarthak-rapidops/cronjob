const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const fs = require("fs");
const dotenv = require('dotenv')
dotenv.config()
const ws = fs.createWriteStream(`${process.env.Stream}`);

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db(`${process.env.Mongo_Database}`)
      .collection(`${process.env.Collection}`)
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        fastcsv
          .write(data, { headers: true })
          .on("finish", function() {
            console.log("Write to CSVFILE successfully!");
          })
          .pipe(ws);

        client.close();
      });
  }
);