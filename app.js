const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for: ',
            string: true
        }

    })
    .help()
    .alias('help', 'h')
    .argv;


console.log(argv.a);
var encodedArgv = encodeURIComponent(argv.a);
console.log(encodedArgv);

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=Cn1yVNXTetauWE4svmBQvw4tt9bDoBjf&location=${encodedArgv}`,
    json: true
}, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    if (error) {
        console.log('Unable to connect to Google servers.')
    }
    else if (body.status==='ZERO_RESULTS'){
        console.log('Unable to find address')
    }
    else {
        console.log(`Address is ${body.results[0].locations[0].street}`)
        console.log(`Latitude is ${body.results[0].locations[0].latLng.lat}`)
        console.log(`Longitude is ${body.results[0].locations[0].latLng.lng}`)
    }
});