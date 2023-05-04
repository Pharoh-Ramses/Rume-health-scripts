const fs = require("fs");
const csv = require("csv-parser");

const filename = "All Contacts.csv";
const rowsPerFile = 50000;

let fileNumber = 1;
let rowCount = 0;
let outStream = fs.createWriteStream(`ActiveCampaign_${fileNumber}.csv`);
outStream.write(""); // write an empty string to create a new file

fs.createReadStream(filename)
  .pipe(csv())
  .on("data", (row) => {
    // Write header row to each file
    if (rowCount === 0) {
      outStream.write(Object.keys(row).join(",") + "\n");
    }
    // Write row to current file
    outStream.write(Object.values(row).join(",") + "\n");
    rowCount++;

    // If the current file has reached the desired row count, close it and create a new one
    if (rowCount === rowsPerFile) {
      outStream.end();
      fileNumber++;
      rowCount = 0;
      outStream = fs.createWriteStream(`ActiveCampaign_${fileNumber}.csv`);
      outStream.write("");
    }
  })
  .on("end", () => {
    // Close the last file when we've finished processing all rows
    outStream.end();
  });
