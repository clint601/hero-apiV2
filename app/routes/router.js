const express = require('express')
const router = express.Router()
const axios = require('axios')
const port = process.env.port || 3000

//console.log(axios) check the terminal to see if axios is working
router.use(express.static('public'))


//root route => localhost:3000/api
router.get('/api', (req, res) => {
    res.json({
        'Heroes': `http://localhost:${port}/api/hero`,
        'Franchises': `http://localhost:${port}/api/franchise`,
        'Powers': `http://localhost:${port}/api/power`,
        'Species': `http://localhost:${port}/api/species`,
        'Teams': `http://localhost:${port}/api/team`,
    })
})
////////////////////////////////////////////////////////////////////////////////////
const endpoint = [
    'hero',
    'power',
    'species',
    'franchise',
    'team'
]

////////////+//////////////////

endpoint.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./app/${endpoint}Routes`))
})
////////////////////////////////////////////////////////////////////////////////

//home page
router.get('/', (req, res) => {
    // res.render take two (path => where are we rendering, obj => what are we rendering)
    res.render('pages/home', {
        title: 'Home',
        name: 'Heroes and Villains',
    })
})

// hero page => localhost:3000/heroes
router.get('/heroes', (req, res) => {
    // make a fetch request to the api/hero endpoint
    const url = `http://localhost:${port}/api/hero`
    

    axios.get(url) // fetch the data from the api/hero endpoint
    .then(resp => {
        //console.log(resp)// check the terminal to see the data 
        res.render('pages/allHero', {
            title: 'Heroes',
            name: 'Heroes and Villains',
            data: resp.data // pass the data to the heroes page
        })
    })
})

router.get('/heroes/:id', (req, res) => {

    const id = req.params.id // get the id from the url
    const url = `http://localhost:${port}/api/hero/${id}` // create the url for the api/hero/:id endpoint
    axios.get(url) // fetch the data from the api/hero/:id endpoint
    .then(resp => {
        //console.log(resp.data)// check the terminal to see the data
        let heroName = resp.data.hero_name == null ? `${resp.data.first_name} ${resp.data.last_name}` : resp.data.hero_name // check if hero_name is null and set it to first_name + last_name
        res.render('pages/heroSingle', {
            title: heroName,
            name: 'Heroes and Villains',
            data: resp.data, // pass the data to the heroSingle page
        })
    })
})

module.exports = router