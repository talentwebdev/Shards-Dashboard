
 import Papa from "papaparse";
export const readCSVFile = (callback) => {

    console.log("callback", callback);
    const file = require("./../assets/Sales-Report-Patle-Hare2.csv");

    Papa.parse(file, {
        header: true,
        download: true,
        skipEmptyLines: true,

        complete: function(result){
            callback(result.data);
        }
    });
}