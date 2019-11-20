const request = require('request')

const geoCode = (address,callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYWJoaXNoZWtjb29yZyIsImEiOiJjazJzeTliZnkwdW9nM2hvOHQ5aDR4OGEwIn0.tiXf6Eo9v8yXbZNMloNtYA"

    request({url, json: true},(error,{body}) => {
        if(error){
          callback('unable to connect location service',undefined)
        } else if (body.features.length === 0){
          callback('unable to find location. Please search with another',undefined)
        } else {
          callback(undefined,{
             latitude : body.features[0].center[1],
             longitude : body.features[0].center[0],
             location : body.features[0].place_name
          })
        }
    })
  }

  module.exports = geoCode