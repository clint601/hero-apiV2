// step 1
const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')
// router is gonna go here...
const router = require('./app/routes/router')
const port = process.env.port || 3000

// step 3
// Handle Security
// server.use(helmet())
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data:"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())

server.use(express.json())
server.use(express.urlencoded( {extended: true}))

// step 4
// Build root route
// localhost:3000/api


// step 5
// Add router & set view engine
server.use('/', router)
server.set('view engine', 'ejs')

// step 2
server.listen(port, ()=> console.log(`port ${port} is up, up, and away!`))