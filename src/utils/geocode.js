const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGlpYW1taWNoYWVsIiwiYSI6ImNqd2Y4b244dDB2MnU0OW4yZGFtb3Jsc3cifQ.HBFIOS4AkhPAdKhmE8y_dA&limit=1'

    request ({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Something went wrong. Oops.', undefined)
        } else if (body.features.length === 0) {
            callback("That isn't a place. Try a different location.", undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode