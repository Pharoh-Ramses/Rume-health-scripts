const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const ObjectsToCsv = require('objects-to-csv');

// Specify the path to the Downloads directory
const downloadsDir = path.join(require('os').homedir(), 'Downloads');

// Construct the file paths
const inputFile = path.join(downloadsDir, 'experian_file.csv');
const outputFile = path.join(downloadsDir, 'experian_extracted.csv');

// Check if the input file exists
if (fs.existsSync(inputFile)) {
  const results = [];

  // Read the CSV file and extract the desired columns
  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => {
      if (data.pd_PayerName) {
        const extractedData = {
          inp_REF: data.inp_REF,
          inp_SLN: data.inp_SLN,
          inp_SFN: data.inp_SFN,
          inp_SDOB: data.inp_SDOB,
          pd_PayerName: data.pd_PayerName,
          pd_INS_MemberId: data.pd_INS_MemberId,
          pd_INS_Group: data.pd_INS_Group,
          pd_INS_GroupName: data.pd_INS_GroupName,
          pd_INS_BegDate: data.pd_INS_BegDate,
          pd_INS_EndDate: data.pd_INS_EndDate
        };
        results.push(extractedData);
      }
    })
    .on('end', () => {
      // Convert the extracted data to CSV format
      const csvData = new ObjectsToCsv(results);

      // Write the extracted data to a new CSV file
      csvData.toDisk(outputFile, { append: false })
        .then(() => {
          console.log(`Data extracted and saved to ${outputFile}`);
        })
        .catch((error) => {
          console.error('Error occurred while writing the CSV file:', error);
        });
    });
} else {
  console.log('File not found: experian_file.csv');
}

