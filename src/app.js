const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const  viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlerbars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Tau"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Tau"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Tau"
    })
})



// spaceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee


    app.get('/weather', (req,res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide a Address Query'
            })
    
        } else {


        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })

            }  
        
            // console.log('Error',error)
            // console.log('Data', data)
            // console.log('Forecast for '+location)
            
            forecast( latitude , longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                // return location, forecastData
                res.send({
                    address: req.query.address, 
                    forecast: forecastData,
                    location: location
                }
                )
         
          })
           })

      
        }
       
        })    
    

// space









app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }

    console.log(req.query.search)
    res.send({
        products: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('pageError', {
        message: 'Help article',
        title: "404",
        name: 'Tau'
    })
})



app.get('*', (req, res) =>   {
    res.render('pageError', {
        message: 'Page',
        title: "404",
        name: 'Tau'
    })

})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})