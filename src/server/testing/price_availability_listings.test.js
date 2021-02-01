const analysis = require('../Modules/price_availability_listings');
const LoadListings = require('../Modules/loadlistings');
const path = require('path');
var jsonPath = path.join(__dirname, '../csv', '/listings.csv');
var curr = LoadListings.load(jsonPath);

// room_type tests
test('we should have room type Entire home/apt with 12583 instances, 2029426 available days, and total price of 1928549', () => {
    var results = analysis.price_availability_listings(curr, "room_type");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Entire home/apt", {"counts": 12583, "days": 2029426, "price": 1928549}])
        ])
    );
});

test('we should have room type Hotel room with 477 instances, 105129 available days, and total price of 109184', () => {
    var results = analysis.price_availability_listings(curr, "room_type");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Hotel room", {"counts": 477, "days": 105129, "price": 109184}])
        ])
    );
});

test('we should have all correct for room type analysis, verified numbers with google sheets', () => {
    var results = analysis.price_availability_listings(curr, "room_type");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Private room", {"counts": 7503, "days": 1043099, "price": 733093}]),
            expect.objectContaining(["Entire home/apt", {"counts": 12583, "days": 2029426, "price": 1928549}]),
            expect.objectContaining(["Hotel room", {"counts": 477, "days": 105129, "price": 109184}]),
            expect.objectContaining(["Shared room", {"counts": 274, "days": 54114, "price": 22694}])
        ])
    );
});

// neighbourhood tests
test('we should have neighbourhood Palomas with 21 instances, 3058 available days, and total price of 5303', () => {
    var results = analysis.price_availability_listings(curr, "neighbourhood");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Palomas", {"counts": 21, "days": 3058, "price": 5303}])
        ])
    );
});

test('we should have neighbourhood Embajadores with 2690 instances, 389634 available days, and total price of 351052', () => {
    var results = analysis.price_availability_listings(curr, "neighbourhood");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Embajadores", {"counts": 2690, "days": 389634, "price": 351052}])
        ])
    );
});

test('we should have neighbourhood Hispanoamérica with 104 instances, 16841 available days, and total price of 18330', () => {
    var results = analysis.price_availability_listings(curr, "neighbourhood");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Hispanoamérica", {"counts": 104, "days": 16841, "price": 18330}])
        ])
    );
});

test('we should have neighbourhood Cármenes with 59 instances, 8485 available days, and total price of 6022', () => {
    var results = analysis.price_availability_listings(curr, "neighbourhood");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Cármenes", {"counts": 59, "days": 8485, "price": 6022}])
        ])
    );
});

test('we should have neighbourhood Casco Histórico de Vicálvaro with 51 instances, 8969 available days, and total price of 8481', () => {
    var results = analysis.price_availability_listings(curr, "neighbourhood");
    var results_array = Array.from(results);
    expect(results_array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(["Casco Histórico de Vicálvaro", {"counts": 51, "days": 8969, "price": 8481}])
        ])
    );
});