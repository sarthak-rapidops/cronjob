const cron  = require('node-cron')
const covertCSV = require('./convertCSV/convertIntoCSV')
const importCSV = require('./importCSV/importCSV')

cron.schedule('* * * * *',()=>{
    covertCSV();
    importCSV();
})