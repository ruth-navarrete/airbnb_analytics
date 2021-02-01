const Analysis = require('../Modules/average_host_earning');
const LoadListings = require('../Modules/loadlistings');
const path = require('path');
var jsonPath = path.join(__dirname, '../csv', '/listings.csv');
var curr = LoadListings.load(jsonPath);
Analysis.process_calender();
testerArr = Analysis.check_average_rate(curr);

test('we should have a rate of 130 for province Arganzuela', () => {
    expect(testerArr).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood_group": "Arganzuela", "rate": "138"})
        ])
    );
});

test('we should have a rate of 372 for province San Blas - Canillejas', () => {
    expect(testerArr).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood_group": "San Blas - Canillejas", "rate": "389"})
        ])
    );
});

test('we should have all correct for province counts, verified numbers with google sheets', () => {
    expect(testerArr).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood_group": "Arganzuela", "rate": "138"},
            {"neighbourhood_group": "Barajas", "rate": "128"},
            {"neighbourhood_group": "Carabanchel", "rate": "133"},
            {"neighbourhood_group": "Centro", "rate": "249"},
            {"neighbourhood_group": "Chamartín", "rate": "205"},
            {"neighbourhood_group": "Chamberí", "rate": "183"})
        ])
    );
});