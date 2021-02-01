const Parser = require('./parser');
const path = require('path');

function get_province_names() {
    const provinces_csv = path.join(__dirname, '../csv', '/neighbourhoods.csv');
    let arr = Parser.parser(provinces_csv);
    let prov = [];
    prov.push(arr[0].neighbourhood_group);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].neighbourhood_group !== prov[prov.length - 1]) {
            prov.push(arr[i].neighbourhood_group);
        }
    }
    return prov;
}

function province_listing(curr_dataset) {
    var province_results = [];
    const prov_name = get_province_names();
    for (let i = 0; i < prov_name.length; i++) {
        var input = {neighbourhood_group: '', num: 0};
        input.neighbourhood_group = prov_name[i];
        let counter = 0;
        for (let j = 0; j < curr_dataset.length; j++) {
            if (curr_dataset[j].neighbourhood_group === input.neighbourhood_group)
                counter++;
        }
        input.num = counter;
        province_results.push(input);
    }
    province_results.sort(function (a, b) {
        return a.num - b.num;
    });
    return province_results;
}

module.exports = {
    get_province_names,
    province_listing
}