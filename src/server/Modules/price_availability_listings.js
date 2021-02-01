function price_availability_listings(curr_dataset, type_name) {
    var res = new Map();
    curr_dataset.forEach(
        element => {
            if (res.has(element[type_name])) {
                var obj = res.get(element[type_name])
                obj.counts += 1
                obj.days += Number(element.availability_365)
                obj.price += Number(element.price)
            } else {
                res.set(element[type_name], {
                    counts: 1,
                    days: Number(element.availability_365),
                    price: Number(element.price)
                })
            }
        }
    )
    return res;
}

module.exports = {
    price_availability_listings
}