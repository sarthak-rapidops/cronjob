// Include the dependency we need.
const exportDB = require('./dataExport/export')
const importDB = require('./dataImport/import')
const cron = require('node-cron')


cron.schedule('* * * * *',()=>{
	console.log(`Starting exporting data from the database`);
	exportDB();
	importDB();
})




	
