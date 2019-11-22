const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/503924cc03ec0cfbd78b7461980e3e30/' + latitude + ','+ longitude

    request({url,json:true},(error,{body}) => {

        if(error) {
            callback('unable to connect to service',undefined)
        } else if (body.error) {
            callback('unable find location . Please search with other location',undefined)
        } else {

            const  { temperature,precipProbability} = body.currently
            callback(undefined,body.daily.data[0].summary + " Todays high temperature is " + body.daily.data[0].temperatureHigh + " . Todays low temperature is " + body.daily.data[0].temperatureLow + ". It is currently "+ temperature+" degrees out. there is a "+ precipProbability +" % chance of rain")
        }
    })
}

module.exports = forecast