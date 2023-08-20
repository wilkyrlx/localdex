const fs = require('fs');
const { argv } = require('process');

let srcPath = __dirname + "/"
if (argv[2] === 'dev') {
    srcPath += '.env.dev'
}
else if (argv[2] === 'prod') {
    srcPath += '.env.prod'
}

const envDestPaths = [
    '../../../backend/.env',
    '../../../frontend/.env'
];

envDestPaths.forEach((dest) => {
    fs.copyFile(srcPath, __dirname + dest, (err) => {
        if (err) {
            console.error('Error writing to .env file:', err);
        } else {
            console.log(`Data written to .env files successfully in ${dest}`);
        }
    })
}
);
