const province_analysis = require('../Modules/province_listings');
const LoadListings = require('../Modules/loadlistings');
const path = require('path');
var jsonPath = path.join(__dirname, '../csv', '/listings.csv');
var curr = LoadListings.load(jsonPath);

test('we should have 1121 lisings for province Arganzuela', () => {
    expect(province_analysis.province_listing(curr)).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood_group": "Arganzuela", "num": 1121})
        ])
    );
});

test('we should have 127 lisings for province Moratalaz', () => {
    expect(province_analysis.province_listing(curr)).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood_group": "Moratalaz", "num": 127})
        ])
    );
});

test('we should have all correct for province counts, verified numbers with google sheets', () => {
    expect(province_analysis.province_listing(curr)).toEqual(
        expect.arrayContaining([
            expect.objectContaining({"neighbourhood_group": "Arganzuela", "num": 1121},
            {"neighbourhood_group": "Barajas", "num": 165},
            {"neighbourhood_group": "Carabanchel", "num": 678},
            {"neighbourhood_group": "Centro", "num": 9773},
            {"neighbourhood_group": "Chamartín", "num": 551},
            {"neighbourhood_group": "Chamberí", "num": 1331},
            {"neighbourhood_group": "Ciudad Lineal", "num": 613},
            {"neighbourhood_group": "Fuencarral - El Pardo", "num": 300},
            {"neighbourhood_group": "Hortaleza", "num": 332},
            {"neighbourhood_group": "Latina", "num": 616},
            {"neighbourhood_group": "Moncloa - Aravaca", "num": 542},
            {"neighbourhood_group": "Moratalaz", "num": 127},
            {"neighbourhood_group": "Puente de Vallecas", "num": 591},
            {"neighbourhood_group": "Retiro", "num": 665},
            {"neighbourhood_group": "Salamanca", "num": 1375},
            {"neighbourhood_group": "San Blas - Canillejas", "num": 524},
            {"neighbourhood_group": "Tetuán", "num": 838},
            {"neighbourhood_group": "Usera", "num": 361},
            {"neighbourhood_group": "Villa de Vallecas", "num": 103},
            {"neighbourhood_group": "Villaverde", "num": 166},
            {"neighbourhood_group": "Vicálvaro", "num": 65})
        ])
    );
});