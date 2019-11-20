const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for express config
const staticFilePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(staticFilePath))

app.get('',(req,res) => {
    res.render('index',{
        title : "weather",
        name : 'Abhishek'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name : "Abhi",
        title : "About me"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : "Help page",
        name : "Abhishek B B"
    })
})
app.get('/weather',(req,res) => {

    if(!req.query.address){

        return res.send({
            Error : "You must provide an address"
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location} = {}) => {

        if(error) {

            return res.send({
                Error : error
            })
        }

        forecast(latitude,longitude,(error,forecastData) => {

            if(error) {
               return res.send({
                Error : error
                })
            }

            res.send ({
                forecastData : forecastData,
                location : location,
                address : req.query.address
            })

        })




    })

})

app.get('/help/*',(req,res) => {
   res.render('error',{
       title : "Error",
       name : "Abhishek Coorg",
       error : 'Help article not found'
   })

})
app.get('*',(req,res) => {

    res.render('error',{
        title : "Error",
        name:"Abhishek",
        error : "Page not found"
    })
})

app.listen(3000,() => {
    console.log('server is up on port 3000')
})