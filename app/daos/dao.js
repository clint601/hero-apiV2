const daoCommon = require('./common/daoCommon')


const heroDao = {
    ...daoCommon, // this will import all the functions from daoCommon
    ...require('./api/heroDao'), // this will import all the functions from heroDao
}


module.exports = {
    heroDao
}