function removeDuplicateAttribute(curr_dataset, key) {
    var res = [
    	...new Map(curr_dataset.map(x => [key(x),x])
    ).values()
    ]

    return res;
}

function findAnalytics(curr_dataset, key) {
    var results = [];
    var arr = removeDuplicateAttribute(curr_dataset, it => it[key]);
    let key_name = [];
    key_name.push(arr[0][key]);

    for (let i = 1; i < arr.length; i++) {
        key_name.push(arr[i][key]);
    }

    for (let i = 0; i < key_name.length;i++) {
        var input = {neighbourhood: '', room_type: '', avgprice : 0, NOavailability_365 : 0, avgReviews : 0, host_id: '', Yearned : 0, counter : 0, Yearned_per_listing : 0};
        
        input[key] = key_name[i];
        let avgPrice = 0;
        let avgAvai = 0;
        let avgReviews = 0;
        let counter = 0;
        let Yearned = 0;
        let counterFlag = 0;

        for (let j = 0; j < curr_dataset.length; j++) {
            if (curr_dataset[j][key] == input[key]) {
                if (curr_dataset[j].price!="") {
                    avgPrice+=parseFloat(curr_dataset[j].price,10);
                    counterFlag = 1;
                }

                if (curr_dataset[j].availability_365!="") {
                    avgAvai+=parseInt(curr_dataset[j].availability_365,10);
                    counterFlag = 1;
                }

                if (curr_dataset[j].reviews_per_month!="") {
                    avgReviews+=parseFloat(curr_dataset[j].reviews_per_month,10);
                    counterFlag = 1;
                }

                if (curr_dataset[j].price!="" && curr_dataset[j].availability_365!="" ) {
                    Yearned += (parseInt(curr_dataset[j].price,10)*(365-parseInt(curr_dataset[j].availability_365,10)));
                    counterFlag = 1;
                }
                    
                if (counterFlag==1)
                    counter++;
            }
        }
        
        avgPrice = avgPrice/counter;
        avgAvai = avgAvai/counter;
        avgAvai = 365 - avgAvai;
        avgReviews = 12*avgReviews/counter;
        Yearned_per_listing = Yearned/counter;

        input.avgprice = avgPrice.toFixed(2);
        input.NOavailability_365 = avgAvai.toFixed(2);
        input.avgReviews = avgReviews.toFixed(2);
        input.Yearned_per_listing = Yearned_per_listing.toFixed(2);
        input.Yearned = Yearned.toFixed(2);
        input.counter = counter;
        results.push(input);
    }

    return results;
}

module.exports = {
    findAnalytics
} 
