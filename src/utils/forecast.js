const request = require('postman-request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=366fc331e3de83580132502abc29e8e3&query='+latitude+','+longitude;
    request({url, json:true}, (error, {body})=>{
         if(error){
              callback("Unable to connect to the Weather Server", undefined);
          } else if(body.error){
              callback("Location not found, Please entger a valid location", undefined);
          } else{
              callback(undefined, {
                   weatherType : body.current.weather_descriptions[0],
                   temperature : body.current.temperature,
                   feelslike : body.current.feelslike
              })
         
          }
    })
    }

module.exports = forecast;