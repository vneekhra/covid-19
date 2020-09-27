const request = require('request')

const covid = (address, callback) => {
    //console.log(address)
    const url = 'https://api.covid19api.com/summary'

    request({url, json: true}, (error, {body}) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            console.log(response)
            callback('Unable to find location. Try another address', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = covid