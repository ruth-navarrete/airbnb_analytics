// websites referenced:
// https://robkendal.co.uk/blog/how-to-build-a-restful-node-js-api-server-using-json-files
// https://charlietheprogrammer.com/how-to-use-express-validator-5
// RESTful Node.JS API using Json files
// - CRUD operatios

const Parser = require('../Modules/parser');
const Search = require('../Modules/search');
const Backup = require('../Modules/backup');
const LoadListings = require('../Modules/loadlistings');
const average_host_earning = require('../Modules/average_host_earning');
const pl = require('../Modules/province_listings');
const pa = require('../Modules/price_availability_listings');

const path = require('path');
const {inherits} = require('util');

// global variables:
var path_arr;
var num_dataset;
var curr_index;
var curr_dataset;
var curr_dataset_name;
init_data();

// chart part
var f1 = [];
var chart1_t = 0;
var chart2;
var chart2_t = 0;
var chart3;
var chart3_t = 0;
var chart4;
var chart4_t = 0;
var chart5;
var chart5_t = 0;
var f6 = [];
var chart6_t = 0;
init_chart_data();

const userRoutes = (app, fs) => {
    // READ
    app.get('/search', (req, res) => {
        var r = Search.search(curr_dataset, req.query);
        //console.log("search:", r.items[0]);
        res.json(r);
    });

    // CREATE
    // only create the obj in the RAM when end the process the data will be lost
    app.post('/modify', (req, res) => {
        console.log(req.body);
        CreateAndUpdate(req.body); // chart2, chart3, chart4, chart5 update here

        // update chart1
        let s = +new Date();
        if (!Array.isArray(f1) || !f1.length) {
            f1 = pl.province_listing(curr_dataset);
        }
        let i = f1.findIndex(element => element.neighbourhood_group == (req.body).neighbourhood_group);
        if (i >= 0) {
            f1[i].num++;
        }
        else {
            console.log("i: " + i);
            let input = {neighbourhood_group: '', num: 1};
            input.neighbourhood_group = req.body.neighbourhood_group;
            num = 1;
            f1.push(input);
        }

        f1.sort(function (a, b) {
            return a.num - b.num;
        });
        let e = +new Date();
        chart1_t = e - s;

        // update chart6
        s = +new Date()
        if (!Array.isArray(f6) || !f6.length) {
            average_host_earning.process_calender();
            f6 = average_host_earning.check_average_rate(curr_dataset);
        }
        f6 = average_host_earning.update(req.body, 1);
        e = +new Date();
        chart6_t = e - s;

        res.json(curr_dataset);
    });

    // UPDATE
    app.put('/modify', (req, res) => {
        console.log(req.body);
        CreateAndUpdate(req.body, false); // chart2, chart3, chart4, chart5 update here

        // chart 1 needs no update
        // update chart6
        let s = +new Date();
        if (!Array.isArray(f6) || !f6.length) {
            average_host_earning.process_calender();
            f6 = average_host_earning.check_average_rate(curr_dataset);
        }
        let temp_res = curr_dataset.filter(o => o.id === req.body.id);
        f6 = average_host_earning.update(temp_res[0], 2);
        let e = +new Date();
        chart6_t = e - s;

        res.json(curr_dataset)
    });

    // DELETE
    app.delete('/modify', (req, res) => {
        console.log(req.query);
        var listingId = req.query['id'];
        var idx = curr_dataset.findIndex(o => o.id === listingId);
        let temp_res = curr_dataset[idx];

        if (idx !== -1) {
            let obj = curr_dataset[idx];

            // update chart5
            let s = +new Date();
            let x = chart5.get(obj['host_id']);
            if (x.listing_ids === 1) {
                chart5.delete(obj['host_id']);
            }
            else {
                x.listing_ids -= 1;
                x.total_earned -= Number(obj['price']) * (365 - Number(obj['availability_365']));
            }
            let e = +new Date();
            chart5_t = e - s;

            // update chart2, chart3
            s = +new Date();
            let x2 = chart2.get(obj['neighbourhood']);
            let x3 = chart3.get(obj['room_type']);
            let x4 = chart4.get(obj['neighbourhood']);
            x2['days'] -= Number(obj['availability_365']);
            x3['days'] -= Number(obj['availability_365']);
            x2['price'] -= Number(obj['price']);
            x3['price'] -= Number(obj['price']);
            x2['counts'] -= 1;
            x3['counts'] -= 1;

            x4['availability'] -= Number(obj['availability_365']);
            x4['reviews'] -= Number(obj['number_of_reviews']);
            x4['counts'] -= 1;
            e = +new Date();
            chart3_t = e - s;
            chart2_t = e - s;

            curr_dataset.remove(idx);
        }

        // update chart1
        let s = +new Date();
        if (!Array.isArray(f1) || !f1.length) {
            f1 = pl.province_listing(curr_dataset);
        }

        let i = f1.findIndex(element => element.neighbourhood_group == temp_res.neighbourhood_group);

        if (f1[i].num > 1) {
            f1[i].num--;
        }
        else {
            f1.splice(i, 1);
        }

        f1.sort(function (a, b) {
            return a.num - b.num;
        });

        let e = +new Date();
        chart1_t = e - s;

        // update chart6
        s = +new Date();
        if (!Array.isArray(f6) || !f6.length) {
            average_host_earning.process_calender();
            f6 = average_host_earning.check_average_rate(curr_dataset);
        }
        f6 = average_host_earning.update(temp_res, 3);
        e = +new Date();
        chart6_t = e - s;

        res.json(curr_dataset);
    });

    app.get('/backup', (req, res) => {
        var r = Backup.backup(curr_dataset, num_dataset, path.join(__dirname, '../csv', '/' + path_arr[curr_index]));
        path_arr = fs.readdirSync(path.join(__dirname, '../csv'));
        num_dataset = path_arr.length;
        res.json(r);
    });

    app.get('/datasets', (req, res) => {
        let files = fs.readdirSync(path.join(__dirname, '../csv'));
        res.json({
            files: files,
            curr_index: curr_index
        })
    });

    app.get('/loaddataset', (req, res) => {
        console.log(req.query);
        var dataset = req.query['dataset'];
        curr_index = path_arr.findIndex(o => o === dataset);
        console.log(curr_index);
        curr_dataset = LoadListings.load(
            path.join(__dirname, '../csv', '/' + dataset)
        )

        // clear the arrays
        f1 = [];
        chart2.clear();
        chart3.clear();
        chart4.clear();
        chart5.clear();
        f6 = [];

        // repopulate arrays in case user uses CRUD operations
        init_chart_data();
        console.log("done");

        res.json(curr_dataset);
    });

    app.get('/provincelistings', (req, res) => {
        res.json({
            'chart': f1,
            'time': chart1_t
        })
    });

    app.get('/priceavailability', (req, res) => {
        if (req.query.name === 'neighbourhood')
            res.json({
                'chart': Array.from(chart2),
                'time': chart2_t
            })
        else if (req.query.name === 'room_type')
            res.json({
                'chart': Array.from(chart3),
                'time': chart3_t
            })
    });

    app.get('/chart4', (req, res) => {
        res.json({
            'chart': Array.from(chart4),
            'time': chart4_t
        })
    });

    app.get('/chart5', (req, res) => {
        res.json({
            'chart': Array.from(chart5).sort(function (a, b) {
                return b[1]['total_earned'] - a[1]['total_earned']
            }).slice(0, 100),
            'time': chart5_t
        })
    });

    app.get('/chart6', (req, res) => {
        res.json({
            'chart': f6,
            'time': chart6_t
        })
    })
};

function init_data() {
    const fs = require('fs');
    path_arr = fs.readdirSync(path.join(__dirname, '../csv'))
    curr_index = 0
    curr_dataset_name = path_arr[curr_index]
    var jsonPath = path.join(__dirname, '../csv', '/' + curr_dataset_name);
    num_dataset = path_arr.length;
    curr_dataset = LoadListings.load(jsonPath);
}

// state === false means create state === true means update
// add the function to update the chart
function CreateAndUpdate(data, state = true) {
    let obj = curr_dataset.find(o => o.id === data.id);

    if (obj !== undefined) {
        let cur_day = obj['availability_365'];
        let cur_price = obj['price'];

        // update chart2, chart3
        let s = +new Date();
        if (data.hasOwnProperty('availability_365')) {
            let x = chart2.get(obj['neighbourhood']);
            x['days'] += data['availability_365'] - obj['availability_365'];
            let y = chart3.get(obj['room_type']);
            y['days'] += data['availability_365'] - obj['availability_365'];
            cur_day = data['availability_365'];
        }

        if (data.hasOwnProperty('price')) {
            let x = chart2.get(obj['neighbourhood']);
            x['price'] += data['price'] - obj['price'];
            let y = chart3.get(obj['room_type']);
            y['price'] += data['price'] - obj['price'];
            cur_price = data['price'];
        }
        let e = +new Date();

        chart3_t = e - s;
        chart2_t = e - s;

        // update chart5
        s = +new Date();
        let x = chart5.get(obj['host_id']);
        x.total_earned += Number(cur_price) * (365 - Number(cur_day)) - Number(obj['price']) * (365 - Number(obj['availability_365']));
        e = +new Date();
        chart5_t = e - s;

        // update chart4
        s = +new Date();

        let y = chart4.get(obj['neighbourhood']);
        y.availability += data['availability_365'] - Number(obj['availability_365']);

        e = +new Date();
        chart4_t = e - s;

        for (var key in obj) {
            if (data.hasOwnProperty(key)) {
                obj[key] = data[key];
            }
        }
    }
    else if (state) {
        // update chart2, chart3
        let s = +new Date();
        if (data.hasOwnProperty('availability_365')) {
            let x = chart2.get(data['neighbourhood']);
            if (x !== undefined) {
                x['days'] += Number(data['availability_365']);
            }
            else {
                chart2.set(
                    data['neighbourhood'], {
                        counts: 1,
                        days: Number(data['availability_365']),
                        price: 0
                    }
                )
            }
            let y = chart3.get(data['room_type']);
            if (y !== undefined) {
                y['days'] += Number(data['availability_365']);
            }
            else {
                chart3.set(
                    data['room_type'], {
                        counts: 1,
                        days: Number(data['availability_365']),
                        price: 0
                    }
                )
            }
        }
        else {
            data['availability_365'] = '365';
        }

        if (data.hasOwnProperty('price')) {
            let x = chart2.get(data['neighbourhood']);
            if (x !== undefined) {
                x['price'] += Number(data['price']);
            }
            else {
                chart2.set(
                    data['neighbourhood'], {
                        counts: 1,
                        days: 0,
                        price: Number(data['price'])
                    }
                )
            }
            let y = chart3.get(data['room_type']);
            if (y !== undefined) {
                y['price'] += Number(data['price']);
            }
            else {
                chart3.set(
                    data['neighbourhood'], {
                        counts: 1,
                        days: 0,
                        price: Number(data['price'])
                    }
                )
            }
        }
        else {
            data['price'] = '0';
        }

        if (data.hasOwnProperty('price') || data.hasOwnProperty('availability_365')) {
            let x = chart2.get(data['neighbourhood']);
            let y = chart3.get(data['room_type']);

            if (x !== undefined) {
                x.counts += 1;
            }
            if (y !== undefined) {
                y.counts += 1;
            }
        }
        let e = +new Date();
        chart3_t = e - s;
        chart2_t = e - s;

        // update chart5
        s = +new Date();
        let x = chart5.get(data['host_id']);
        if (x !== undefined) {
            x.listing_ids += 1;
            x.total_earned += Number(data['price']) * (365 - Number(data['availability_365']));
        }
        else {
            chart5.set(
                data['host_id'], {
                    listing_ids: 1,
                    total_earned: Number(data['price']) * (365 - Number(data['availability_365'])),
                }
            )
        }
        e = +new Date();
        chart5_t = e - s;

        // update chart4
        s = +new Date();
        let y = chart4.get(data['neighbourhood']);
        if (y !== undefined) {
            y.counts += 1;
            y.reviews += Number(data['number_of_reviews']);
            y.availability += Number(data['availability_365']);
        }
        else {
            chart4.set(
                data['neighbourhood'], {
                    counts: 1,
                    reviews: Number(data['number_of_reviews']),
                    availability: Number(data['availability_365'])
                }
            )
        }
        e = +new Date();
        chart4_t = e - s;

        curr_dataset.push(data);
    }
}

function init_chart_data() {
    let beginTime = +new Date();
    f1 = pl.province_listing(curr_dataset);
    let endTime = +new Date();
    chart1_t = endTime - beginTime;
    
    beginTime = +new Date();
    chart2 = pa.price_availability_listings(curr_dataset, 'neighbourhood');
    endTime = +new Date();
    chart2_t = endTime - beginTime;

    beginTime = +new Date();
    chart3 = pa.price_availability_listings(curr_dataset, 'room_type');
    endTime = +new Date();
    chart3_t = endTime - beginTime;

    beginTime = +new Date();
    chart4 = new Map();
    curr_dataset.forEach(
        element => {
            if (chart4.has(element['neighbourhood'])) {
                var obj = chart4.get(element['neighbourhood']);
                obj.reviews += Number(element.number_of_reviews);
                obj.availability += Number(element.availability_365);
                obj.counts += 1;
            } else {
                chart4.set(element['neighbourhood'], {
                    counts: 1,
                    reviews: Number(element.number_of_reviews),
                    availability: Number(element.availability_365)
                })
            }
        }
    )
    endTime = +new Date();
    chart4_t = endTime - beginTime;

    beginTime = +new Date();
    var r = new Map();
    curr_dataset.forEach(
        element => {
            if (r.has(element['host_id'])) {
                var obj = r.get(element['host_id']);
                obj.listing_ids += 1;
                obj.total_earned += Number(element['price']) * (365 - Number(element['availability_365']));
            } else {
                r.set(
                    element['host_id'], {
                        listing_ids: 1,
                        total_earned: Number(element['price']) * (365 - Number(element['availability_365'])),
                    }
                );
            }
        }
    )
    chart5 = r;
    endTime = +new Date();
    chart5_t = endTime - beginTime;

    beginTime = +new Date();
    average_host_earning.process_calender();
    f6 = average_host_earning.check_average_rate(curr_dataset);
    endTime = +new Date();
    chart6_t = endTime - beginTime;
}

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

module.exports = userRoutes;
