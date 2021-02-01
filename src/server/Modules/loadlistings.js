const Parser = require('./parser');
function load(path){
    var arr = Parser.parser(path);
    return arr;
}

module.exports = {
    load
}