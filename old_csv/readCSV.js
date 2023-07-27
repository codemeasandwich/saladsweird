const fs = require('fs');
//const csvs = 'old_csv'

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        /*
                fs.readdir(csvs, function (dirErr, files) {
                    if (dirErr) {
                        reject(dirErr);
                        return;
                    }
        
                    let result = {};
                    let csvFiles = files.filter(file => file.endsWith('.csv'));
                    console.log(files)
                    let fileCount = csvFiles.length
                    csvFiles.forEach(file => {*/
        fs.readFile(filePath, 'utf8', function (fileErr, data) {
            if (fileErr) {
                console.log('Error: ' + fileErr);
                return reject(fileErr);
            } // END if

            // Split the file into lines
            let lines = data.split('\n');

            // Split the first line into headers
            let headers = lines[0].trim().split(',');

            // Initialize an array to hold our parsed objects
            const rows = []
            // Loop over the rest of the lines
            for (let i = 1; i < lines.length; i++) {
                // Split the line into fields
                let fields = lines[i].trim().split(',');

                // Initialize an object to hold the parsed fields
                let object = {};

                // Loop over the fields and add them to the object
                for (let j = 0; j < headers.length; j++) {
                    object[headers[j]] = fields[j];
                } // END for
                rows.push(object)
                // Add the object to the array
            } // END for
            resolve(rows);
            /*
            result[file.split('.')[0]] = rows;

            fileCount--;
            if (0 === fileCount) {
                // Return the objects through the callback
                resolve(result);
            }*/
        }); // END readFile
        /* }) // END csvFiles.forEach
     }) // END readdir
 */
    }) // END Promise
} // END readCSV

module.exports = readCSV;
