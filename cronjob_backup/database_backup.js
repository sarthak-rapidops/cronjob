const cron = require('node-cron')
const fs = require('fs')
const dotenv = require('dotenv')
const spawn = require('child_process').spawn

dotenv.config();

cron.schedule('0 * * * * *',()=>{
    const filename= `${process.env.DB_NAME}.sql`
    console.log(filename)
    const wstream = fs.createWriteStream(filename)
    console.log('----------------')
    console.log('database backup')
    const mysqldump = spawn('mysqldump',['-u', process.env.DB_USER,`-p${process.env.DB_PASSWORD}`, process.env.DB_NAME])
    mysqldump
    .stdout
    .pipe(wstream)
    .on('finish',()=>{
        console.log("completed")
    })
    .on('error',(err)=>{
        console.log(err)
    })
})


