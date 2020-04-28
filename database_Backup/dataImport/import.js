const {exec} = require('child_process')
const dotenv = require('dotenv')

dotenv.config()
let dumpFile ="dump.sql" ;
// Import the database.


const importDB = ()=>{
    let importTo = {
	host: "127.0.0.1",
	user: "root",
	database: "test1"
}
/*console.log(importTo.host)
console.log(importTo.user)
console.log(importTo.database)*/
    exec(`mysql -u${importTo.user}  ${importTo.database} < backUpData/${dumpFile}`, (err, stdout, stderr) => {
        if (err) { 
                    console.error(`exec error: ${err}`); 
                    return; 
                }
    
        console.log(`The import has finished.`);
    });
    
}

module.exports =importDB;