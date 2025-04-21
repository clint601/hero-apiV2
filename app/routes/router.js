const express = require('express')
const router = express.Router()
const port = process.env.port || 3000


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

const endpoint = [
    'hero'
]

endpoint.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./app/${endpoint}Routes`))
})


module.exports = router