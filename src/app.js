const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require("./utils/forecast");

// define paths for express config
const dirOfStaticHTML = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();

// setup of the handlebar engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// setup of static directory to the server
app.use(express.static(dirOfStaticHTML));

hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
    res.render('index', {
        title : "Weather report",
        name : "Mahantesh"
    });
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title : "About Me",
        name : "Mahantesh"
    });
})

app.get('/help', (req,res)=>{
    res.render('help', {
        message : "This is the help page.",
        title : "Help Page",
        name : "Mahantesh"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an address!"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
            if(error){
              return  res.send({error});
            }
            forcast(latitude, longitude, (error, {weatherType,temperature,feelslike}={})=>{
                if(error){
                    return res.send({error})
                }
 
                res.send({
                    givenlocation : req.query.address,
                    location,
                    forecast : weatherType + ". There is "+temperature+" degress out there. But it feels like "+ feelslike+ " degress out there"
                })
                
            });

    });
   
})
// app.get('/weather', (req,res)=>{
//     res.send({
//         location : 'Ilkal',
//         forecase : 'Patchy rain possible. The current temparature is 31 degress. But it feels like 32 degress out.'
//     })
// }) 

app.get('/help/*', (req,res)=>{ 
    res.render('404', {
        name : 'Mahantesh',
        message : 'Help article not found',
        title : '404'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        name : 'Mahantesh',
        message : 'Page not found',
        title : '404'

    })
})

app.listen(3000, ()=>{
    console.log("Server is up and running")
});




// res.render('weather', {
//     title : 'Current weather',
//     name : 'Mahantesh',
//     givenlocation : req.query.address,
//     location,
//     forecast : weatherType + ". There is "+temperature+" degress out there. But it feels like "+ feelslike+ " degress out there"
// })