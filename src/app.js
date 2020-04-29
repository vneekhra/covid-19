const path = require('path')
const express = require('express')
const covid = require('./utils/covid.js')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 8080

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'COVID-19 Updates',
        name: 'Xcel Cloud Containers Team!'
    })
})

/*covid(req.query.address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
        return res.send ({
            error: error
        })
    }

    forecast(latitude, longitude, (error, forecastData) => {

        if (error) {
            return res.send ({ error })
        }
        
        res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
        })
    })
})*/

app.get('/country', (req, res) => {

    res.render('country', {
        title: 'COVID-19 Updates',
        name: 'Xcel Cloud Containers Team!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'COVID-19 Updates',
        name: 'Xcel Cloud Containers Team!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help pages.....',
        title: 'COVID-19 Updates',
        name: 'Help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        title: '404 page',
        name: 'Xcel Cloud Containers Team!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Error 404 page',
        name: 'Xcel Cloud Containers Team!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})