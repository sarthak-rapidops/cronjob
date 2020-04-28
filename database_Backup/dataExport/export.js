const {exec} = require('child_process')
const dotenv = require('dotenv')

dotenv.config()
let dumpFile = "dump.sql";
console.log(dumpFile)
// Database connection settings.

// Execute a MySQL Dump and redirect the output to the file in dumpFile variable.
const exportDB =()=>{
    let exportFrom = {
        host:"127.0.0.1",
        user: "root",
        database: "test"
    }
    /*console.log(exportFrom.host)
    console.log(exportFrom.user)
    console.log(exportFrom.database)*/
    exec(`mysqldump -u${exportFrom.user}  --compact ${exportFrom.database} > backUpData/${dumpFile}`, (err, stdout, stderr) => {
        if (err)
        { 
             console.error(`exec error: ${err}`); return; 
        }
        
        console.log(`Now, importing data to the ${importTo.database} database`);
    });
}
module.exports = exportDB;