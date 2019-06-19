const path          = require('path')
const express       = require('express')
const hbs           = require('hbs')
const request       = require('request')
const geocode       = require('./utils/geocode')
const forecast      = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // first value is the key, the second is the value
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael Williams'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Michael Williams'
    } )
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is an example message.',
        title: 'Help',
        name: 'Michael Williams'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address
    
    if (!location) {
        return res.send({
            error: 'Must provide address'
        })
    }
    geocode(location, (error, { lat, long, location } = {} ) => {
        if (error) {
            return res.send({ error })
        } 
        
        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Williams',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Williams',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log("It's aliiiiive!")
})