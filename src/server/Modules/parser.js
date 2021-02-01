// parser function
// input: Path to the csv
// output: return an array that holds all the json data from the csv file
var header = [];
function get_header(filename){
    const fs = require('fs');
    //read in the file in sync
    var data = fs.readFileSync(filename, 'utf8');
    
    //split the data by new line symbol
    var lines = data.split('\n');
    header = lines[0].split(',');
    return header;
}
function parser(filepath){
    var rows = ReadCSV(filepath);
    var jsob = [];
    for(var i = 1; i < rows.length; i++){
        jsob.push(createJson(rows[i],header));
    }
    return jsob;

//---------------------------
    
    // Input: directory to the csv file
    // First uses '\n" as delim in split(), then process quotation marks
    // Output: a parsed array
    function ReadCSV(fileName) {
        const fs = require('fs');
        //read in the file in sync
        var data = fs.readFileSync(fileName, 'utf8');
        data = data.replace(/"[^"]*(?:""[^"]*)*"/g, function(m) { return m.replace(/\n/g, ''); })
        
        //split the data by new line symbol
        var lines = data.split('\n');
        
        //array to hold parsed tokens
        var parsedCSV = [];
        header = lines[0].split(',');
        for (var i = 0; i < lines.length - 1; ++i) {
            // We want to skip the last row because it is empty.
            splitLine(lines[i]);
        }
        
        function splitLine(line) {
            var csvArray = [];
            var curPos = -1;
            while (curPos < line.length) {
                //find left quotation marks
                if (line.charAt(curPos + 1) == '"') {
                    var endPos = curPos + 2;
                    //find right quotation marks
                    while (endPos < line.length ){
                        if(line.charAt(endPos) == '"' && line.charAt(endPos+1) == '"')
                            endPos += 2;
                        else if(line.charAt(endPos) != '"')
                            endPos++;
                        else
                            break;
                    } 
                    var cell = line.substring(curPos + 2, endPos);
                    csvArray.push(cell);
                    curPos = endPos + 1;
                } else {//if no quatation marks, use , as delim
                    var endPos = curPos + 1;
                    while (endPos < line.length && line.charAt(endPos) != ',') endPos++;
                    var cell = line.substring(curPos + 1, endPos);
                    csvArray.push(cell);
                    curPos = endPos;
                }
            }
            //push the row of parsed tokens into return array
            parsedCSV.push(csvArray);
        }
        
        return parsedCSV;
    }
}
function createJson(row,header){
    //create a empty object named obj
    const obj = {};
    //go through each tokens and save them in the obj using header
    for(let j=0;j<header.length;j++){
        obj[header[j]] = row[j];
    }
    return obj;
}

module.exports = {
    parser,
    get_header
};
