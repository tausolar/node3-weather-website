const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidGF1YXNzaXN0YW50IiwiYSI6ImNrMm02eHNqbjBldTQzbXFsczVsd2dxMTcifQ.wAIyMBoKspuL_Pg0vrGkhw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


        // } else if (body.message) {
        //     callback(  
        //         "Your location was left empty. Please add a location"

        //     ,  undefined) 

        // const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidGF1YXNzaXN0YW50IiwiYSI6ImNrMm02eHNqbjBldTQzbXFsczVsd2dxMTcifQ.wAIyMBoKspuL_Pg0vrGkhw&limit=1'
