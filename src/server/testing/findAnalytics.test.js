const Analysis = require('../Modules/findAnalytics');
const LoadListings = require('../Modules/loadlistings');
const path = require('path');
var jsonPath = path.join(__dirname, '../csv', '/listings.csv');
var curr = LoadListings.load(jsonPath);

// host id tests
test('host id 13660', () => {
    var temp = Analysis.findAnalytics(curr, "host_id");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": '', "room_type": '', "avgprice" : '70.00', "NOavailability_365" : '312.00', "avgReviews" : '6.72', "host_id": '13660', "Yearned" : '21840.00', "counter" : 1, "Yearned_per_listing" : '21840.00'})
        ])
    );
});

test('host id 1408525', () => {
    var temp = Analysis.findAnalytics(curr, "host_id");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": '', "room_type": '', "avgprice" : '91.29', "NOavailability_365" : '69.68', "avgReviews" : '5.73', "host_id": '1408525', "Yearned" : '342899.00', "counter" : 56, "Yearned_per_listing" : '6123.20'})
        ])
    );
});

test('host id 2563986', () => {
    var temp = Analysis.findAnalytics(curr, "host_id");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": '', "room_type": '', "avgprice" : '34.00', "NOavailability_365" : '150.75', "avgReviews" : '0.00', "host_id": '2563986', "Yearned" : '20870.00', "counter" : 4, "Yearned_per_listing" : '5217.50'})
        ])
    );
});

test('host id 4599639', () => {
    var temp = Analysis.findAnalytics(curr, "host_id");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": '', "room_type": '', "avgprice" : '188.75', "NOavailability_365" : '172.83', "avgReviews" : "3.63", "host_id": '4599639', "Yearned" : '825847.00', "counter" : 24, "Yearned_per_listing" : '34410.29'})
        ])
    );
});


// neighbourhood tests
test('neighbourhood Sol', () => {
    var temp = Analysis.findAnalytics(curr, "neighbourhood");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": 'Sol', "room_type": '', "avgprice" : "120.63", "NOavailability_365" : "200.15", "avgReviews" : "25.46", "host_id": '', "Yearned" : "30239860.00", "counter" : 1371, "Yearned_per_listing" : "22056.79"})
        ])
    );
});

test('neighbourhood El Plantío', () => {
    var temp = Analysis.findAnalytics(curr, "neighbourhood");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": 'El Plantío', "room_type": '', "avgprice" : "156.60", "NOavailability_365" : "106.00", "avgReviews" : "12.31", "host_id": '', "Yearned" : "20236.00", "counter" : 5, "Yearned_per_listing" : "4047.20"})
        ])
    );
});

test('neighbourhood Peñagrande', () => {
    var temp = Analysis.findAnalytics(curr, "neighbourhood");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": 'Peñagrande', "room_type": '', "avgprice" : "190.82", "NOavailability_365" : "184.36", "avgReviews" : "7.37", "host_id": '', "Yearned" : "2180182.00", "counter" : 72, "Yearned_per_listing" : "30280.31"})
        ])
    );
});

test('neighbourhood Imperial', () => {
    var temp = Analysis.findAnalytics(curr, "neighbourhood");
    expect(temp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood": 'Imperial', "room_type": '', "avgprice" : "96.15", "NOavailability_365" : "230.55", "avgReviews" : "17.11", "host_id": '', "Yearned" : "3076663.00", "counter" : 137, "Yearned_per_listing" : "22457.39"})
        ])
    );
});
