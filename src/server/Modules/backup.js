const Parser = require('./parser');

function backup(data, index, path){
    const head = Parser.get_header(path);
    let new_path = './csv/listings'+index+'.csv';
    //console.log(head);
    let headline = '';
    const fs = require('fs');
    for(let i = 0; i < head.length-1; i++){
        headline += head[i] + ',';
    }
    headline += head[head.length-1] + '\n';
    fs.writeFileSync(new_path, headline); 
    write_rest(new_path,head,data);
    return new_path;
}
function write_rest(new_path,head,data){
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        append: true,
        path: new_path,
        header: head
    });
    
    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('New File Creation Is Done, File has been saved to:' + new_path);
        });
}
module.exports = {
    backup
}