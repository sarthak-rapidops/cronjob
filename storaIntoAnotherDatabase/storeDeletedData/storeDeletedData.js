const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const dotenv = require('dotenv')
dotenv.config()

const importCSV = (ws)=>{
    let deleteStream = fs.createReadStream('./deleted_Data_file.csv')

    let csvData = [];
    let rowHeader; 
    let array_Of_ID=[];
    let userid;
    let deleteid;
    //rowHeader.push(csvData[[0]])
    let csvStream = fastcsv
    .parse()
    .on("data", (data)=> {
        //console.log(data)
        csvData.push(data);
        //console.log(typeof csvData)
        
       
    })
    .on("end", ()=> {
        // remove the first line: header
        rowHeader=csvData.shift();
        //console.log(csvData.length)
        //console.log(csvData[0][0])
        for(let i =0; i<csvData.length;i++){
            array_Of_ID.push(csvData[i][0])
        }
        console.log(array_Of_ID.length)
        console.log(array_Of_ID)
        
        // create a new connection to the database
        const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database:"test"
        });
        //console.log(csvData.length)

        // open the connection
        connection.connect(error => {
            if (error) {
                console.error(error);
            } else {
                for(let i=0; i<array_Of_ID.length; i++){
                    userid=array_Of_ID[i]
                    console.log(userid)
                    console.log(csvData[i])
                    connection.query("SELECT * FROM user WHERE id = ?",userid, (error, results) =>{
                        if (error) {
                            console.log(error);
                            //break;
                        }
                        else{
                                if (results.length > 0) {
                                    console.log('already exist');
                                   // continue;

                                
                                } else {
                                            connection.query("INSERT INTO user (id, name) VALUES (?)", [csvData[i]], (error, response) => {
                                            console.log(error || response);
                                            });     
                                            connection.query("DELETE FROM user where id= ? ",)          
                                        }
                            }
                        });
                    }
            }
        });
    });
    stream.pipe(csvStream);
}

module.exports = importCSV;
//importCSV()