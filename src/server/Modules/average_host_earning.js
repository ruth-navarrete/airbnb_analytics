var provinces_arr = [];
var unique_listings = new Map();
var num_used = new Map();
var prov_num_rented = new Map();
const path = require('path');
const province_name = require('./province_listings');
const { removeAllListeners } = require('process');

function process_calender() {
    const calender_csv = path.join(__dirname, '/calendar.csv');
    let fs = require('fs');
    var fd = fs.openSync(calender_csv, 'r');
    var bufferSize = 1024;
    var buffer = Buffer.alloc(bufferSize);
    var lineCount = 0;
    var leftOver = '';
    var read, line, idxStart, idx;

    while ((read = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {
        leftOver += buffer.toString('utf8', 0, read);
        idxStart = 0;
        while ((idx = leftOver.indexOf("\n", idxStart)) !== -1) {
            line = leftOver.substring(idxStart, idx);

            if (line.includes('"')) {
                line = line.replace(/"[^"]*(?:""[^"]*)*"/g, function(m) { return m.replace(/,/g, '');});
            }

            var curr_line = line.split(',');
            let id = curr_line[0];
            let avail = curr_line[2];
            let price = curr_line[3];

            if (price[0] == '"') {
                price = price.slice(2,curr_line[3].length - 1);
            }
            else {
                price =  price.slice(1,curr_line[3].length);
            }

            price = parseInt(price);

            if (avail == 'f') {
                if (unique_listings.has(id) && num_used.has(id)) {
                    let sum_temp = unique_listings.get(id) + price;
                    unique_listings.set(id, sum_temp);
                    num_used.set(id, (num_used.get(id) + 1));
                }
                else {
                    unique_listings.set(id, price);
                    num_used.set(id, 0);
                }
            }
            else {
                if (!unique_listings.has(id)) {
                    unique_listings.set(id,0);
                    num_used.set(id, 0);
                }
            }

            lineCount++;
            idxStart = idx + 1;
        }
        leftOver = leftOver.substring(idxStart);
    }
}

function check_average_rate(dataset) {
    const prov_name = province_name.get_province_names();

    for (let i = 0; i < prov_name.length;i++) {
        var input = {neighbourhood_group: '', rate : 0};
        input.neighbourhood_group = prov_name[i];
        let counter = 0;
        let sum = 0;

        for (let j = 0; j < dataset.length; j++) {
            if (dataset[j].available_365 >= 365 || num_used.get(dataset[j].id) == 0)
                continue;

            if (dataset[j].neighbourhood_group == input.neighbourhood_group){

                let curr_rate = (unique_listings.get(dataset[j].id) / num_used.get(dataset[j].id));
                sum += curr_rate;

                counter++;
            }
        }
        prov_num_rented.set(prov_name[i], counter);
        input.rate = (sum / counter).toFixed(0);
        provinces_arr.push(input);
    }

    provinces_arr.sort(function(a,b){
        return a.rate - b.rate;
    });

    return provinces_arr;
}

function update(arr, analysis){
    if(arr.availibility_365 == 0){
        console.log("New listing dooesn't have any impact on feature 6");
        return;
    }
    let i = provinces_arr.findIndex(element => element.neighbourhood_group == arr.neighbourhood_group);
    //analysis 1 == create
    //analysis 2 == modify
    //analysis 3 == delete
    //create a new listing
    if(analysis == 1){
        if(i == -1){
            console.log("New listings created in feature 6");
            let input = {neighbourhood_group: '', rate : 0};
            input.neighbourhood_group = arr.neighbourhood_group;
            input.rate = arr.price;
            provinces_arr.push(input);
            prov_num_rented.set(arr.neighbourhood_group, 1);
            console.log("Created a new listing under a new province in feature 6");
        }
        else{
            let new_rate = prov_num_rented.get(arr.neighbourhood_group) * provinces_arr[i].rate + parseInt(arr.price);
            if(new_rate < 0){
                console.log("Error! Feature 6 New rate is lower than 0.");
                return;
            }

            prov_num_rented.set(arr.neighbourhood_group, prov_num_rented.get(arr.neighbourhood_group)+1);
            provinces_arr[i].rate = (new_rate / (prov_num_rented.get(arr.neighbourhood_group))).toString();
            console.log("Created a new listing under a existing province in feature 6");
        }
        unique_listings.set(arr.id, parseInt(arr.price));
        num_used.set(arr.id, 1);
    }
    else if(analysis == 2){//if already exist
        console.log("Sum * count = " + prov_num_rented.get(arr.neighbourhood_group) * provinces_arr[i].rate);
        console.log("previous rate: " + (unique_listings.get(arr.id) / num_used.get(arr.id)));
        let new_rate = prov_num_rented.get(arr.neighbourhood_group) * provinces_arr[i].rate - (unique_listings.get(arr.id) / num_used.get(arr.id)) + parseInt(arr.price);
        if(new_rate < 0){
            console.log("Error! Feature 6 New rate is lower than 0.");
            return;
        }
        provinces_arr[i].rate = (new_rate / (prov_num_rented.get(arr.neighbourhood_group))).toString();
        console.log("Modified a existing listing in feature 6");
    }
    else if(analysis == 3){
        if(prov_num_rented.has(arr.neighbourhood_group)){

            let local_num_used = prov_num_rented.get(arr.neighbourhood_group);
            let local_sum = local_num_used * provinces_arr[i].rate;
            console.log("Sum * count = " + prov_num_rented.get(arr.neighbourhood_group) * provinces_arr[i].rate);
            console.log("previous rate: " + (unique_listings.get(arr.id) / num_used.get(arr.id)));
            // new rate = sum - average
            let new_rate = local_sum - (unique_listings.get(arr.id) / num_used.get(arr.id));
            //decrement count
            console.log("New rate is " + new_rate);
            prov_num_rented.set(arr.neighbourhood_group, prov_num_rented.get(arr.neighbourhood_group)-1);
            if(prov_num_rented.get(arr.neighbourhood_group) == 0){
                provinces_arr.splice(i,1);
            }
            else{
                provinces_arr[i].rate = (new_rate / (prov_num_rented.get(arr.neighbourhood_group))).toString();
            }
            num_used.set(arr.id, 1);
            unique_listings.set(arr.id, 0);
            console.log("Deleted a existing listing in feature 6");
        }
    }
    provinces_arr.sort(function(a,b){
        return a.rate - b.rate;
    });
    return provinces_arr;
}
function get_cal_listings(){
    return unique_listings;
}

function get_cal_num_used(){
    return num_used;
}

module.exports = {
    process_calender,
    get_cal_listings,
    get_cal_num_used,
    check_average_rate,
    update
}