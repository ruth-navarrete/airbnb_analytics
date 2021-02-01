# Testing
## Framework
Uses [Jest](https://jestjs.io/en/) for regression testing and GitHub Actions for continuous integration.

## Testing files
All test files are contained in the `testing` directory. 
Each test file corresponds to a module in `Modules` and test the module in the corresponding file.

Test File | Module File | Function
------------ | ------------- | -------------
province_listing.test.js | province_listing.js | province_analysis -> analyze province data
price_availability_listings.test.js | price_availability_listings.js | price_availability_listings -> analyze room_type and neighbourhood data

## How to run
Run the following line in the server directory **not the root directory**.
`npm run test`
This will run all the tests and provide the information for the tests.