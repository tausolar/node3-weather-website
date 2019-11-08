const request = require('request')




const forecast  = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d89b598636034907a3bf53ef2542e918/'+ latitude + ',' + longitude +'?units=si'

    // console.log(url)
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
            
        } else if (body.error) {
            callback({
                code : body.error }, undefined )

        }else {
            callback(undefined, (
                body.daily.data[0].summary +  " It is currently " + body.currently.temperature + ' degrees out, There is a '+ body.currently.precipProbability * 100 + ' % chance of rain today. The max temperature today will be: ' + body.daily.data[0].temperatureHigh + ' And the Min will be:'+ body.daily.data[0].temperatureLow + '.'
      
        ))
    }
    
    })
}


module.exports = forecast