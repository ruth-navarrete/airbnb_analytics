function removeDuplicateAttribute(curr_dataset, key){
    var res = [
    	...new Map(curr_dataset.map(x => [key(x),x])
    ).values()
    ]

    return res;
}

function PriceAvail(curr_dataset, key){
    var results = [];
    var arr = removeDuplicateAttribute(curr_dataset, it => it[key]);
    let prov_name = [];
    prov_name.push(arr[0][key]);
    for(let i = 1; i < arr.length; i++){
        prov_name.push(arr[i][key]);
    }

    for(let i = 0; i < prov_name.length;i++){
        var input = {neighbourhood_group: '', room_type: '', avgprice : 0, NOavailability_365 : 0};
        input[key] = prov_name[i];
        let avgPrice = 0;
        let avgAvai = 0;
        let counter = 0;
        for(let j = 0; j < curr_dataset.length; j++){
            if(curr_dataset[j][key] == input[key])
            {
                avgPrice+=parseInt(curr_dataset[j].price,10);
                avgAvai+=parseInt(curr_dataset[j].availability_365,10);
                counter++;
            }
        }
        avgPrice = avgPrice/counter;
        avgAvai = avgAvai/counter;
        avgAvai = 365 - avgAvai;
        input.avgprice = avgPrice;
        input.NOavailability_365 = avgAvai;
        results.push(input);
    }

    return results;
}

module.exports = {
    PriceAvail
} 