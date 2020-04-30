const cron = require("node-cron")
const express = require('express')
const fs = require('fs')
const app = express();

/*cron.schedule('* * * * * *',() =>{
    console.log("running a task every second")
})*/

// to delete the log file from server on the 28 of every month
cron.schedule('* * * 21 * * ',()=>{
    console.log("----------")
    console.log("running cron job");
    fs.unlink("./error.log", err => {
        if (err) throw err;
        console.log("Error file succesfully deleted")
    })
})

app.listen(3000)