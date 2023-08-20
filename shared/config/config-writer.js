const fs = require('fs');
const configProd = require('./config.prod.js');
const configDev = require('./config.dev.js');
const { argv } = require('process');

// TODO: change to ts, use interface

var data = null;
if (argv[2] === 'prod') {
    data = configProd
}
else if (argv[2] === 'dev') {
    data = configDev
}

const jsonData = JSON.stringify(data, null, 2); // Convert object to formatted JSON string

// works if called from frontend or backend
const filePath = 'src\\config.json';

fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
        console.error('Error writing to JSON file:', err);
    } else {
        console.log('Data written to JSON file successfully');
    }
});