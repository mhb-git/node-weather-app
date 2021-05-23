const request = require('postman-request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFoYW50ZXNoYiIsImEiOiJja29ndTZlbmEwaXhpMndwbnQ1ODZyM2R3In0.c-bxzaR1t9tGXfbzSpl62w&country=IN&limit=1';

    request({url, json : true}, (error, {body}) => {
        // console.log(body);
        if(error){
            callback("Unable to connect to the map server", undefined);
        } else if(body.features.length === 0){
            callback("Location not found, Please provide a valid location..", undefined);
        } else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode;