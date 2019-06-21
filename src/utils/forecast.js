const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/9704750c8fb2d3d75d54b8f8562803e1/' + encodeURIComponent(long) + ',' + encodeURIComponent(long)
    request ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find that location.', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ', and there is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast


//"Wind direction is: " + body.hourly.data[0].windBearing