const fs = require('fs');
const readCSV = require('./readCSV');
const folder = 'old_csv'

function csvs() {
    return new Promise((resolve, reject) => {
        // Read the current directory
        fs.readdir(folder, function (err, files) {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
            let result = {};
            // Filter the files to get only the CSV files
            let csvFiles = files.filter(file => file.endsWith('.csv'));

            let fileCount = csvFiles.length

            // Read each CSV file
            csvFiles.forEach(file => {
                console.log(` -> ${folder}/${file}`)
                readCSV(`${folder}/${file}`)
                    .then(data => {
                        result[file.split('.')[0]] = data;

                        fileCount--;
                        if (0 === fileCount) {
                            // Return the objects through the callback
                            resolve(result);
                        }
                    }) // END then
            }); // END csvFiles.forEach
        }); // END fs.readdir

    }); // END Promise
} // END csvs

module.exports = csvs;