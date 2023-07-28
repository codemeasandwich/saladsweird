const fs = require('fs');
const path = require('path');
const folder = 'models'

// Object to hold exports
let allExports = {};
// Read the current directory
fs.readdirSync(`./${folder}`).forEach(file => {
    // Don't import self (this file)
    if (file === 'index.js') return;

    // Only import .js files
    if (path.extname(file) !== '.js') return;

    // Import the file and add it to allExports
    allExports[path.basename(`./${folder}/${file}`, '.js')] = require(`./${file}`);
});

module.exports = allExports;
